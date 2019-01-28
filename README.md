## animated-bars

## Usage

put upper or lower or both divs in a place you want bars be displayed

```html
<div id="container-upper" class="animated-bars-container upper"></div>
```

add listener to DOMContentLoaded event and provide the function div's id and bars color

```js
document.addEventListener("DOMContentLoaded", function () {
    drawDivs('container-upper', 'blueviolet');

    setTimeout(function () {
        resizeCallback('container-upper', 'blueviolet');
    }, 500);
});
```

if you want to redraw bars on resize window also add listener to resize event and call in callback
function drawDivs with provided div's id and bars color

```js
window.addEventListener("resize", onResize);

let resizeTimeout;

function onResize() {
    if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
            resizeTimeout = null;
            drawDivs('container-upper', 'blueviolet');

            setTimeout(function () {
                resizeCallback('container-upper', 'blueviolet');
            }, 100);
        }, 300);
    }
}
```

## Demo

[Demo](https://codepen.io/oayee/pen/qgNWEx)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
