# ScratchCard
This is a library for turning canvas elements on your web site into "scratchable" objects.

## Prerequisites
* all canvas elements need to have an ID to select them
* a browser with a working `.bind()` function
* no jQuery just plain JavaScript

## Setup
1. Add the library to your site's head. Use the minified version for production and the unminified version for development.
```HTML
<head>
  <!-- all stuff you are using -->
  <script type="text/javascript" src="scripts/scratchcard.min.js"></script>
</head>
```
2. Initialize 