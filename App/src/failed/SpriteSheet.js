/*
We don't have support for preloadjs (yet). 
also missing bitmapFill in ejecta canvas implementaiton - coming soon though
*/
	var stage, canvas;
	var assets;
	var w, h;
	var sky, grant, ground, hill, hill2;
	var runningRate, isInWarp, isStationary;
	var stationaryPosition, isPassed;

		function init() {
		// get a reference to the canvas we'll be working with:
		canvas = document.getElementById("canvas");

		// create a stage object to work with the canvas. This is the top level node in the display list:
		stage = new createjs.Stage(canvas);
			
			runningRate = 2.5;
			isInWarp = false;
			isStationary = false;
			stationaryPosition = 300;
			isPassed = false;

		spriteSheet = {"animations": {"run": [0, 25], "jump": [26, 63]}, "images": ["assets/runningGrant.png"], "frames": {"regX": 0, "height": 292.5, "count": 64, "regY": 0, "width": 165.75}};

		var ss = new createjs.SpriteSheet(spriteSheet);
		grant = new createjs.BitmapAnimation(ss);

		// Set up looping
		ss.getAnimation("run").next = "run";
		ss.getAnimation("jump").next = "run";
		grant.gotoAndPlay("run");

		// Position the Grant sprite
		grant.x = -200;
		grant.y = 90;
		grant.scaleX = grant.scaleY = 0.8;

		// grab canvas width and height for later calculations:
		w = canvas.width;
		h = canvas.height;

			assets = [];

		manifest = [
			{src:"assets/runningGrant.png", id:"grant"},
			{src:"assets/sky.png", id:"sky"},
			{src:"assets/ground.png", id:"ground"},
			{src:"assets/parallaxHill1.png", id:"hill"},
			{src:"assets/parallaxHill2.png", id:"hill2"}
		];

		loader = new createjs.PreloadJS();
		loader.useXHR = false;  // XHR loading is not reliable when running locally.
		loader.onFileLoad = handleFileLoad;
		loader.onComplete = handleComplete;
		loader.loadManifest(manifest);
		stage.autoClear = false;
	}

		function handleFileLoad(event) {
			assets.push(event);
		}

		function handleComplete() {
			for(var i=0;i<assets.length;i++) {
				var item = assets[i]; //loader.getResult(id);
				var id = item.id;
				var result = item.result;

				if (item.type == PreloadJS.IMAGE) {
					var bmp = new Bitmap(result);
				}

				switch (id) {
					case "sky":
						sky = new Shape(new Graphics().beginBitmapFill(result).drawRect(0,0,w,h));
						break;
					case "ground":
						ground = new Shape();
						var g = ground.graphics;
						g.beginBitmapFill(result);
						g.drawRect(0, 0, w+330, 79);
						ground.y = h-79;
						break;
					case "hill":
						hill = new Shape(new Graphics().beginBitmapFill(result).drawRect(0,0,282,59));
						hill.x = Math.random() * w;
						hill.scaleX = hill.scaleY = 3;
						hill.y = 144;
						break;
					case "hill2":
						hill2 = new Shape(new Graphics().beginBitmapFill(result).drawRect(0,0,212,50));
						hill2.x = Math.random() * w;
						hill2.scaleX = hill2.scaleY = 3;
						hill2.y = 171;
						break;
				}
			}

			//document.getElementById("loader").className = "";

			if (grant == null) {
				//console.log("Can not play. Grant sprite was not loaded.");
				return;
			}

			stage.addChild(sky, ground, hill, hill2, grant);
			stage.onMouseDown = handleJumpStart;

			Ticker.setFPS(40);
			Ticker.addListener(window);
		}

		function handleJumpStart() {
			grant.gotoAndPlay("jump");
		}

		function tick() {
			var outside = w + 20;
			var position = grant.x+runningRate;
			grant.x = (position >= outside) ? -200 : position;

			ground.x = (ground.x-15) % 330;
			hill.x = (hill.x - 0.8);
			if (hill.x + 838 <= 0) { hill.x = outside; }
			hill2.x = (hill2.x - 1.2);
			if (hill2.x + 633 <= 0) { hill2.x = outside; }

			stage.update();
		}