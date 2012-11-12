// TAP ON SCREEN TO TURN CACHING ON/OFF

	var canvas;
	var stage;
	var shape;
	var circleRadius=30;
	var rings = 30;

    var isCached = true; // ejecta

	function init() {

		// create a new stage and point it at our canvas:
		canvas = document.getElementById("canvas");
		stage = new createjs.Stage(canvas);

		// create a large number of slightly complex vector shapes, and give them random positions and velocities:

		var colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];

		for (var i=0; i<200; i++) {
			shape = new createjs.Shape();
			for (var j=rings; j>0; j--) {
				shape.graphics.beginFill(colors[Math.random()*colors.length |0]).drawCircle(0,0,circleRadius*j/rings);
			}
			shape.x = Math.random()*canvas.width;
			shape.y = Math.random()*canvas.height;
			shape.velX = Math.random()*10-5;
			shape.velY = Math.random()*10-5;

			// turn snapToPixel on for all shapes - it's set to false by default on Shape.
			// it won't do anything until stage.snapToPixelEnabled is set to true.
			shape.snapToPixel = true;

			stage.addChild(shape);
			
		}

		// add a text object to output the current FPS:
		fpsLabel = new createjs.Text("-- fps","bold 18px Arial","#FFF");
		stage.addChild(fpsLabel);
		fpsLabel.x = 10;
		fpsLabel.y = 20;

		// start the tick and point it at the window so we can do some work before updating the stage:
		createjs.Ticker.addListener(window);
		createjs.Ticker.setFPS(50);
        
        // Ejecta
        createjs.Touch.enable(stage);
        stage.onMouseDown = function(){
            toggleCache(isCached = !isCached);
            console.log("onMouseDown isCached:", isCached);
        }
		
		toggleCache(isCached);
        
	}

	function tick() {

		var w = canvas.width;
		var h = canvas.height;
		var l = stage.getNumChildren()-1;

		// iterate through all the children and move them according to their velocity:
		for (var i=1; i<l; i++) {
			var shape = stage.getChildAt(i);
			shape.x = (shape.x+shape.velX+w)%w;
			shape.y = (shape.y+shape.velY+h)%h;
		}

		fpsLabel.text = Math.round(createjs.Ticker.getMeasuredFPS())+" fps";

		// draw the updates to stage:
		stage.update();
	}

	function toggleCache(value) {
		// iterate all the children except the fpsLabel, and set up the cache:
		var l = stage.getNumChildren()-1;

		for (var i=0; i<l; i++) {
			var shape = stage.getChildAt(i);
			if (value) {
				shape.cache(-circleRadius, -circleRadius, circleRadius*2, circleRadius*2);
			} else {
				shape.uncache();
			}
		}
	}

