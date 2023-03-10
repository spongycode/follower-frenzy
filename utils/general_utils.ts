const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(2)}K`;
    } else {
        return `${num}`;
    }
}

export { formatNumber };


