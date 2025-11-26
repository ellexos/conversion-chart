import { create } from 'zustand';

export type VariationKey = 'original' | 'optA' | 'optB' | 'optC';
export type AggregationMode = 'day' | 'week';
export type LineStyle = 'line' | 'smooth' | 'area';
export type Theme = 'light' | 'dark';

interface ChartControlsState {
    activeVariations: VariationKey[];
    aggregationMode: AggregationMode;
    lineStyle: LineStyle;
    theme: Theme;

    toggleVariation: (id: VariationKey) => void;
    setAggregationMode: (mode: AggregationMode) => void;
    setLineStyle: (style: LineStyle) => void;
    setTheme: (theme: Theme) => void;
}

const ALL_VARIATIONS: VariationKey[] = ['original', 'optA', 'optB', 'optC'];

export const useChartControlsStore = create<ChartControlsState>((set, get) => ({
    activeVariations: ALL_VARIATIONS,
    aggregationMode: 'day',
    lineStyle: 'line',
    theme: 'light',

    toggleVariation: (id) => {
        const { activeVariations } = get();
        const isActive = activeVariations.includes(id);

        if (isActive) {
            if (activeVariations.length === 1) return;
            set({
                activeVariations: activeVariations.filter((v) => v !== id),
            });
        } else {
            set({
                activeVariations: [...activeVariations, id],
            });
        }
    },

    setAggregationMode: (mode) => set({ aggregationMode: mode }),
    setLineStyle: (style) => set({ lineStyle: style }),
    setTheme: (theme) => set({ theme }),
}));
