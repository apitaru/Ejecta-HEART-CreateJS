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
// Set the resolution for your canvas, based on the device you're aiming for.
// You can also mark these out for auto-resizing
canvas.width = 640;
canvas.height = 960;

// Load the patch that makes Ejecta play nice with CreateJS
ejecta.include("../libs/pitaru/ejecta-heart-createjs.js");

///////////////////////////////////////////
// LOAD YOUR CODE HERE, AND FIRE IT UP...
///////////////////////////////////////////
// Use ejecta.include commands to load your code in sequence... 
//ejecta.include("my_source_file.js");
//ejecta.include("my_other_source_file.js");
//ejecta.include("my_app_file.js");
// Optionally you can run your startup command when all's loaded:
// myApp.init();

