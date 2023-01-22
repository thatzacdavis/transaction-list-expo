export const computeTransactionBadgeColor = (title) => {
    switch (title) {
        case 'posted':
            return '#3EB489'
        case 'declined':
            return '#E3655B'
        case 'entertainment':
            return '#6DD6DA'
        case 'food':
            return '#EF946C'
        case 'refunded':
            return '#BCACFB'
    }
    return '#596157'
}