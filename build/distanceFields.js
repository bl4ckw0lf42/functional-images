export function point(px, py) {
    return (x, y) => {
        const dx = px - x;
        const dy = py - y;
        return Math.sqrt(dx * dx + dy * dy);
    };
}
export function circle(r = 1, cx = 0, cy = 0) {
    const center = point(cx, cy);
    return (x, y) => Math.abs(center(x, y) - r);
}
export function rectFilled(x, y, w, h) {
    const right = x + w;
    const bottom = y + h;
    const upperLeft = point(x, y);
    const lowerLeft = point(x, bottom);
    const upperRight = point(right, y);
    const lowerRight = point(right, bottom);
    return (_x, _y) => {
        if (_x < x) {
            if (_y < y) {
                return upperLeft(_x, _y);
            }
            else if (_y > bottom) {
                return lowerLeft(_x, _y);
            }
            return x - _x;
        }
        else if (_x > right) {
            if (_y < y) {
                return upperRight(_x, _y);
            }
            else if (_y > bottom) {
                return lowerRight(_x, _y);
            }
            return _x - right;
        }
        else {
            if (_y < y) {
                return y - _y;
            }
            else if (_y > bottom) {
                return _y - bottom;
            }
            else {
                return 0;
            }
        }
    };
}
export function toShape(field, threshold) {
    return (x, y) => field(x, y) <= threshold;
}
export function combine(...fields) {
    return (x, y) => Math.min(...fields.map(f => f(x, y)));
}
export const gridLines = (x, y) => {
    return Math.min(Math.abs(Math.round(x) - x), Math.abs(Math.round(y) - y));
};
export function fromFunctionNaiveApprox(f) {
    return (x, y) => Math.abs(y - f(x));
}
