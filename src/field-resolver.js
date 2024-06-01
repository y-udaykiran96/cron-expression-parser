function resolveField(field, range) {
    switch (true) {
        case field === '*':
            return rangeArray(range);
        case field.includes('/'):
            return expandStep(field, range);
        case field.includes('-') || field.includes(','):
            return expandList(field);
        default: return [parseInt(field, 10)];
    }
}

function rangeArray([start, end]) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function expandStep(field, [start, end]) {
    const [base, step] = field.split('/');
    const baseRange = base === '*' ? rangeArray([start, end]) : expandList(base);
    return baseRange.filter(num => (num - start) % parseInt(step, 10) === 0);
}

function expandList(field) {
    return field.split(',').flatMap(part => {
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(Number);
            return rangeArray([start, end]);
        }
        return [parseInt(part, 10)];
    });
}

module.exports = {
    resolveField
}