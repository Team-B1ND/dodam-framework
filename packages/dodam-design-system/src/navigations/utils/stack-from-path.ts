import { matchRoute } from "./match-route";

export const stackFromPath = (pathname: string, routes: { path: string }[]) => {
  if (pathname === "/") return ["/"];

  const segments = pathname.split("/").filter(Boolean);

  const stack: string[] = [];
  let acc = "";

  for (const seg of segments) {
    acc += `/${seg}`;

    const matched = routes.some((r) => matchRoute(r.path, acc));
    if (matched) {
      stack.push(acc);
    }
  }

  return stack.length ? stack : ["/"];
};
