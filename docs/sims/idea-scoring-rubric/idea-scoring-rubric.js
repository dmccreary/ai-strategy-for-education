// Idea Scoring Rubric MicroSim
// Apply the five-dimension scoring rubric to a sample idea and calculate
// a composite score with a live radar chart.
// CANVAS_HEIGHT: 590
// Library: p5.js
let canvasWidth = 800;
let drawHeight = 400;
let controlHeight = 190;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 290;
let defaultTextSize = 16;
let containerWidth;

let feasibilitySlider, benefitSlider, riskSlider, costSlider;
let equitySelect, resetButton;

const SAMPLE_IDEA = 'Sample idea: A third-grade teacher proposes using an ' +
    'AI reading tool to generate differentiated reading passages for each ' +
    'student’s level. Students would access these through the school’s ' +
    'existing reading platform. No new student data would be collected ' +
    'beyond what is already tracked.';

const AXES = ['Feasibility', 'Benefit', 'Risk', 'Cost-Effect.', 'Equity'];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    feasibilitySlider = createSlider(1, 5, 3, 1);
    feasibilitySlider.parent(document.querySelector('main'));
    feasibilitySlider.position(sliderLeftMargin, drawHeight + 10);
    feasibilitySlider.size(canvasWidth - sliderLeftMargin - margin);

    benefitSlider = createSlider(1, 5, 3, 1);
    benefitSlider.parent(document.querySelector('main'));
    benefitSlider.position(sliderLeftMargin, drawHeight + 45);
    benefitSlider.size(canvasWidth - sliderLeftMargin - margin);

    riskSlider = createSlider(1, 5, 3, 1);
    riskSlider.parent(document.querySelector('main'));
    riskSlider.position(sliderLeftMargin, drawHeight + 80);
    riskSlider.size(canvasWidth - sliderLeftMargin - margin);

    costSlider = createSlider(1, 5, 3, 1);
    costSlider.parent(document.querySelector('main'));
    costSlider.position(sliderLeftMargin, drawHeight + 115);
    costSlider.size(canvasWidth - sliderLeftMargin - margin);

    equitySelect = createSelect();
    equitySelect.parent(document.querySelector('main'));
    equitySelect.option('Positive (+1)');
    equitySelect.option('Neutral (0)');
    equitySelect.option('Negative (−2)');
    equitySelect.selected('Neutral (0)');
    equitySelect.position(sliderLeftMargin, drawHeight + 150);

    resetButton = createButton('Reset');
    resetButton.parent(document.querySelector('main'));
    resetButton.position(10, drawHeight + 150);
    resetButton.mousePressed(resetDefaults);

    describe('Idea scoring rubric with sliders for feasibility, benefit, ' +
        'risk, and cost-effectiveness plus an equity selector. A radar ' +
        'chart and composite score update in real time.', LABEL);
}

function resetDefaults() {
    feasibilitySlider.value(3);
    benefitSlider.value(3);
    riskSlider.value(3);
    costSlider.value(3);
    equitySelect.selected('Neutral (0)');
}

function equityAdjustment() {
    const v = equitySelect.value();
    if (v.indexOf('Positive') === 0) return 1;
    if (v.indexOf('Negative') === 0) return -2;
    return 0;
}

function draw() {
    updateCanvasSize();

    fill('aliceblue');
    stroke('silver');
    rect(0, 0, canvasWidth, drawHeight);
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    const f = feasibilitySlider.value();
    const b = benefitSlider.value();
    const r = riskSlider.value();
    const c = costSlider.value();
    const eq = equityAdjustment();
    const composite = f + b + r + c + eq;

    // title
    fill('black');
    textSize(22);
    textAlign(CENTER, TOP);
    noStroke();
    text('Idea Scoring Rubric', canvasWidth / 2, 10);

    // ---- left panel: sample idea ----
    const panelW = Math.min(canvasWidth * 0.40, 340);
    fill(255, 255, 255, 235);
    stroke(200);
    rect(margin - 10, 48, panelW, 190, 10);
    noStroke();
    fill(40);
    textSize(13.5);
    textAlign(LEFT, TOP);
    text(SAMPLE_IDEA, margin, 58, panelW - 30, 175);

    // interpretation bands box
    fill(255, 255, 255, 235);
    stroke(200);
    rect(margin - 10, 252, panelW, 118, 10);
    noStroke();
    fill(40);
    textSize(13.5);
    text('Interpretation bands:', margin, 262);
    textSize(13);
    fill(highlightIf(composite >= 4 && composite <= 8, '#c62828'));
    text('4–8 = Low priority', margin, 284);
    fill(highlightIf(composite >= 9 && composite <= 14, '#b35900'));
    text('9–14 = Consider for pilot', margin, 304);
    fill(highlightIf(composite >= 15 && composite <= 19, '#2e7d32'));
    text('15–19 = Strong candidate', margin, 324);
    fill(highlightIf(composite >= 20, '#1b5e20'));
    text('20+ = High priority', margin, 344);

    // ---- radar chart, right side ----
    const cx = panelW + (canvasWidth - panelW) / 2 + 5;
    const cy = 215;
    const radius = 125;
    const values = [f, b, r, c, eq === 1 ? 5 : (eq === 0 ? 3 : 1)];

    // grid rings
    stroke(200);
    noFill();
    for (let ring = 1; ring <= 5; ring++) {
        polygonShape(cx, cy, radius * ring / 5, 5);
    }
    // axis lines + labels
    for (let i = 0; i < 5; i++) {
        const a = -HALF_PI + i * TWO_PI / 5;
        const x2 = cx + radius * Math.cos(a);
        const y2 = cy + radius * Math.sin(a);
        stroke(200);
        line(cx, cy, x2, y2);
        noStroke();
        fill(60);
        textSize(13);
        textAlign(CENTER, CENTER);
        text(AXES[i], cx + (radius + 26) * Math.cos(a),
            cy + (radius + 18) * Math.sin(a));
    }

    // score polygon — color from red to green by composite (range ~2-21)
    const t = constrain((composite - 4) / 17, 0, 1);
    const polyColor = lerpColor(lerpColor(color('#c62828'), color('#fbc02d'), Math.min(1, t * 2)),
        color('#2e7d32'), Math.max(0, t * 2 - 1));
    polyColor.setAlpha(150);
    fill(polyColor);
    stroke(polyColor);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < 5; i++) {
        const a = -HALF_PI + i * TWO_PI / 5;
        const rr = radius * values[i] / 5;
        vertex(cx + rr * Math.cos(a), cy + rr * Math.sin(a));
    }
    endShape(CLOSE);
    strokeWeight(1);

    // composite score display
    noStroke();
    fill(30);
    textSize(20);
    textAlign(CENTER, TOP);
    text('Composite score: ' + composite, cx, drawHeight - 42);
    textSize(14);
    fill(90);
    text(bandLabel(composite), cx, drawHeight - 18);

    // ---- control labels ----
    fill('black');
    noStroke();
    textSize(defaultTextSize);
    textAlign(LEFT, CENTER);
    text('Feasibility: ' + f, 10, drawHeight + 20);
    text('Benefit: ' + b, 10, drawHeight + 55);
    text('Risk (lower = riskier): ' + r, 10, drawHeight + 90);
    text('Cost-Effectiveness (lower = costly): ' + c, 10, drawHeight + 125);
    text('Equity Impact:', 80, drawHeight + 160);
}

function highlightIf(cond, colorStr) {
    return cond ? color(colorStr) : color(150);
}

function bandLabel(s) {
    if (s >= 20) return 'High priority';
    if (s >= 15) return 'Strong candidate';
    if (s >= 9) return 'Consider for pilot';
    return 'Low priority';
}

function polygonShape(cx, cy, r, sides) {
    beginShape();
    for (let i = 0; i < sides; i++) {
        const a = -HALF_PI + i * TWO_PI / sides;
        vertex(cx + r * Math.cos(a), cy + r * Math.sin(a));
    }
    endShape(CLOSE);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    feasibilitySlider.size(canvasWidth - sliderLeftMargin - margin);
    benefitSlider.size(canvasWidth - sliderLeftMargin - margin);
    riskSlider.size(canvasWidth - sliderLeftMargin - margin);
    costSlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        containerWidth = container.offsetWidth;
        canvasWidth = containerWidth;
    }
}
