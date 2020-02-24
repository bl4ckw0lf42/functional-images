export function renderTransform(width, height) {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    return (image) => (x, y) => image((x - halfWidth) / halfWidth, (y - halfHeight) / halfHeight);
}
export function translate(tx, ty) {
    return (tex) => (x, y) => tex(x - tx, y - ty);
}
export function scale(sx, sy) {
    return (tex) => (x, y) => tex(x / sx, y / sy);
}
export function rotate(phi) {
    return (tex) => (x, y) => {
        const sinPhi = Math.sin(phi);
        const cosPhi = Math.cos(phi);
        return tex(cosPhi * x - sinPhi * y, sinPhi * x + cosPhi * y);
    };
}
