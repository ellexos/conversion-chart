import type { VariationKey } from '../../../shared/model/ChartControls';

export interface VariationOption {
    id: VariationKey;
    label: string;
    color: string;
}

export const VARIATIONS: VariationOption[] = [
    { id: 'original', label: 'Original', color: '#8884d8' },
    { id: 'optA', label: 'Variation A', color: '#82ca9d' },
    { id: 'optB', label: 'Variation B', color: '#ffc658' },
    { id: 'optC', label: 'Variation C', color: '#ff7300' },
];

export const VARIATION_COLORS: Record<VariationKey, string> = Object.fromEntries(
    VARIATIONS.map(v => [v.id, v.color])
) as Record<VariationKey, string>;

export const VARIATION_LABELS: Record<VariationKey, string> = Object.fromEntries(
    VARIATIONS.map(v => [v.id, v.label])
) as Record<VariationKey, string>;