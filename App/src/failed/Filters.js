// Fail: TypeError: 'undefined' is not a function (evaluating 'this.cacheCanvas.cloneNode(true)') at line 778 in src/easeljs/display/DisplayObject.js
// Easel wants to do a canvas.cloneNode but it is not implemented in ejecta.
	var canvas;
	var stage;
	var img;

	function init() {
		// get a reference to the canvas we'll be working with:
		canvas = document.getElementById("canvas");

		// create a stage object to work with the canvas. This is the top level node in the display list:
		stage = new createjs.Stage(canvas);
		
		//wait for the image to load
		img = new Image();
		img.onload = handleImageLoad;
		img.src = "assets/photo.jpg";
	}

	function handleImageLoad() {
		//find canvas and load images, wait for last image to load
		//var canvas = document.getElementById("canvas");

		// create a new stage and point it at our canvas:
		stage = new createjs.Stage(canvas);

		var bmp = new createjs.Bitmap(img);
		bmp.x = (canvas.width-2*img.width)/3;
		bmp.y = (canvas.height-2*img.height)/3;
		stage.addChild(bmp);


		var blurFilter = new createjs.BoxBlurFilter(32, 2, 2);
		var margins = blurFilter.getBounds();
		bmp = bmp.clone();
		bmp.filters = [blurFilter];
		// filters are only displayed when the display object is cached
		// later, you can call updateCache() to update changes to your filters
		bmp.cache(margins.x,margins.y,img.width+margins.width,img.height+margins.height);
		bmp.x += bmp.x+img.width;
		stage.addChild(bmp);


		var greyScaleFilter = new createjs.ColorMatrixFilter([
			0.33,0.33,0.33,0,0, // red
			0.33,0.33,0.33,0,0, // green
			0.33,0.33,0.33,0,0, // blue
			0,0,0,1,0  // alpha
		]);
		bmp = bmp.clone();
		bmp.filters = [greyScaleFilter];
		bmp.cache(0,0,img.width,img.height); // color filters don't change the bounds.
		bmp.y += bmp.y+img.height;
		stage.addChild(bmp);


		var removeRedFilter = new createjs.ColorFilter(0,1,1,1); // red, green, blue, alpha
		bmp = bmp.clone();
		bmp.filters = [removeRedFilter];
		bmp.cache(0,0,img.width,img.height); // color filters don't change the bounds.
		bmp.x = (canvas.width-2*img.width)/3;
		stage.addChild(bmp);

		// draw to the canvas:
		stage.update();
	}
