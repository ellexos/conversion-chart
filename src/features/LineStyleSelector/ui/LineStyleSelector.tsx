import { useChartControlsStore } from "../../../shared/model/ChartControls";
import type { LineStyle } from "../../../shared/model/ChartControls";
import styles from "./LineStyleSelector.module.css";

export const LineStyleSelector = () => {
    const lineStyle = useChartControlsStore((s) => s.lineStyle);
    const setLineStyle = useChartControlsStore((s) => s.setLineStyle);

    return (
        <select
            value={lineStyle}
            onChange={(e) => setLineStyle(e.target.value as LineStyle)}
            className={styles.select}
        >
            <option value="line">Line</option>
            <option value="smooth">Smooth</option>
            <option value="area">Area</option>
        </select>
    );
};