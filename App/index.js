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
ejecta.include("../libs/pitaru/ejecta-heart-createjs.js");

/////////////////////////////////////
// LOAD OUR APP SCRIPT
/////////////////////////////////////
// Below is a list of examples taken from the easeljs package.
// Simply unmark the one you'd like to run. Be sure to only run one at a time.

// WORKS ////
// These are Examples that work with minimal or no changes to the source code:
//ejecta.include("src/BarGraph.js");
//ejecta.include("src/Cache_vday.js");
//ejecta.include("src/Cache.js");
//ejecta.include("src/CacheUpdate.js");
//ejecta.include("src/CurveTo.js");
//ejecta.include("src/DragAndDrop_hitArea.js");
//ejecta.include("src/GlobalToLocal1.js");
//ejecta.include("src/GraphicsReuse.js");
//ejecta.include("src/Graphics_simple.js");
ejecta.include("src/HelloWorld.js");
//ejecta.include("src/Icons.js");
//ejecta.include("src/LocalToGlobal.js");
//ejecta.include("src/Masks.js");
//ejecta.include("src/SpriteSheet_simple.js");
//ejecta.include("src/SparklesFade.js");
//ejecta.include("src/Text_multiline.js");
//ejecta.include("src/Transform_simple.js");
//ejecta.include("src/SpriteSheetBuilder.js");

// Unmark these two together
//ejecta.include("src/SpriteSheetBuilderMC/gunnertron_g.js");
//ejecta.include("src/SpriteSheetBuilderMC/SpriteSheetBuilder_MovieClip.js");

// Unmark these two together
//ejecta.include("assets/Segment.js"); // this would typically be loaded via html <script>
//ejecta.include("src/Segments.js");



// PARTIALLY WORKS ////////
// These examples will run with limitted functionlality 
//ejecta.include("src/partially_works/GraphicsTestTiny.js");
//ejecta.include("src/partially_works/BitmapAnimation.js");

// FAILED ///////
// These examples are not yet compatible with Ejecta
//ejecta.include("src/failed/Filters.js");
//ejecta.include("src/failed/SpriteSheet.js");
//ejecta.include("src/failed/ExtractFrame.js");
//ejecta.include("src/failed/DragAndDrop_EventDispatcher.js");

///////////////////////////////////
// START IT UP
///////////////////////////////////
init();


