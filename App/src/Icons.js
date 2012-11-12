	var canvas;
	var stage;

	var iconSheet = new Image();

	function init() {
		// get a reference to the canvas we'll be working with:
		canvas = document.getElementById("canvas");

		// create a stage object to work with the canvas. This is the top level node in the display list:
		stage = new createjs.Stage(canvas);
		
		//find canvas and load images, wait for last image to load
		iconSheet.onload = handleImageLoad;
		iconSheet.src = "assets/icons.png";
	}

	function handleImageLoad() {


		/*** FIRST: the "simple" approach ***/
		// create a simple SpriteSheet using iconSheet with a frame size of 80x80:
		var data = {images:[iconSheet], frames:{width:80, height:80}};
		var spriteSheet  = new createjs.SpriteSheet(data);

		// create a BitmapAnimation to display frames from the sprite sheet:
		var icon1 = new createjs.BitmapAnimation(spriteSheet);
		icon1.y = 100;
		icon1.x = 0;

		// because we didn't specify frameData, we have to reference frames by number:
		icon1.gotoAndStop(2);
		stage.addChild(icon1);

		// we'll clone icon1 to save a little work:
		var icon2 = icon1.clone();
		icon2.x += 120;
		icon2.gotoAndStop(5);
		stage.addChild(icon2);

		/*** Next: the more robust approach ***/
		// define sprite sheet data describing the available icons:
		// we can use the form {frameName:frameNumber} in animations because each "sequence" is only a single frame:
		var data = {
			images:[iconSheet],
			frames:{width:80, height:80},
			animations: {trash:0, male:1, wait:2, library:3, female:4, hanger:5, stairs:6, noparking:7}
		}

		// create a SpriteSheet using the data:
	    spriteSheet = new createjs.SpriteSheet(data);

	    // we'll clone icon2, to preserve the x/y, and swap out the SpriteSheet:
	    var icon3 = icon2.clone();
	    icon3.spriteSheet = spriteSheet;
	    icon3.x += 120;

	    // we can reference frames by name now:
	    icon3.gotoAndStop("male");
	    stage.addChild(icon3);

	    var icon4 = icon3.clone();
	    icon4.gotoAndStop("female");
	    icon4.x += 120;
	    stage.addChild(icon4);

	    var icon5 = icon4.clone();
	    icon5.gotoAndStop("trash");
	    icon5.x += 120;
	    stage.addChild(icon5);

	    // finally, we'll add one that just plays through:
	    var icon6 = icon1.clone();
	    icon6.x = icon1.x;
		icon6.y = 0;
	    icon6.gotoAndPlay(0);
	    stage.addChild(icon6);

		createjs.Ticker.setFPS(3); // slow, so we can see the icons
		createjs.Ticker.addListener(stage);
	}
