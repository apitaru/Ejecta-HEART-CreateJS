/*
This example fails because SpriteSheetUtils tries to call toDataURL(), which isn't implemented by ejecta.
*/
	var stage;
	var canvas;
	var imgSeq;		// bmp of the sprite sheet

	function init() {
		// get a reference to the canvas we'll be working with:
		canvas = document.getElementById("canvas");

		// create a stage object to work with the canvas. This is the top level node in the display list:
		stage = new createjs.Stage(canvas);
		
		//wait for the image to load
		imgSeq = new Image();
		imgSeq.onload = handleImageLoad;
		imgSeq.src = "assets/testSeq.png";
	}

	function handleImageLoad() {
		// create sprite sheet data from the loaded image, and define the animation sequences in it.
		// for example, {walkUpRight:[0,19]} defines an animation sequence called "walkUpRight" that
		// will play back frames 0 to 19 inclusive.
		var data = {
			images: [imgSeq],
			frames: {width:64,height:68},
			animations: {walkUpRight:[0,19], walkDownRight:[20,40], walkRight:[41,59]}
		};

		// create a spritesheet from the data:
		var spriteSheet = new createjs.SpriteSheet(data);

		// extract the first frame of the walkRight sequence as a new image:
		// could alternately use the frame number.
		img = createjs.SpriteSheetUtils.extractFrame(spriteSheet, "walkRight");
		
	}
