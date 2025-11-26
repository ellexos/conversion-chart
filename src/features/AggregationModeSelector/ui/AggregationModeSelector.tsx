import { useChartControlsStore } from "../../../shared/model/ChartControls";
import type { AggregationMode } from "../../../shared/model/ChartControls";
import styles from "./AggregationModeSelector.module.css";

export const AggregationModeSelector = () => {
    const aggregationMode = useChartControlsStore((s) => s.aggregationMode);
    const setAggregationMode = useChartControlsStore((s) => s.setAggregationMode);

    return (
        <select
            value={aggregationMode}
            onChange={(e) => setAggregationMode(e.target.value as AggregationMode)}
            className={styles.select}
        >
            <option value="day">Day</option>
            <option value="week">Week</option>
        </select>
    );
};