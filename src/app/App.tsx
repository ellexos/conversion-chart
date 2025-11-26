import { useEffect } from "react";
import { ChartPage } from "../pages";
import { useChartControlsStore } from "../shared/model/ChartControls";

function App() {
  const theme = useChartControlsStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <ChartPage />;
}

export default App;
