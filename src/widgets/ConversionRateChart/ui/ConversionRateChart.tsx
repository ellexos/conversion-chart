import {
    ComposedChart,
    CartesianGrid,
    Legend,
    Line,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Area,
    ReferenceArea,
} from "recharts";
import { dailyData, weeklyData } from '../../../shared/api/loadData';
import { useChartControlsStore } from "../../../shared/model/ChartControls";
import { VARIATION_COLORS, VARIATION_LABELS } from "../../../features/VariantSelector/model/constants";
import { useChartZoom } from "../hooks/useChartZoom";
import styles from "./ConversionRateChart.module.css";
import { useMemo, forwardRef } from "react";

const BASE_HEIGHT = 400;

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export const ConversionRateChart = forwardRef<HTMLDivElement>((_, ref) => {
    const { activeVariations, aggregationMode, lineStyle } = useChartControlsStore();

    const periodData = aggregationMode === 'day' ? dailyData : weeklyData;

    const filteredData = useMemo(
        () => periodData.filter(row => activeVariations.some(key => row[key] != null)),
        [periodData, activeVariations]
    );

    const {
        zoomedData: data,
        dragStart,
        dragEnd,
        isDragging,
        isZoomed,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleMouseLeave,
        handleResetZoom,
    } = useChartZoom(filteredData);

    const isArea = lineStyle === 'area';
    const lineType = lineStyle === 'line' ? 'linear' : 'monotone';

    return (
        <div className={styles.container} ref={ref}>
            {isZoomed && (
                <button onClick={handleResetZoom} className={styles.resetButton}>
                    Reset Zoom
                </button>
            )}
            <div className={styles.chartWrapper} style={{ height: BASE_HEIGHT }}>
                <ResponsiveContainer>
                    <ComposedChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={formatDate}
                            stroke="var(--text-secondary)"
                            fontSize={10}
                            allowDataOverflow
                        />
                        <YAxis
                            tickFormatter={(v) => `${v}%`}
                            stroke="var(--text-secondary)"
                            fontSize={12}
                            width={50}
                            allowDataOverflow
                        />
                        <Tooltip
                            cursor={{ stroke: 'var(--text-secondary)', strokeDasharray: '3 3' }}
                            labelFormatter={(label) => formatDate(label as string)}
                        />
                        <Legend />
                        {activeVariations.map(key =>
                            isArea ? (
                                <Area key={key} type={lineType} dataKey={key} name={VARIATION_LABELS[key]}
                                    stroke={VARIATION_COLORS[key]} fill={VARIATION_COLORS[key]} fillOpacity={0.3}
                                    strokeWidth={2} dot={false} connectNulls />
                            ) : (
                                <Line key={key} type={lineType} dataKey={key} name={VARIATION_LABELS[key]}
                                    stroke={VARIATION_COLORS[key]} strokeWidth={2} dot={false} connectNulls />
                            )
                        )}
                        {isDragging && (
                            <ReferenceArea
                                x1={dragStart ?? undefined}
                                x2={dragEnd ?? undefined}
                                strokeOpacity={0.3}
                                fill="var(--accent-color)"
                                fillOpacity={0.3}
                            />
                        )}
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
});
