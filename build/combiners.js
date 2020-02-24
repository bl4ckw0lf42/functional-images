export function finalize(notComplete, background) {
    return (x, y) => notComplete(x, y) || background(x, y);
}
export function layer(...textures) {
    return (x, y) => {
        for (const tex of textures) {
            const res = tex(x, y);
            if (res) {
                return res;
            }
        }
    };
}
export function union(shape1, shape2) {
    return (x, y) => shape1(x, y) || shape2(x, y);
}
export function intesect(shape1, shape2) {
    return (x, y) => shape1(x, y) && shape2(x, y);
}
export function cut(shape1, shape2) {
    return (x, y) => shape1(x, y) && !shape2(x, y);
}
