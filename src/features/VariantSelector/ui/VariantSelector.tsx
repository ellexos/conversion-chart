import { useState, useRef, useEffect } from "react";
import { useChartControlsStore } from "../../../shared/model/ChartControls";
import { VARIATIONS } from "../model/constants";
import styles from "./VariantSelector.module.css";

export function VariantSelector() {
    const activeVariations = useChartControlsStore((s) => s.activeVariations);
    const toggleVariation = useChartControlsStore((s) => s.toggleVariation);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const displayText = activeVariations.length === VARIATIONS.length
        ? 'All variations'
        : activeVariations.length === 0
            ? 'Select variations'
            : `${activeVariations.length} selected`;

    return (
        <div className={styles.container} ref={containerRef}>
            <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
                <span className={styles.triggerText}>{displayText}</span>
                <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
                <div className={styles.dropdown}>
                    {VARIATIONS.map((v) => {
                        const active = activeVariations.includes(v.id);
                        return (
                            <label key={v.id} className={styles.option}>
                                <input
                                    type="checkbox"
                                    checked={active}
                                    onChange={() => toggleVariation(v.id)}
                                    className={styles.checkbox}
                                />
                                <span className={styles.dot} style={{ backgroundColor: v.color }} />
                                <span>{v.label}</span>
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
