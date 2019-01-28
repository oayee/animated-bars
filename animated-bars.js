'use strict';

let resizeTimeout;

function drawDiv(elToAppend, color = 'blue', sign, barX, barWidth = 5) {
    const height = 50 + sign * Math.random() * 40;
    const rect = document.createElement('div');
    rect.style = `left: ${barX}px; width: ${barWidth}px; height: ${height}px; background: ${color}`;
    rect.setAttribute('class', 'divbar noheight');
    elToAppend.appendChild(rect);
    sign *= -1;
}

function drawDivs(id, color) {
    const container = document.getElementById(id);
    if (!container) return;
    if (container.firstChild) container.removeChild(container.firstChild);
    const div = document.createElement('div');
    div.setAttribute('id', 'div');
    div.setAttribute('class', 'innerdiv');
    container.appendChild(div);
    const width = container.clientWidth;
    const numOfRects = Math.floor(width / 10);
    let sign = 1;
    for (let i = 0; i < numOfRects; i++) {
        drawDiv(div, color, sign, i * 10);
    }

    // draw last truncated bar
    const lastBarWidth = width % 10 > 5 ? 5 : width % 10;
    drawDiv(div, color, sign, numOfRects * 10, lastBarWidth);
}

function onResize() {
    if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
            resizeTimeout = null;
            drawDivs('container-upper', 'blueviolet');
            drawDivs('container-lower', 'aqua');
            setTimeout(function () {
                resizeCallback('container-upper', 'blueviolet');
                resizeCallback('container-lower', 'aqua');
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
    drawDivs('container-upper', 'blueviolet');
    drawDivs('container-lower', 'aqua');

    setTimeout(function () {
        resizeCallback('container-upper', 'blueviolet');
        resizeCallback('container-lower', 'aqua');
    }, 500);
});
window.addEventListener("resize", onResize);
