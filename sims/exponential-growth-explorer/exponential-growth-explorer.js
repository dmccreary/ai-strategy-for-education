// Exponential Growth Explorer MicroSim
// Explore how doubling time compounds over educational planning horizons.
// CANVAS_HEIGHT: 540
// Library: p5.js
let canvasWidth = 800;
let drawHeight = 420;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 290;
let defaultTextSize = 16;
let containerWidth;

// chart layout inside the drawing region
let chartLeft = 80;
let chartTop = 55;
let chartBottomPad = 40;

let doublingSlider, startSlider, yearsSlider, resetButton;

const START_YEAR = 2019;
const REF_LINES = [
    { hours: 1, label: '1 hour (one meeting)' },
    { hours: 8, label: '8 hours (one workday)' },
    { hours: 40, label: '40 hours (one work week)' }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    resetButton = createButton('Reset');
    resetButton.parent(document.querySelector('main'));
    resetButton.position(10, drawHeight + 8);
    resetButton.mousePressed(resetDefaults);

    doublingSlider = createSlider(3, 18, 6, 1);
    doublingSlider.parent(document.querySelector('main'));
    doublingSlider.position(sliderLeftMargin, drawHeight + 10);
    doublingSlider.size(canvasWidth - sliderLeftMargin - margin);

    startSlider = createSlider(1, 60, 2, 1);
    startSlider.parent(document.querySelector('main'));
    startSlider.position(sliderLeftMargin, drawHeight + 45);
    startSlider.size(canvasWidth - sliderLeftMargin - margin);

    yearsSlider = createSlider(2, 10, 7, 1);
    yearsSlider.parent(document.querySelector('main'));
    yearsSlider.position(sliderLeftMargin, drawHeight + 80);
    yearsSlider.size(canvasWidth - sliderLeftMargin - margin);

    describe('Exponential growth explorer showing how AI task horizons grow ' +
        'as doubling time compounds over years, with adjustable doubling ' +
        'time, starting task length, and projection horizon.', LABEL);
}

function resetDefaults() {
    doublingSlider.value(6);
    startSlider.value(2);
    yearsSlider.value(7);
}

// task horizon in hours after m months
function horizonHours(startMinutes, doublingMonths, months) {
    return (startMinutes / 60) * Math.pow(2, months / doublingMonths);
}

function draw() {
    updateCanvasSize();

    // required region backgrounds
    fill('aliceblue');
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    const doubling = doublingSlider.value();
    const startMin = startSlider.value();
    const years = yearsSlider.value();
    const totalMonths = years * 12;

    const chartRight = canvasWidth - margin;
    const chartBottom = drawHeight - chartBottomPad;

    // log-scale y range (hours)
    const minHours = startMin / 60;
    const maxHours = horizonHours(startMin, doubling, totalMonths);
    let logMin = Math.floor(Math.log10(minHours) - 0.2);
    let logMax = Math.ceil(Math.log10(Math.max(maxHours, 50)) + 0.2);

    function xFor(months) {
        return map(months, 0, totalMonths, chartLeft, chartRight);
    }
    function yFor(hours) {
        return map(Math.log10(hours), logMin, logMax, chartBottom, chartTop);
    }

    // grid: horizontal decade lines
    stroke(220);
    strokeWeight(1);
    for (let d = logMin; d <= logMax; d++) {
        const y = yFor(Math.pow(10, d));
        line(chartLeft, y, chartRight, y);
        noStroke();
        fill(120);
        textSize(12);
        textAlign(RIGHT, CENTER);
        text(formatHours(Math.pow(10, d)), chartLeft - 6, y);
        stroke(220);
    }

    // x-axis year ticks
    textAlign(CENTER, TOP);
    for (let yr = 0; yr <= years; yr++) {
        const x = xFor(yr * 12);
        stroke(220);
        line(x, chartTop, x, chartBottom);
        noStroke();
        fill(120);
        textSize(12);
        text(START_YEAR + yr, x, chartBottom + 6);
    }

    // axes
    stroke(80);
    strokeWeight(1.5);
    line(chartLeft, chartTop, chartLeft, chartBottom);
    line(chartLeft, chartBottom, chartRight, chartBottom);

    // axis labels
    noStroke();
    fill(60);
    textSize(13);
    textAlign(CENTER, TOP);
    text('Calendar Year', (chartLeft + chartRight) / 2, chartBottom + 22);
    push();
    translate(18, (chartTop + chartBottom) / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER);
    text('Task horizon (hours, log scale)', 0, 0);
    pop();

    // reference lines + crossing stars
    REF_LINES.forEach(function (ref) {
        if (Math.log10(ref.hours) < logMin || Math.log10(ref.hours) > logMax) return;
        const y = yFor(ref.hours);
        stroke('#c62828');
        strokeWeight(1);
        drawingContext.setLineDash([6, 5]);
        line(chartLeft, y, chartRight, y);
        drawingContext.setLineDash([]);
        noStroke();
        fill('#c62828');
        textSize(11);
        textAlign(LEFT, BOTTOM);
        text(ref.label, chartLeft + 6, y - 2);

        // crossing point (where curve first exceeds ref line)
        const crossMonths = doubling * Math.log2(ref.hours / (startMin / 60));
        if (crossMonths >= 0 && crossMonths <= totalMonths) {
            const cx = xFor(crossMonths);
            drawStar(cx, y, 5, 9, 5);
            noStroke();
            fill('#c62828');
            textSize(11);
            textAlign(CENTER, BOTTOM);
            text((START_YEAR + crossMonths / 12).toFixed(1), cx, y - 10);
        }
    });

    // growth curve (monthly resolution)
    stroke('#E65100');
    strokeWeight(2.5);
    noFill();
    beginShape();
    for (let m = 0; m <= totalMonths; m++) {
        vertex(xFor(m), yFor(horizonHours(startMin, doubling, m)));
    }
    endShape();

    // yearly points + hover tooltip
    let hovered = null;
    for (let yr = 0; yr <= years; yr++) {
        const h = horizonHours(startMin, doubling, yr * 12);
        const x = xFor(yr * 12), y = yFor(h);
        fill('#E65100');
        noStroke();
        circle(x, y, 9);
        if (dist(mouseX, mouseY, x, y) < 10) {
            hovered = { year: START_YEAR + yr, hours: h, x: x, y: y };
        }
    }
    if (hovered) {
        const label = 'Year ' + hovered.year + ' — Task horizon: ' +
            formatHours(hovered.hours);
        textSize(13);
        const w = textWidth(label) + 16;
        const bx = constrain(hovered.x - w / 2, chartLeft, chartRight - w);
        fill(255, 255, 255, 235);
        stroke(150);
        rect(bx, hovered.y - 38, w, 24, 6);
        noStroke();
        fill(30);
        textAlign(LEFT, CENTER);
        text(label, bx + 8, hovered.y - 26);
    }

    // title (after grid/axes)
    fill('black');
    textSize(22);
    textAlign(CENTER, TOP);
    noStroke();
    text('Exponential Growth Explorer', canvasWidth / 2, 10);
    textSize(13);
    fill(90);
    text('How AI task horizons compound with a fixed doubling time',
        canvasWidth / 2, 34);

    // control labels
    fill('black');
    noStroke();
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text('Doubling time (months): ' + doubling, 80, drawHeight + 20);
    text('Starting task horizon (minutes): ' + startMin, 80, drawHeight + 55);
    text('Years to project: ' + years, 80, drawHeight + 90);
}

function formatHours(h) {
    if (h < 1 / 60 * 1.5) return (h * 60).toFixed(1) + ' min';
    if (h < 1) return (h * 60).toFixed(0) + ' min';
    if (h < 100) return h.toFixed(1) + ' hrs';
    return Math.round(h).toLocaleString() + ' hrs';
}

function drawStar(x, y, points, outer, inner) {
    fill('#c62828');
    noStroke();
    beginShape();
    for (let i = 0; i < points * 2; i++) {
        const r = (i % 2 === 0) ? outer : inner;
        const a = -HALF_PI + i * PI / points;
        vertex(x + r * Math.cos(a), y + r * Math.sin(a));
    }
    endShape(CLOSE);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    doublingSlider.size(canvasWidth - sliderLeftMargin - margin);
    startSlider.size(canvasWidth - sliderLeftMargin - margin);
    yearsSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        containerWidth = container.offsetWidth;
        canvasWidth = containerWidth;
    }
}
