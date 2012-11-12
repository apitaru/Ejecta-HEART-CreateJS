
	var canvas, stage, mc, w;
	var scale = 0.5;

	function init() {
		//find canvas and load images, wait for last image to load
		canvas = document.getElementById("canvas");
		stage = new createjs.Stage(canvas);
		
		mc = new lib.gunnertron();
		w = mc.nominalBounds.width*scale;
		mc.setTransform(100+w/2,100,scale,scale);
		stage.addChild(mc);
		
		var label1 = stage.addChild(new createjs.Text("MovieClip (vector)", "14px Arial", "#FFF"));
		label1.textAlign = "center";
		label1.setTransform(mc.x,30);
		
		var label2 = stage.addChild(label1.clone());
		label2.text = "BitmapAnimation";
		label2.x += w+50;
		
		// create the sprite sheet builder:
		var builder = new createjs.SpriteSheetBuilder();
		builder.scale = scale;
		builder.maxWidth = 1024;
		builder.addMovieClip(mc);
		builder.buildAsync(buildComplete);
		
		// append the generated spritesheet image for demo purposes:
		//document.body.appendChild(builder._data.images[0]);
		
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addListener(stage);
	}
	
	function buildComplete(builder) {
		var spriteSheet = builder.spriteSheet;
		var bmpAnim = new createjs.BitmapAnimation(spriteSheet);
		bmpAnim.setTransform(mc.x+w+50|0, mc.y);
		stage.addChild(bmpAnim);
		
		mc.gotoAndPlay(0);
		bmpAnim.gotoAndPlay(0);
	}
