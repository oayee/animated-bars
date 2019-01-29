'use strict';

let resizeTimeout;

function drawDiv(elToAppend, sign, barX, barWidth = 5) {
    const height = ~sign ? 100 - Math.random() * 45 : 5 + Math.random() * 35;
    const rect = document.createElement('div');
    rect.style = `left: ${barX}px; width: ${barWidth}px; height: ${height}px;`;
    rect.setAttribute('class', 'divbar noheight');
    elToAppend.appendChild(rect);
}

function drawDivs(id, fliped = false) {
    const container = document.getElementById(id);
    if (!container) return;
    if (container.firstChild) container.removeChild(container.firstChild);
    const div = document.createElement('div');
    const classStr = 'innerdiv' + (fliped ? ' innerdiv-fliped' : '');
    div.setAttribute('id', 'div');
    div.setAttribute('class', classStr);
    container.appendChild(div);
    const width = container.clientWidth;
    const numOfRects = Math.floor(width / 10);
    let sign = 1;
    for (let i = 0; i < numOfRects; i++) {
        drawDiv(div, sign, i * 10);
        sign *= -1;
    }

    // draw last truncated bar
    const lastBarWidth = width % 10 > 5 ? 5 : width % 10;
    drawDiv(div, sign, numOfRects * 10, lastBarWidth);
}

function onResize() {
    if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
            resizeTimeout = null;
            drawDivs('container-upper');
            drawDivs('container-lower', true);
            setTimeout(function () {
                resizeCallback('container-upper');
                resizeCallback('container-lower');
            }, 100);
        }, 300);
    }
}

function resizeCallback(id) {
    const container = document.getElementById(id);
    const div = container.getElementsByTagName('div')[0];
    const children = Array.from(div.children);
    children.forEach(child => child.setAttribute('class', 'divbar'));
}

document.addEventListener("DOMContentLoaded", function () {
    drawDivs('container-upper');
    drawDivs('container-lower', true);

    setTimeout(function () {
        resizeCallback('container-upper');
        resizeCallback('container-lower');
    }, 500);
});
window.addEventListener("resize", onResize);
