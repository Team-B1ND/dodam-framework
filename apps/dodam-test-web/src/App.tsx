import { RouteProvider, Router, type Routes } from "@b1nd/aid-kit/navigation";
import { TabLayout } from "./pages/TabLayout";
import { HomePage } from "./pages/HomePage";
import { SettingsPage } from "./pages/SettingsPage";
import { DetailPage } from "./pages/DetailPage";

const routes: Routes = {
  tabs: [
    {
      path: "/",
      element: TabLayout,
      children: [
        { path: "/", index: true, element: HomePage },
        { path: "/settings", element: SettingsPage },
      ],
    },
  ],
  stacks: [{ path: "/detail", element: DetailPage }],
};

const App = () => {
  return (
    <RouteProvider routes={routes}>
      <Router routes={routes} />
    </RouteProvider>
  );
};

export default App;
