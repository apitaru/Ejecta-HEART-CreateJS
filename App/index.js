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
//canvas.width = 640;
//canvas.height = 960;
// Set up additional Ejecta (iOS) specific options. Check out http://impactjs.com/ejecta/overview for details
var canvas = document.getElementById('canvas');
canvas.MSAAEnabled = false; // OpenGL Screen-wide Anti Aliasing? (will slow down your project)
canvas.retinaResolutionEnabled = false; // use Retina resolution? (will slow down older iPads)

// Load up createjs. Here I'm loading a combined yet non-minified version of the entire lib.
ejecta.include("../libs/createjs/createjs-2013.12.12.combined.js");
// Load the patch that makes Ejecta play nice with CreateJS
ejecta.include("../libs/pitaru/ejecta-heart-createjs.js");

///////////////////////////////////////////
// LOAD YOUR CODE HERE, AND FIRE IT UP...
///////////////////////////////////////////
<<<<<<< HEAD
canvas.width = 640;
canvas.height = 960;


/////////////////////////////////////
//LOAD IN EASELJS AND OTHER LIBRARIES
/////////////////////////////////////
// Load EaselJS and required patches to to both EaselJS and Ejecta, so they can play nice.
ejecta.include("../libs/pitaru/ejecta-heart-createjs-7.js");

/////////////////////////////////////
// LOAD OUR APP SCRIPT
/////////////////////////////////////
// Below is a list of examples taken from the easeljs package.
// Simply unmark the one you'd like to run. Be sure to only run one at a time.

// WORKS ////
// These are Examples that work with minimal or no changes to the source code:

ejecta.include("src/Cache.js");
//ejecta.include("src/CacheUpdate.js");
//ejecta.include("src/CurveTo.js");
//ejecta.include("src/DragAndDrop_hitArea.js");
//ejecta.include("src/GlobalToLocal1.js");
//ejecta.include("src/GraphicsReuse.js");
//ejecta.include("src/Graphics_simple.js");
//ejecta.include("src/HelloWorld.js");
//ejecta.include("src/Icons.js");
//ejecta.include("src/LocalToGlobal.js");
//ejecta.include("src/Masks.js");
//ejecta.include("src/SpriteSheet_simple.js");
//ejecta.include("src/SparklesFade.js");
//ejecta.include("src/Text_multiline.js");
//ejecta.include("src/Transform_simple.js");
//ejecta.include("src/SpriteSheetBuilder.js");



// Unmark these two together
//ejecta.include("assets/Segment.js"); // this would typically be loaded via html <script>
//ejecta.include("src/Segments.js");



// PARTIALLY WORKS ////////

// These examples will run with limitted functionlality
// Todo: I need to check if new Ejecta started to support some of the missing functionality.
//ejecta.include("src/partially_works/BarGraph.js");
//ejecta.include("src/partially_works/GraphicsTestTiny.js");
//ejecta.include("src/partially_works/BitmapAnimation.js");

// FAILED ///////

// Used to work with create 5.0, but not with 6.0
//ejecta.include("src/Cache_vday.js");
// Unmark these two together
//ejecta.include("src/SpriteSheetBuilderMC/gunnertron_g.js");
//ejecta.include("src/SpriteSheetBuilderMC/SpriteSheetBuilder_MovieClip.js");

// These examples are not yet compatible with Ejecta
//ejecta.include("src/failed/Filters.js");
//ejecta.include("src/failed/SpriteSheet.js");
//ejecta.include("src/failed/ExtractFrame.js");
//ejecta.include("src/failed/DragAndDrop_EventDispatcher.js");

///////////////////////////////////
// START IT UP
///////////////////////////////////
init();
=======
// Use ejecta.include commands to load your code in sequence... 
ejecta.include("myApp.js");
>>>>>>> d7f4e062ee7fe0020a634b7f10d61fd05bdd24a1


// Optionally you can run your startup command when all's loaded:
var app = new myApp();
