import * as colors from './colors.js';
import * as transforms from "./transforms.js";
import * as combiners from "./combiners.js";
import * as shapes from './shapes.js';
import * as distanceFields from './distanceFields.js';
let errorLog;
function ensureErrorLog() {
    if (!errorLog) {
        errorLog = document.createElement("pre");
        document.body.appendChild(errorLog);
    }
}
window.addEventListener("error", (ev) => {
    ensureErrorLog();
    errorLog.innerText += ev.error.toString();
});
if (document.body) {
    main();
}
else {
    document.addEventListener("load", main, { once: true });
}
function createImage(t) {
    const grid = distanceFields.toShape(transforms.scale(0.1, 0.1)(distanceFields.gridLines), 0.01);
    const pattern = transforms.scale(0.025, 0.025)((x, y) => (Math.floor(x) % 2 == 0) == (Math.floor(y) % 2 == 0));
    const shape1 = combiners.intesect(transforms.rotate(0.25 * Math.PI)(pattern), combiners.union(shapes.circle(0.25), shapes.circle(0.125, 0, -0.2)));
    const shape2 = distanceFields.toShape(distanceFields.rectFilled(-0.5, -0.5, 1, 1), 0.25);
    const shape3 = distanceFields.toShape(distanceFields.combine(distanceFields.point(-0.33 * Math.sin(0.001 * t), -0.33), distanceFields.circle(0.5)), 0.05);
    const shrink = transforms.scale(0.5, 0.5);
    const move = transforms.translate(0.5 * Math.sin(0.001 * t), 0.5 * Math.cos(0.001 * t));
    const sine = distanceFields.toShape(distanceFields.fromFunctionNaiveApprox((x) => 0.5 * Math.sin(50 * x)), 0.05);
    const colorWaves = (() => {
        const center = distanceFields.point(0, 0);
        return (x, y) => {
            const val = 50 + ((0.5 * (Math.sin(center(x, y) * 50) + 1)) * 127);
            return [val, val, 0];
        };
    })();
    const image = combiners.layer(shapes.fill(sine, () => colors.black), move(shrink(shapes.fill(shape3, (x) => [x * 127 + 127, 0, 0]))), transforms.translate(0.5, 0)(shapes.fill(shape1, () => colors.blue)), shapes.fill(shape2, colorWaves), shapes.fill(grid, () => [0x99, 0x99, 0x99]), shapes.fill(pattern, () => [0xdd, 0xdd, 0xdd]));
    return combiners.finalize(image, () => colors.white);
}
function main() {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    document.body.appendChild(canvas);
    let t = 0;
    let lastRender = performance.now();
    const doRender = () => render(canvas, createImage(t), 8);
    doRender();
    // const loop = () => {
    //   doRender();
    //   const now = performance.now()
    //   t += now - lastRender;
    //   lastRender = now
    //   requestAnimationFrame(loop);
    // }
    // requestAnimationFrame(loop);
}
function* sampleGenerator(x, y) {
    yield [x + 0.5, y + 0.5];
    while (true) {
        yield [x + Math.random(), y + Math.random()];
    }
}
function render(canvas, image, samplesPerPixel = 1) {
    const { width, height } = canvas;
    const ctx = canvas.getContext("2d");
    const forRender = transforms.renderTransform(width, height)(image);
    const frame = ctx.createImageData(width, height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const samples = sampleGenerator(x, y);
            const accu = [0, 0, 0];
            for (let i = 0; i < samplesPerPixel; i++) {
                const [sampleX, sampleY] = samples.next().value;
                const sample = forRender(sampleX, sampleY);
                accu[0] += sample[0];
                accu[1] += sample[1];
                accu[2] += sample[2];
            }
            const r = accu[0] / samplesPerPixel;
            const g = accu[1] / samplesPerPixel;
            const b = accu[2] / samplesPerPixel;
            const pixelBase = 4 * (y * width + x);
            frame.data[pixelBase + 0] = r;
            frame.data[pixelBase + 1] = g;
            frame.data[pixelBase + 2] = b;
            frame.data[pixelBase + 3] = 255;
        }
    }
    ctx.putImageData(frame, 0, 0);
}
