/*
This example fails because I've yet to patch addEventListener (though no errors on console).
Check out the alternative method in DragAndDrop_hitArea instead
*/
	var stage;
	var mouseTarget;	// the display object currently under the mouse, or being dragged
	var dragStarted;	// indicates whether we are currently in a drag operation
	var offset;
	var update = true;

// For Ejecta, we make the image object available to the event handler (see handleImageLoad);
	var image = new Image();

	function init() {
		// create a stage object to work with the canvas. This is the top level node in the display list:
		stage = new createjs.Stage(canvas);
		// enable touch interactions if supported on the current device:
		createjs.Touch.enable(stage);

		// enabled mouse over / out events
		stage.enableMouseOver(10);
		stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas

		// load the source image:
		image.src = "assets/daisy.png";
		image.onload = handleImageLoad;
	}

	function stop() {
		Ticker.removeListener(window);
	}

	function handleImageLoad(event) {
		//var image = event.target; // ejecta does not pass in an event
		
		var bitmap;
		var container = new createjs.Container();
		stage.addChild(container);

		// create and populate the screen with random daisies:
		for(var i = 0; i < 100; i++){
			bitmap = new createjs.Bitmap(image);
			container.addChild(bitmap);
			bitmap.x = canvas.width * Math.random()|0;
			bitmap.y = canvas.height * Math.random()|0;
			bitmap.rotation = 360 * Math.random()|0;
			bitmap.regX = bitmap.image.width/2|0;
			bitmap.regY = bitmap.image.height/2|0;
			bitmap.scaleX = bitmap.scaleY = bitmap.scale = Math.random()*0.4+0.6;
			bitmap.name = "bmp_"+i;
			bitmap.cursor = "pointer";

			bitmap.addEventListener("press", function(evt) {
				// bump the target in front of it's siblings:
				this.parent.addChild(this);
				var offset = {x:this.x-evt.stageX, y:this.y-evt.stageY};

				// add a listener to the event object's mouseMove event
				// this will be active until the user releases the mouse button:
				evt.addEventListener("mouseMove", function(ev) {
					this.x = ev.stageX+offset.x;
					this.y = ev.stageY+offset.y;
					// indicate that the stage should be updated on the next tick:
					update = true;
				}, this);
			});
			
			bitmap.addEventListener("mouseOver", function(evt) {
				this.scaleX = this.scaleY = this.scale*1.2;
				update = true;
			});
			
			bitmap.addEventListener("mouseOut", function(evt) {
				this.scaleX = this.scaleY = this.scale;
				update = true;
			});

		}
		
		createjs.Ticker.addListener(window);
	}

	function tick() {
		// this set makes it so the stage only re-renders when an event handler indicates a change has happened.
		if (update) {
			update = false; // only update once
			stage.update();
		}
	}
