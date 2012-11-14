/*
A minimal template to get your CreateJS project running with Ejecta.
Things to know:
1) Rename this file to index.js, as this is the first file Ejecta looks for (think of it at index.html)
2) Change the code below to load your own App files
3) Create a folder named App, place this index.js file in it, as well as all of your source code and assets.
4) Load up the Ejecta XCode project, and Drag the App folder into XCode's file navigator. If There's already an App folder in there, delete it first
5) Also drag and drop the 'libs' folder from the ejecta-heart-createjs code source, similarly to step 4
6) Hit the Run button (play icon), Ejecta will look in this file first and load up the rest of the source files you've specified below

*/

// Ejecta initializes when we create a canvas element and grab its content for the first time.
// So it's recommended to do it here first. You can grab the canvas again directly in your app, or use this blogal object.
var canvas = document.getElementById("canvas");
// Unmark these to set a specific canvs size, otherwise canvas will resize automatically to fit device screen resolution
//canvas.width = 640;
//canvas.height = 960;
var ctx = canvas.getContext('2d');

ejecta.require("../libs/pitaru/ejecta-heart-createjs.js");

///////////////////////////////////////////
// LOAD YOUR CODE HERE, AND FIRE IT UP...
///////////////////////////////////////////
// Use ejecta.require commands to load your code in order ... 
//ejecta.require("my_source_file.js");
//ejecta.require("my_other_source_file.js");
//ejecta.require("my_app_file.js");
// Optionally you can run your startup command when all's loaded:
// myApp.init();

