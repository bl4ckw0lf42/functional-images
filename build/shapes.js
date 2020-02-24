export function fill(shape, texture) {
    return (x, y) => shape(x, y) ? texture(x, y) : undefined;
}
export function circle(r = 1, cx = 0, cy = 0) {
    return (x, y) => {
        const dx = x - cx;
        const dy = y - cy;
        return Math.sqrt(dx * dx + dy * dy) < r;
    };
}
