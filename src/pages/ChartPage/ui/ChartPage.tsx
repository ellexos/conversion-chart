import { useRef } from "react";
import { ChartControllers } from "../../../widgets/ChartControllers";
import { ConversionRateChart } from "../../../widgets/ConversionRateChart";
import styles from "./ChartPage.module.css";

export const ChartPage = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>A/B Test – Conversion Rate</h1>
            <ChartControllers chartRef={chartRef} />
            <ConversionRateChart ref={chartRef} />
        </div>
    );
};
