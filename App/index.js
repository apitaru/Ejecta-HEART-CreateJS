/*
This is the initial file that ejecta looks at when running the up. Think of it as our replacement of index.html
May sure this file is place in the App folder, and drag the entire App folder into XCode. See the readme file for the full instructions.
*/

///////////////////////////////////////////
// START UP EJECTA'S CANVAS SIZE (OPTIONAL)
// Comment out for Auto-Resizing
///////////////////////////////////////////
canvas.width = 640;
canvas.height = 960;


/////////////////////////////////////
//LOAD IN EASELJS AND OTHER LIBRARIES
/////////////////////////////////////
// Load EaselJS and required patches to to both EaselJS and Ejecta, so they can play nice.
ejecta.require("../libs/pitaru/ejecta-heart-createjs.js");

/////////////////////////////////////
// LOAD OUR APP SCRIPT
/////////////////////////////////////
// Below is a list of examples taken from the easeljs package.
// Simply unmark the one you'd like to run. Be sure to only run one at a time.

// WORKS ////
// These are Examples that work with minimal or no changes to the source code:
//ejecta.require("src/Cache_vday.js");
//ejecta.require("src/Cache.js");
//ejecta.require("src/CacheUpdate.js");
//ejecta.require("src/CurveTo.js");
//ejecta.require("src/DragAndDrop_hitArea.js");
//ejecta.require("src/GlobalToLocal1.js");
//ejecta.require("src/GraphicsReuse.js");
//ejecta.require("src/Graphics_simple.js");
ejecta.require("src/HelloWorld.js");
//ejecta.require("src/Icons.js");
//ejecta.require("src/LocalToGlobal.js");
//ejecta.require("src/Masks.js");
//ejecta.require("src/SpriteSheet_simple.js");
//ejecta.require("src/SparklesFade.js");
//ejecta.require("src/Text_multiline.js");
//ejecta.require("src/Transform_simple.js");
//ejecta.require("src/SpriteSheetBuilder.js");

// Unmark these two together
//ejecta.require("src/SpriteSheetBuilderMC/gunnertron_g.js");
//ejecta.require("src/SpriteSheetBuilderMC/SpriteSheetBuilder_MovieClip.js");

// Unmark these two together
//ejecta.require("assets/Segment.js"); // this would typically be loaded via html <script>
//ejecta.require("src/Segments.js");



// PARTIALLY WORKS ////////
// These examples will run with limitted functionlality 
//ejecta.require("src/partially_works/BarGraph.js");
//ejecta.require("src/partially_works/GraphicsTestTiny.js");
//ejecta.require("src/partially_works/BitmapAnimation.js");

// FAILED ///////
// These examples are not yet compatible with Ejecta
//ejecta.require("src/failed/Filters.js");
//ejecta.require("src/failed/SpriteSheet.js");
//ejecta.require("src/failed/ExtractFrame.js");
//ejecta.require("src/failed/DragAndDrop_EventDispatcher.js");

///////////////////////////////////
// START IT UP
///////////////////////////////////
init();


