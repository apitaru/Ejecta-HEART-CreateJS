
	var stage;
	var mouseTarget;	// the display object currently under the mouse, or being dragged
	var dragStarted;	// indicates whether we are currently in a drag operation
	var offset;
	var update = true;

    // ejeta doesn't let us pass the image object into its handler, so for this quick demo, we make it global 
    var image = new Image();

	function init() {
	
		// get a reference to the canvas we'll be working with:
		var canvas = document.getElementById("canvas");
		//check to see if we are running in a browser with touch support
		stage = new createjs.Stage(canvas);

		// enable touch interactions if supported on the current device:
		createjs.Touch.enable(stage);

		// enabled mouse over / out events
		stage.enableMouseOver(10);

		// load the source image:

		image.src = "assets/daisy.png";
		image.onload = handleImageLoad;
	}

	function stop() {
		createjs.Ticker.removeListener(window);
	}

	function handleImageLoad(event) { // notice that 'event' is not really passed through!
		//var image = event.target; // 'event' doesn't get passed here
        
		var bitmap;
		var container = new createjs.Container();
		stage.addChild(container);
		
		// create a shape that represents the center of the daisy image:
		var hitArea = new createjs.Shape();
		hitArea.graphics.beginFill("#FFF").drawEllipse(-11,-14,24,18);

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
			
			// assign the hitArea to each bitmap to use it for hit tests:
			bitmap.hitArea = hitArea;

			// wrapper function to provide scope for the event handlers:
			(function(target) {
				bitmap.onPress = function(evt) {
					// bump the target in front of it's siblings:
					container.addChild(target);
					var offset = {x:target.x-evt.stageX, y:target.y-evt.stageY};

					// add a handler to the event object's onMouseMove callback
					// this will be active until the user releases the mouse button:
					evt.onMouseMove = function(ev) {
						target.x = ev.stageX+offset.x;
						target.y = ev.stageY+offset.y;
						// indicate that the stage should be updated on the next tick:
						update = true;
					}
				}
				bitmap.onMouseOver = function() {
					target.scaleX = target.scaleY = target.scale*1.2;
					update = true;
				}
				bitmap.onMouseOut = function() {
					target.scaleX = target.scaleY = target.scale;
					update = true;
				}
			})(bitmap);
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
	