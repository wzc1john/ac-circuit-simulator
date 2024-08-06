const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const frequencyInput = document.getElementById('frequency');
const component1Select = document.getElementById('component1');
const component2Select = document.getElementById('component2');
const calculateBtn = document.getElementById('calculateBtn');
const result = document.getElementById('result');
const frequencyValue = document.getElementById('frequencyValue');

const u = 10; // 电压
const R = 10; // 电阻值
const L = 0.05; // 电感值
const C = 0.0001; // 电容值

function drawComponent(x, y, type) {
    ctx.beginPath();
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';

    if (type === '电感') {
        // 绘制电感
        ctx.moveTo(x, y);
        ctx.lineTo(x + 30, y);
        ctx.moveTo(x + 30, y - 10);
        ctx.arc(x + 30, y, 10, -Math.PI / 2, Math.PI / 2, true);
        ctx.moveTo(x + 50, y);
        ctx.lineTo(x + 80, y);
        ctx.fillText('L', x + 35, y - 15);
    } else if (type === '电容') {
        // 绘制电容
        ctx.moveTo(x, y);
        ctx.lineTo(x + 30, y);
        ctx.moveTo(x + 30, y - 10);
        ctx.lineTo(x + 30, y + 10);
        ctx.moveTo(x + 50, y - 10);
        ctx.lineTo(x + 50, y + 10);
        ctx.moveTo(x + 50, y);
        ctx.lineTo(x + 80, y);
        ctx.fillText('C', x + 35, y - 15);
    } else if (type === '电阻') {
        // 绘制电阻
        ctx.moveTo(x, y);
        ctx.lineTo(x + 20, y);
        ctx.lineTo(x + 30, y - 10);
        ctx.lineTo(x + 50, y + 10);
        ctx.lineTo(x + 70, y - 10);
        ctx.lineTo(x + 80, y);
        ctx.lineTo(x + 100, y);
        ctx.fillText('R', x + 35, y - 15);
    }

    ctx.stroke();
}

function drawCircuit() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const component1 = component1Select.value;
    const component2 = component2Select.value;

    // 绘制电源
    ctx.beginPath();
    ctx.arc(100, 300, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillText('电源', 85, 290);
    ctx.moveTo(120, 300);
    ctx.lineTo(200, 300);
    ctx.stroke();

    // 绘制第一个元器件
    drawComponent(200, 300, component1);

    // 绘制第二个元器件
    drawComponent(350, 300, component2);

    // 绘制连接线
    ctx.moveTo(430, 300);
    ctx.lineTo(600, 300);
    ctx.lineTo(600, 320);
    ctx.lineTo(100, 320);
    ctx.lineTo(100, 320);
    ctx.lineTo(100, 320);
    ctx.lineTo(100, 300);
    ctx.stroke();
}

function calculateImpedance(frequency, component1, component2) {
    const omega = 2 * Math.PI * frequency;
    let impedance1, impedance2;

    if (component1 === '电感') {
        impedance1 = { re: 0, im: omega * L };
    } else if (component1 === '电容') {
        impedance1 = { re: 0, im: -1 / (omega * C) };
    } else {
        impedance1 = { re: R, im: 0 };
    }

    if (component2 === '电感') {
        impedance2 = { re: 0, im: omega * L };
    } else if (component2 === '电容') {
        impedance2 = { re: 0, im: -1 / (omega * C) };
    } else {
        impedance2 = { re: R, im: 0 };
    }

    const totalImpedance = {
        re: impedance1.re + impedance2.re,
        im: impedance1.im + impedance2.im,
    };

    const magnitude = Math.sqrt(totalImpedance.re ** 2 + totalImpedance.im ** 2);
    const current = u / magnitude;

    return current;
}

function simulate() {
    const frequency = parseInt(frequencyInput.value);
    const component1 = component1Select.value;
    const component2 = component2Select.value;

    drawCircuit();

    const current = calculateImpedance(frequency, component1, component2);
    result.textContent = `电流: ${current.toFixed(2)} A`;
}

frequencyInput.addEventListener('input', () => {
    frequencyValue.textContent = frequencyInput.value;
});

calculateBtn.addEventListener('click', simulate);

// 初始绘制
drawCircuit();
