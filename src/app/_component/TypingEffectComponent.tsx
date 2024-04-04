"use client"
import { useState, useEffect } from "react";


const TypingEffect = ({ text, delay = 100, cursor = '|', style }: { text: string, delay?: number, cursor?: string, style?: React.CSSProperties }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const lines = text.split('\n');
    const [showCursor, setShowCursor] = useState<boolean>(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayText(lines.slice(0, currentIndex).join('\n') + (showCursor ? cursor : ''));
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }, delay);

        return () => {
            clearInterval(interval)
            setShowCursor(false);
        };
    }, [currentIndex, delay, lines, cursor, showCursor]);

    // useEffect(() => {
    //     const cursorIntervalId = setInterval(() => {
    //         setShowCursor((prev) => !prev);
    //     }, 500);

    //     return () => clearInterval(cursorIntervalId)
    // }, [])

    return <span style={{ whiteSpace: 'pre-line', ...style }}>{displayText}</span>;
}

export default TypingEffect