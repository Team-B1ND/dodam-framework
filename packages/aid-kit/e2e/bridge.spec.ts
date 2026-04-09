import { test, expect, Page } from "@playwright/test";

/** 네이티브 → 웹으로 MessageEvent를 dispatch하는 헬퍼 */
async function simulateNativeResponse(page: Page, response: object) {
  await page.evaluate((res) => {
    (window as any).bridgeTest.simulateNativeResponse(res);
  }, response);
}

/** window.bridge가 마운트될 때까지 대기 */
async function waitForBridge(page: Page) {
  await page.waitForFunction(() => typeof (window as any).bridge !== "undefined");
}

test.describe("Bridge: 웹 ↔ 네이티브 데이터 교환", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForBridge(page);
    // 각 테스트 전 전송 메시지 초기화
    await page.evaluate(() => (window as any).bridgeTest.clearSentMessages());
  });

  // ──────────────────────────────────────────────
  // 1. 초기화
  // ──────────────────────────────────────────────
  test("BridgeProvider 마운트 시 SYNC 요청을 네이티브로 전송한다", async ({ page }) => {
    // beforeEach에서 clear하기 전 메시지를 확인하기 위해 새로 로드
    await page.goto("/");
    await waitForBridge(page);

    const sent = await page.evaluate(() => (window as any).bridgeTest.getSentMessages());
    expect(sent.some((m: any) => m.type === "SYNC")).toBe(true);
  });

  // ──────────────────────────────────────────────
  // 2. 웹 → 네이티브 요청
  // ──────────────────────────────────────────────
  test("send()가 올바른 BridgeRequest 포맷으로 전송한다", async ({ page }) => {
    await page.evaluate(() => {
      (window as any).bridge.send("GPS_GET", { accuracy: "high" });
    });

    const [msg] = await page.evaluate(() => (window as any).bridgeTest.getSentMessages());
    expect(msg.type).toBe("GPS_GET");
    expect(msg.payload).toEqual({ accuracy: "high" });
    expect(typeof msg.id).toBe("string");
    expect(msg.id.length).toBeGreaterThan(0);
    expect(typeof msg.timestamp).toBe("number");
  });

  test("send() 호출마다 고유한 id를 가진다", async ({ page }) => {
    await page.evaluate(() => {
      (window as any).bridge.send("QR_SCAN", null);
      (window as any).bridge.send("QR_SCAN", null);
    });

    const msgs = await page.evaluate(() => (window as any).bridgeTest.getSentMessages());
    expect(msgs[0].id).not.toBe(msgs[1].id);
  });

  // ──────────────────────────────────────────────
  // 3. 네이티브 → 웹 응답 수신
  // ──────────────────────────────────────────────
  test("네이티브 응답 수신 시 subscribe 핸들러가 호출된다", async ({ page }) => {
    // 핸들러 등록
    await page.evaluate(() => {
      (window as any)._testResult = null;
      (window as any).bridge.subscribe("GPS_GET", async (data: unknown) => {
        (window as any)._testResult = data;
        return {};
      });
    });

    await simulateNativeResponse(page, {
      id: "req-gps-1",
      type: "GPS_GET",
      timestamp: Date.now(),
      success: true,
      data: { lat: 37.5665, lng: 126.978 },
    });

    await page.waitForFunction(() => (window as any)._testResult !== null);
    const result = await page.evaluate(() => (window as any)._testResult);

    expect(result.data).toEqual({ lat: 37.5665, lng: 126.978 });
    expect(result.success).toBe(true);
  });

  test("응답 수신 후 ACK를 네이티브로 전송한다", async ({ page }) => {
    await page.evaluate(() => {
      (window as any).bridge.subscribe("CAMERA_CAPTURE", async () => ({}));
    });

    await simulateNativeResponse(page, {
      id: "req-cam-1",
      type: "CAMERA_CAPTURE",
      timestamp: Date.now(),
      success: true,
      data: { uri: "file://photo.jpg" },
    });

    await page.waitForFunction(() =>
      (window as any).bridgeTest.getSentMessages().some((m: any) => m.type === "ACK")
    );

    const ack = await page.evaluate(() =>
      (window as any).bridgeTest.getSentMessages().find((m: any) => m.type === "ACK")
    );
    expect(ack.payload.id).toBe("req-cam-1");
  });

  // ──────────────────────────────────────────────
  // 4. 큐 — subscribe 전 응답 도착
  // ──────────────────────────────────────────────
  test("핸들러 등록 전 도착한 응답은 큐에 보관 후 subscribe 시 즉시 처리된다", async ({ page }) => {
    // 핸들러 없이 응답 먼저 수신
    await simulateNativeResponse(page, {
      id: "queued-nfc",
      type: "NFC_READ",
      timestamp: Date.now(),
      success: true,
      data: { tag: "0xABCD" },
    });

    await page.waitForTimeout(50);

    // 이후 subscribe → 큐의 메시지가 즉시 처리되어야 함
    const result = await page.evaluate(async () => {
      (window as any)._queueResult = null;
      (window as any).bridge.subscribe("NFC_READ", async (data: unknown) => {
        (window as any)._queueResult = data;
        return {};
      });
      await new Promise((r) => setTimeout(r, 50));
      return (window as any)._queueResult;
    });

    expect((result as any).data).toEqual({ tag: "0xABCD" });
  });

  // ──────────────────────────────────────────────
  // 5. 만료된 응답 처리
  // ──────────────────────────────────────────────
  test("TTL(5분) 초과 응답은 핸들러를 호출하지 않고 ACK만 전송한다", async ({ page }) => {
    await page.evaluate(() => {
      (window as any)._expiredHandlerCalled = false;
      (window as any).bridge.subscribe("FILE_SELECT", async () => {
        (window as any)._expiredHandlerCalled = true;
        return {};
      });
    });

    await simulateNativeResponse(page, {
      id: "expired-id",
      type: "FILE_SELECT",
      timestamp: Date.now() - 1000 * 60 * 6,
      success: true,
      data: { file: "old.pdf" },
    });

    await page.waitForFunction(() =>
      (window as any).bridgeTest.getSentMessages().some((m: any) => m.type === "ACK")
    );

    const handlerCalled = await page.evaluate(() => (window as any)._expiredHandlerCalled);
    expect(handlerCalled).toBe(false);

    const ack = await page.evaluate(() =>
      (window as any).bridgeTest.getSentMessages().find((m: any) => m.type === "ACK")
    );
    expect(ack.payload.id).toBe("expired-id");
  });

  // ──────────────────────────────────────────────
  // 6. SYNC 응답 처리
  // ──────────────────────────────────────────────
  test("SYNC 응답의 completed task를 처리하고 핸들러를 호출한다", async ({ page }) => {
    await page.evaluate(() => {
      (window as any)._syncResult = null;
      (window as any).bridge.subscribe("QR_SCAN", async (data: unknown) => {
        (window as any)._syncResult = data;
        return {};
      });
    });

    await simulateNativeResponse(page, {
      id: "sync-res-1",
      type: "SYNC",
      timestamp: Date.now(),
      success: true,
      data: {
        "task-qr-1": {
          flag: "completed",
          req: {
            id: "task-qr-1",
            type: "QR_SCAN",
            timestamp: Date.now(),
            payload: null,
          },
          data: { code: "https://b1nd.com" },
        },
      },
    });

    await page.waitForFunction(() => (window as any)._syncResult !== null);
    const result = await page.evaluate(() => (window as any)._syncResult);
    expect(result.data).toEqual({ code: "https://b1nd.com" });
  });

  test("SYNC 응답의 pending task는 무시된다", async ({ page }) => {
    await page.evaluate(() => {
      (window as any)._pendingResult = null;
      (window as any).bridge.subscribe("OAUTH_GET_TOKEN", async (data: unknown) => {
        (window as any)._pendingResult = data;
        return {};
      });
    });

    await simulateNativeResponse(page, {
      id: "sync-res-2",
      type: "SYNC",
      timestamp: Date.now(),
      success: true,
      data: {
        "task-oauth-1": {
          flag: "pending",
          req: {
            id: "task-oauth-1",
            type: "OAUTH_GET_TOKEN",
            timestamp: Date.now(),
            payload: null,
          },
        },
      },
    });

    await page.waitForTimeout(100);
    const result = await page.evaluate(() => (window as any)._pendingResult);
    expect(result).toBeNull();
  });

  // ──────────────────────────────────────────────
  // 7. 전체 왕복 흐름
  // ──────────────────────────────────────────────
  test("웹 send → 네이티브 수신 → 응답 → 핸들러 호출 → ACK 전체 흐름이 동작한다", async ({ page }) => {
    // 네이티브 auto-responder 설정
    await page.evaluate(() => {
      (window as any)._roundtripResult = null;

      (window as any).bridge.subscribe("GPS_GET", async (data: unknown) => {
        (window as any)._roundtripResult = data;
        return {};
      });

      // 웹의 postMessage를 가로채서 네이티브 응답을 자동 전송
      (window as any).bridgeTest.setNativeHandler((req: any) => {
        if (req.type === "GPS_GET") {
          (window as any).bridgeTest.simulateNativeResponse({
            id: req.id,
            type: "GPS_GET",
            timestamp: Date.now(),
            success: true,
            data: { lat: 37.5665, lng: 126.978 },
          });
        }
      });
    });

    await page.evaluate(() => {
      (window as any).bridge.send("GPS_GET", null);
    });

    // 핸들러 호출 대기
    await page.waitForFunction(() => (window as any)._roundtripResult !== null);

    const result = await page.evaluate(() => (window as any)._roundtripResult);
    expect(result.data).toEqual({ lat: 37.5665, lng: 126.978 });

    // ACK 전송 확인
    const ack = await page.evaluate(() =>
      (window as any).bridgeTest.getSentMessages().find((m: any) => m.type === "ACK")
    );
    expect(ack).toBeDefined();
  });
});
