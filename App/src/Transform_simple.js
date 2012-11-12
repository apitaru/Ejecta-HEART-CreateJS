		var stage, canvas;
        var img;
        var angle;

        function init() {

			// get a reference to the canvas we'll be working with:
			canvas = document.getElementById("canvas");

			// create a stage object to work with the canvas. This is the top level node in the display list:
			stage = new createjs.Stage(canvas);
		
            angle = 0;
            img = new Image();
            img.onload = handleImageLoad;
            img.src = "assets/rotateDemoBot.png";
        }

        function stop() {
			createjs.Ticker.removeListener(window);
        }

        function handleImageLoad() {

            stage.autoClear = true;
            bmp = new createjs.Bitmap(img);
            bmp.regX = img.width >> 1;
            bmp.regY = img.height >> 1;
            bmp.x = canvas.width - (img.width/2)>>1;
            bmp.y = 140+canvas.height - (img.height/2)>>1;
            bmp.scaleX = bmp.scaleY = 0.1;
            stage.addChild(bmp);
            stage.update();

			createjs.Ticker.addListener(window);
        }

        function tick() {
            angle += 0.025;
            var value = (Math.sin(angle) * 360);

            bmp.setTransform (bmp.x , bmp.y , bmp.scaleX , bmp.scaleY , value/2 , bmp.skewX , bmp.skewY , bmp.regX , bmp.regY );
            bmp.scaleX = bmp.scaleY = ((value)/360) + 0.25;
            stage.update();
        }
