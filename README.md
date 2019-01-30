## animated-bars

## Usage

put upper or lower or both container divs in a place you want bars be displayed

```html
<div id="container-upper" class="your-class"></div>
```
set container's height, width and bar color via css

```css
.your-class {
    width: 100%;
    height: 150px;
}

.your-class .innerdiv .divbar {
    background: blueviolet;
}
```

add listener to DOMContentLoaded event and provide the function div's id and bars width in px

```js
document.addEventListener("DOMContentLoaded", function () {
    drawDivs('container-upper', 4);

    setTimeout(function () {
        resizeCallback('container-upper');
    }, 500);
});
```

if you want to redraw bars on resize window also add listener to resize event and call in callback
function drawDivs with provided div's id and bars width in px

```js
window.addEventListener("resize", onResize);

let resizeTimeout;

function onResize() {
    if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
            resizeTimeout = null;
            drawDivs('container-upper', 4);

            setTimeout(function () {
                resizeCallback('container-upper');
            }, 100);
        }, 500);
    }
}
```

to flip bars vertically or horizontally accordingly set 3rd or 4th parameter as true

```js
drawDivs('container-upper', 4, true, true);
```

## Demo

[Demo](https://codepen.io/oayee/pen/bzwaZQ)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
