import html2canvas from 'html2canvas';
import type { RefObject } from 'react';
import styles from "./ExportPng.module.css";

interface ExportPngProps {
    chartRef: RefObject<HTMLDivElement | null>;
}

export const ExportPng = ({ chartRef }: ExportPngProps) => {
    const exportChart = async () => {
        if (!chartRef.current) return;

        const canvas = await html2canvas(chartRef.current, {
            backgroundColor: '#ffffff',
            scale: 2,
        });

        canvas.toBlob((blob) => {
            if (!blob) return;
            const link = document.createElement('a');
            link.download = 'ab-test-chart.png';
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
        }, 'image/png');
    };

    return (
        <button onClick={exportChart} className={styles.button}>
            Export PNG
        </button>
    );
};
