'use strict';

let resizeTimeout;

function drawDiv(elToAppend, sign, barX, barWidth = 5) {
    const elHeight = elToAppend.clientHeight;
    const height = ~sign ?
        elHeight - Math.random() * elHeight * 0.45 :
        elHeight * 0.05 + Math.random() * elHeight * 0.35;
    const rect = document.createElement('div');
    rect.style = `left: ${barX}px; width: ${barWidth}px; height: ${height}px;`;
    rect.setAttribute('class', 'divbar noheight');
    elToAppend.appendChild(rect);
}

function drawDivs(id, barWidth = 5, flipVert = false, flipHor = false) {
    const container = document.getElementById(id);
    if (!container) return;
    if (container.firstChild) container.removeChild(container.firstChild);
    const div = document.createElement('div');
    div.setAttribute('id', 'div');
    div.setAttribute('class', 'innerdiv');
    div.setAttribute('style', `transform: scale(1, ${flipVert ? -1 : 1});`);
    container.appendChild(div);
    const width = container.clientWidth;
    const numOfRects = Math.floor(width / (barWidth * 2));
    let sign = 1;
    let firstBarWidth;

    if (flipHor) {
        // draw first truncated bar
        firstBarWidth = width % (barWidth);
        if (width % (2 * barWidth) >= barWidth) {
            drawDiv(div, sign, width - firstBarWidth, firstBarWidth);
            sign *= -1;
        }
    }

    for (let i = 0; i < numOfRects; i++) {
        const barX = flipHor ?
            width - firstBarWidth - (width % (2 * barWidth) >= barWidth ? barWidth * 2 : barWidth) - i * barWidth * 2 :
            i * barWidth * 2;
        drawDiv(div, sign, barX, barWidth);
        sign *= -1;
    }

    if (!flipHor) {
        // draw last truncated bar
        const lastBarWidth = width % (barWidth * 2) > barWidth ? barWidth : width % (barWidth * 2);
        drawDiv(div, sign, numOfRects * barWidth * 2, lastBarWidth);
    }
}

function onResize() {
    if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
            resizeTimeout = null;
            drawDivs('container-upper', 4);
            drawDivs('container-lower', 4, true, true);
            setTimeout(function () {
                resizeCallback('container-upper');
                resizeCallback('container-lower');
            }, 100);
        }, 500);
    }
}

function resizeCallback(id) {
    const container = document.getElementById(id);
    let div = container.getElementsByTagName('div');
    div = div ? div[0] : [];
    const children = Array.from(div.children);
    children.forEach(child => child.setAttribute('class', 'divbar'));
}

document.addEventListener('DOMContentLoaded', function () {
    drawDivs('container-upper', 4);
    drawDivs('container-lower', 4, true, true);

    setTimeout(function () {
        resizeCallback('container-upper');
        resizeCallback('container-lower');
    }, 500);
});
window.addEventListener('resize', onResize);
