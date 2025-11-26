import { useState, useCallback, useMemo } from 'react';
import type { CategoricalChartFunc } from 'recharts/types/chart/types';

interface ZoomableData {
    date: string;
}

export function useChartZoom<T extends ZoomableData>(data: T[]) {
    const [zoomRange, setZoomRange] = useState<[number, number] | null>(null);
    const [dragStart, setDragStart] = useState<string | null>(null);
    const [dragEnd, setDragEnd] = useState<string | null>(null);

    const zoomedData = useMemo(() => {
        if (!zoomRange) return data;
        return data.slice(zoomRange[0], zoomRange[1] + 1);
    }, [data, zoomRange]);

    const handleMouseDown: CategoricalChartFunc = useCallback((state) => {
        if (state.activeLabel) {
            setDragStart(state.activeLabel);
            setDragEnd(state.activeLabel);
        }
    }, []);

    const handleMouseMove: CategoricalChartFunc = useCallback((state) => {
        if (dragStart && state.activeLabel) {
            setDragEnd(state.activeLabel);
        }
    }, [dragStart]);

    const finishZoom = useCallback(() => {
        if (dragStart && dragEnd && dragStart !== dragEnd) {
            const startIdx = data.findIndex(d => d.date === dragStart);
            const endIdx = data.findIndex(d => d.date === dragEnd);

            if (startIdx !== -1 && endIdx !== -1) {
                setZoomRange([Math.min(startIdx, endIdx), Math.max(startIdx, endIdx)]);
            }
        }
        setDragStart(null);
        setDragEnd(null);
    }, [dragStart, dragEnd, data]);

    const handleResetZoom = useCallback(() => {
        setZoomRange(null);
    }, []);

    return {
        zoomedData,
        dragStart,
        dragEnd,
        isDragging: dragStart !== null && dragEnd !== null && dragStart !== dragEnd,
        isZoomed: zoomRange !== null,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp: finishZoom,
        handleMouseLeave: finishZoom,
        handleResetZoom,
    };
}
