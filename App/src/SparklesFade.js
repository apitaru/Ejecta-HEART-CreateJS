
	var stage, canvas;
	var oldX=0;

	var imgSeq = new Image();		// The image for the sparkle animation
	var bmpAnim;					// The animated sparkle template to clone

	function init() {
	
		// get a reference to the canvas we'll be working with:
		canvas = document.getElementById("canvas");

		// create a stage object to work with the canvas. This is the top level node in the display list:
		stage = new createjs.Stage(canvas);
		
        createjs.Touch.enable(stage); // --> Ejecta <-- 
		
        // load the sprite sheet image, and wait for it to complete before proceeding:
		imgSeq.onload = handleImageLoad;
		imgSeq.src = "assets/sparkle_21x23.png";

	}

	function handleImageLoad() {
		// attach mouse handlers directly to the source canvas.
		// better than calling from canvas tag for cross browser compatibility:
		stage.onMouseMove = moveCanvas;
		stage.onMouseDown = clickCanvas;

		// create a semi-opaque black rectangle that covers the full stage.
		// drawing this to stage each tick will cause the canvas to fade to black.
		var shape = new createjs.Shape(new createjs.Graphics().beginFill('#333').drawRect(0,0,canvas.width+1,canvas.height));
		shape.alpha = 0.35;
		stage.addChild(shape);

		// this prevents the stage from automatically clearing itself each tick.
		// in this demo, it results in the star trails, as the previous draws remain on screen.
		stage.autoClear = false;

		// define simple sprite sheet data specifying the image(s) to use, the size of the frames,
		// and the registration point of the frame
		// it will auto-calculate the number of frames from the image dimensions and loop them
		var data = {
			images: ["assets/sparkle_21x23.png"],
			frames: {width:21,height:23,regX:10,regY:11}
		}

		// set up an animation instance, which we will clone
		bmpAnim = new createjs.BitmapAnimation(new createjs.SpriteSheet(data));

		// start the tick and point it at the window so we can do some work before updating the stage:
		createjs.Ticker.addListener(window);
	}

	function tick() {
		var h = canvas.height;
		var w = canvas.width;

		// loop through all of the active sparkles on stage:
		var l = stage.getNumChildren();
		for (var i=l-1; i>0; i--) {
			var sparkle = stage.getChildAt(i);

			// apply gravity and friction
			sparkle.vY += 2;
			sparkle.vX *= 0.98;

			// update position, scale, and alpha:
			sparkle.x += sparkle.vX;
			sparkle.y += sparkle.vY;
			sparkle.alpha += sparkle.vA;


			// remove sparkles that are no longer visible or are stalled:
			if (sparkle.alpha <= 0 || sparkle.y>=h && sparkle.vY < 10) {
				stage.removeChildAt(i);
			}
			
			//bounce sparkles off the bottom
			if (sparkle.y > h) {
				sparkle.vY *= -(Math.random()*0.4+0.4);
				sparkle.y -= sparkle.y%h;
			}
			if (sparkle.x >= w || sparkle.x <= 0) { sparkle.vX *= -1; }
		}

		// draw the updates to stage
		stage.update();
	}

	// sparkle explosion
	function clickCanvas(evt) {
		addSparkles(Math.random()*100+100|0, evt.stageX, evt.stageY, 2, 0);
	}

	//sparkle trail
	function moveCanvas(evt) {
		addSparkles(Math.random()*2+1|0, evt.stageX, evt.stageY, 1, evt.stageX-oldX);
		oldX = evt.stageX;
	}

	function addSparkles(count, x, y, speed, velX) {
		//create the specified number of sparkles
		for (var i=0; i<count; i++) {
			// clone the original sparkle, so we don't need to set shared properties:
			var sparkle = bmpAnim.clone();

			// set display properties:
			sparkle.x = x;
			sparkle.y = y;
			sparkle.alpha = Math.random()*0.5+0.5;
			sparkle.scaleX = sparkle.scaleY = Math.random()+0.3;
			sparkle.compositeOperation = "lighter";

			// set up velocities:
			var a = Math.PI*2*Math.random();
			var v = (Math.random()-0.5)*30*speed;
			sparkle.vX = Math.cos(a)*v+velX;
			sparkle.vY = Math.sin(a)*v;
			sparkle.vA = -Math.random()*0.05-0.01; // alpha

			// start the animation on a random frame:
			sparkle.gotoAndPlay(Math.random()*sparkle.spriteSheet.getNumFrames()|0);

			// add to the display list:
			stage.addChild(sparkle);
		}
	}
