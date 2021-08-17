const menuScore = document.querySelector('.score');
const menulevel = document.querySelector('.level');
const menuStart = document.querySelector('.start');
const gameOver = document.querySelector('.game-over')

const colorElements = {
    blue: document.querySelector('.blue'),
    red: document.querySelector('.red'),
    green: document.querySelector('.green'),
    yellow: document.querySelector('.yellow')
}
const colorList = ['blue', 'red', 'green', 'yellow'];
const order = [];
const clickOrder = [];
let score = 0;
let level = 0;
let playing = false;

gameOver.style.visibility = 'hidden';

function click({ target }) {
    const cor = target.classList.value;

    if (playing) {
        applyEffect(target, cor);
        clickOrder.push(cor);
        checkOrder();
        score++;
        menuScore.innerText = score;
    }
}

function start() {
    menuStart.style.visibility = 'hidden';
    gameOver.style.visibility = 'hidden';
    clickOrder.length = 0;
    order.length = 0;
    score = 0;
    level = 0;
    menuScore.innerText = 0;
    menulevel.innerText = 0;
    playing = true;
    newOrderColor();
    applyEffect(colorElements[`${order[0]}`], order[0]);
}

function nextLevel() {
    newOrderColor();
    clickOrder.length = 0;
    let time = 700;
    level++;
    menulevel.innerText = level;

    order.forEach(cor => {
        setTimeout(() => {
            time += 700;
            applyEffect(colorElements[`${cor}`], cor)
        }, time);
        time += 700
    })
}

function checkOrder() {
    for (const key in clickOrder) {
        if (clickOrder[key] != order[key]) {
            lose();
            break;
        }
        if (clickOrder.length == order.length) { nextLevel() };
    }
}

function applyEffect(element, color) {
    element.style.boxShadow = `0 0 70px ${color}`;
    setTimeout(() => element.style.boxShadow = '', 300);
}

function newOrderColor() {
    order.push(colorList[Math.floor(Math.random() * 4)]);
}

function lose() {
    playing = false;
    menuStart.style.visibility = 'visible';
    gameOver.style.visibility = 'visible';
}

menuStart.onclick = start;
document.querySelector('.genius').addEventListener('click', click);