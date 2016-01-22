# ScratchCard
Basic scratch card implementation for modern browsers.<br/>
Watch a demo over <a href="http://sebastianwachter.github.io/ScratchCard/">here</a>
## How to use it
#### IMPORTANT NOTICE: You need jQuery to get it to work!
<ol>
<li>Clone this repo</li>
<li>Embed a canvas on your page with a preferred size. For example: <br/>
```html
<canvas id="myCanvas" width="500" height="500"></canvas>
```
If you want the script to work automatically you have to set the id to "myCanvas" else you have to change it in the JavaScript file.</li>
<li>Now link the JavaScript file in a script tag on your site like this:<br/>
```html
<script type="text/javascript" src="scripts/script.js"></script>
```
</li>
<li>Now add a background image to the canvas via CSS:<br/>
```css
background-image: url('../background.jpg');
```
</li>
<li>Now it works - PROFIT!</li>
