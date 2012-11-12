
	var img, star, stage, canvas;

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
		
		// masks can only be shapes.
		star = new createjs.Shape();
		// the mask's position will be relative to the parent of its target:
		star.x = img.width/2;
		star.y = img.height/2;
		// only the drawPolyStar call is needed for the mask to work:
		star.graphics.beginStroke("#FF0").setStrokeStyle(5).drawPolyStar(0,0,img.height/2-15,5,0.6).closePath();
		
		var bg = new createjs.Bitmap(img);
		// blur and desaturate the background image:
		bg.filters = [new createjs.BoxBlurFilter(2,2,2), new createjs.ColorMatrixFilter(new createjs.ColorMatrix(0,0,-100,0))];
		bg.cache(0,0,img.width,img.height);
		stage.addChild(bg);
		
		var bmp = new createjs.Bitmap(img);
		stage.addChild(bmp);
		bmp.mask = star;
		
		// note that the shape can be used in the display list as well if you'd like, or
		// we can reuse the Graphics instance in another shape if we'd like to transform it differently.
		stage.addChild(star);

		createjs.Ticker.addListener(window);
	}
	
	function tick() {
		star.rotation += 5;
		stage.update();
	}
