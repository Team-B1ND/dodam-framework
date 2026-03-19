import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { BackHandler, View } from "react-native";
import { WebView } from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import { Actions, core, useBridgeCore } from "@b1nd/aid-kit/bridge-kit/app";
import { useRef } from "react";

interface AppWebViewParams {
  appUrl: string;
  name: string;
}

type AppWebViewRouteProp = RouteProp<{ AppWebView: AppWebViewParams }, "AppWebView">;

export const AppWebViewPage = () => {
	const { params } = useRoute<AppWebViewRouteProp>();
	const navigation = useNavigation();
	const { top, bottom } = useSafeAreaInsets();
	const { colors } = useTheme();
	const { webViewProps } = useBridgeCore();
	const lastNativePopAt = useRef(0);
	const NATIVE_POP_COOLDOWN_MS = 450;

	core.mount(Actions.NAVIGATION_POP, async () => {
		const now = Date.now();
		if (now - lastNativePopAt.current < NATIVE_POP_COOLDOWN_MS) {
			return null;
		}
		lastNativePopAt.current = now;
		navigation.goBack();
		return null;
	});

	core.mountPush(Actions.NAVIGATION_POP, (send) => {
		const handler = BackHandler.addEventListener("hardwareBackPress", () => {
			send({});
			return true;
		});
		return () => handler.remove();
	});

	const separator = params.appUrl.includes("?") ? "&" : "?";
	const uri = `${params.appUrl}${separator}top=${top}&bottom=${bottom}`;

	return (
		<View style={{ flex: 1, backgroundColor: colors.background.default }}>
			<WebView
				{...webViewProps}
				source={{ uri }}
				overScrollMode="never"
				bounces={false}
				setBuiltInZoomControls={false}
				setDisplayZoomControls={false}
				showsHorizontalScrollIndicator={false}
				scalesPageToFit={true}
				style={{ backgroundColor: "transparent" }}
			/>
		</View>
	);
};