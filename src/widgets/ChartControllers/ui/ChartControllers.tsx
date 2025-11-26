import type { RefObject } from "react";
import { AggregationModeSelector } from "../../../features/AggregationModeSelector";
import { LineStyleSelector } from "../../../features/LineStyleSelector";
import { VariantSelector } from "../../../features/VariantSelector";
import { ThemeToggle } from "../../../features/ThemeToggle";
import { ExportPng } from "../../../features/ExportPng";
import styles from "./ChartControllers.module.css";

interface ChartControllersProps {
    chartRef: RefObject<HTMLDivElement | null>;
}

export const ChartControllers = ({ chartRef }: ChartControllersProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.leftGroup}>
                <div>
                    <div className={styles.controlLabel}>Option</div>
                    <VariantSelector />
                </div>
                <div>
                    <div className={styles.controlLabel}>Period</div>
                    <AggregationModeSelector />
                </div>
            </div>
            <div className={styles.rightGroup}>
                <div>
                    <div className={styles.controlLabel}>Style</div>
                    <LineStyleSelector />
                </div>
                <div>
                    <div className={styles.controlLabel}>Theme</div>
                    <ThemeToggle />
                </div>
                <div>
                    <div className={styles.controlLabel}>Export</div>
                    <ExportPng chartRef={chartRef} />
                </div>
            </div>
        </div>
    );
};
