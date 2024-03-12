export function getTime(time: Date) {
    if (!time) {
        return null;
    }

    return time.toISOString().split('T')[1].slice(0, 5);
} 