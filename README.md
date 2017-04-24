# ScratchCard

This is a library for turning canvas elements on your web site into "scratchable" objects. You can also set a required percentage of space to be revealed for the task to be completed.

## Prerequisites

* canvas elements with background images that need to be hidden
* all canvas elements need to have an ID to select them
* a browser with a working `.bind()` function
* no jQuery just plain JavaScript

## Setup

#### 1. Add the library to your site's head. Use the minified version for production and the unminified version for development.

```HTML
<head>
  <!-- all stuff you are using -->
  <script type="text/javascript" src="scripts/scratchcard.min.js"></script>
</head>
```

#### 2. Initialize the scratch card by using a options object.

```JavaScript
var options = {
  id: 'yourCanvasID',
  brushSize: 50,
  lineJoin: 'round',
  percentRequired: 80,
  fillColor: 'rgb(100, 100, 13)'
};
```

* `id` is your canvas ID as a string.

* `brushSize` determines how much area the brush should remove as a integer.

* `lineJoin` determines how the lines of the revealed area are going to be joined together. Must be one of `bevel`, `round` or `miter` as a string.

* `percentRequired` determines how much space should be revealed for the success event to be fired. Should be an integer.

* `fillColor` sets the color of the fill that hides the image. This can be all of the CSS color values but has to be put in as a string.

#### 3. Create the new scratch card object and pass the constructor the options object.

```JavaScript
var yourScratchCard = new ScratchCard(options);
```

#### 4. If you want you can add an event listener to the success event.

```JavaScript
yourScratchCard.addEventListener('success', function (e) {
  alert('You can do whatever you want here!');
}, false);
```

#### 5. Profit!

## Contributing
If you find any bugs please open up an issue. If you added any features propose a pull request and I will look into it.

# License
MIT
