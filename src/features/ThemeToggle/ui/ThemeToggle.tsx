import { useChartControlsStore } from "../../../shared/model/ChartControls";
import styles from "./ThemeToggle.module.css";

export const ThemeToggle = () => {
    const theme = useChartControlsStore((s) => s.theme);
    const setTheme = useChartControlsStore((s) => s.setTheme);
    const isDark = theme === 'dark';

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <div className={styles.container}>
            <span className={styles.label}>☀️</span>
            <button
                onClick={toggleTheme}
                className={`${styles.toggle} ${isDark ? styles.toggleActive : ''}`}
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
                <span className={styles.toggleKnob} />
            </button>
            <span className={styles.label}>🌙</span>
        </div>
    );
};
