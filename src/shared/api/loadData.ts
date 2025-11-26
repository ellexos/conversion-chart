import { groupBy, sumBy } from 'lodash';
import { startOfWeek, parseISO, format } from 'date-fns';
import raw from './data.json';

export type ChartRow = {
    date: string;
    original: number | null;
    optA: number | null;
    optB: number | null;
    optC: number | null;
}

const VARIATION_DATA_IDS = {
    original: '0',
    optA: '10001',
    optB: '10002',
    optC: '10003',
} as const;

export function calcConversionPercent(conversions: number, visits: number): number | null {
    if (visits === 0) return null;
    return Number(((conversions / visits) * 100).toFixed(2));
}

const getWeekStart = (dateStr: string): string =>
    format(startOfWeek(parseISO(dateStr), { weekStartsOn: 1 }), 'yyyy-MM-dd');

export const dailyData: ChartRow[] = raw.data.map(day => ({
    date: day.date,
    original: calcConversionPercent(day.conversions[VARIATION_DATA_IDS.original] ?? 0, day.visits[VARIATION_DATA_IDS.original] ?? 0),
    optA: calcConversionPercent(day.conversions[VARIATION_DATA_IDS.optA] ?? 0, day.visits[VARIATION_DATA_IDS.optA] ?? 0),
    optB: calcConversionPercent(day.conversions[VARIATION_DATA_IDS.optB] ?? 0, day.visits[VARIATION_DATA_IDS.optB] ?? 0),
    optC: calcConversionPercent(day.conversions[VARIATION_DATA_IDS.optC] ?? 0, day.visits[VARIATION_DATA_IDS.optC] ?? 0),
}));

export const weeklyData: ChartRow[] = Object.entries(
    groupBy(raw.data, day => getWeekStart(day.date))
)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([weekStart, days]) => ({
        date: weekStart,
        original: calcConversionPercent(
            sumBy(days, d => d.conversions[VARIATION_DATA_IDS.original] ?? 0),
            sumBy(days, d => d.visits[VARIATION_DATA_IDS.original] ?? 0)
        ),
        optA: calcConversionPercent(
            sumBy(days, d => d.conversions[VARIATION_DATA_IDS.optA] ?? 0),
            sumBy(days, d => d.visits[VARIATION_DATA_IDS.optA] ?? 0)
        ),
        optB: calcConversionPercent(
            sumBy(days, d => d.conversions[VARIATION_DATA_IDS.optB] ?? 0),
            sumBy(days, d => d.visits[VARIATION_DATA_IDS.optB] ?? 0)
        ),
        optC: calcConversionPercent(
            sumBy(days, d => d.conversions[VARIATION_DATA_IDS.optC] ?? 0),
            sumBy(days, d => d.visits[VARIATION_DATA_IDS.optC] ?? 0)
        ),
    }));
