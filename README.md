## animated-bars

## Usage

put upper or lower or both divs in a place you want bars be displayed

```html
<div id="container-upper" class="animated-bars-container"></div>
```
to color bars create any class, for example, 'upper' and add it to the container's classes 

```css
.upper .innerdiv .divbar {
    background: blueviolet;
}
```
```html
<div id="container-upper" class="animated-bars-container upper"></div>
```

add listener to DOMContentLoaded event and provide the function div's id

```js
document.addEventListener("DOMContentLoaded", function () {
    drawDivs('container-upper');

    setTimeout(function () {
        resizeCallback('container-upper');
    }, 500);
});
```

if you want to redraw bars on resize window also add listener to resize event and call in callback
function drawDivs with provided div's id

```js
window.addEventListener("resize", onResize);

let resizeTimeout;

function onResize() {
    if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
            resizeTimeout = null;
            drawDivs('container-upper');

            setTimeout(function () {
                resizeCallback('container-upper');
            }, 100);
        }, 300);
    }
}
```

to flip bars both vertically and horizontally add 'true' as second argument to drawBars function

```js
drawDivs('container-upper', true);
```

## Demo

[Demo](https://codepen.io/oayee/pen/bzwaZQ)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
