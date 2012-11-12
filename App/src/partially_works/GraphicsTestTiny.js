/*
Ejecta is missing gradeintFill and bitmapFill, so we can only draw the first three out of the bunch.
I think we'll see these implemented soon.
*/

		var canvas;
		var stage;
        var img;

        function init() {
			// get a reference to the canvas we'll be working with:
			canvas = document.getElementById("canvas");
			// create a stage object to work with the canvas. This is the top level node in the display list:
			stage = new createjs.Stage(canvas);
		
            // grab canvas width and height for later calculations:
            w = canvas.width;
            h = canvas.height;
            img = new Image();
            img.onload = layout;
            img.src = "./assets/daisy.png";
        }

        function layout() {
           // var arr = [createStar, createHex, createLineTo, createRadialGradientFill, createEllipse, createRectGradientFill, createBitmapFill];
		   var arr = [createStar, createHex, createLineTo];
            var padding = 5;
            var _width = 155;
            var _height = 155;
            var cols = 4;
            var space = 0;
            var l = arr.length;

            var border = createBorder();

            for(var i=0;i<l;i++) {
                var tile = arr[i]();
                tile.x = 42+(_width + padding) *(i%cols);
                tile.y = 42+(i/cols | 0) * (_height+padding);
                stage.addChild(tile);
            }
            stage.addChild(border);
            stage.update();
        }

        function createBorder() {
            var container = new createjs.Container();
            var s = new createjs.Shape();
            s.graphics.bs(img).ss(32).dr(20,20,920,360);
            container.addChild(s);
            return container;
        }

        function createBitmapFill() {
            var container = createTile();
            var s = new createjs.Shape();
            s.graphics.bf(img).ss(8).rs(["#FFF","#000"],[0,1],0,0,0,0,30,130).dr(0, 0, 130, 130);
            s.x = 12;
            s.y = 10;
            container.addChild(s);
            return container;
        }

        function createRectGradientFill() {
            var container = createTile();
            var s = new createjs.Shape();
            s.graphics.lf(["#FFF","#000"],[0,1],0,0,0,130).dr(0,0,130,130);
            s.x = 12;
            s.y = 10;
            container.addChild(s);
            return container;
        }

        function createEllipse() {
            var container = createTile();
            var s = new createjs.Shape();
            s.graphics.f(createjs.Graphics.getRGB(0,0x66,0x99,0.5)).ss(4).ls(["#F00","#000"],[0,1],0,0,70,140).de(0,0,70,140,8);
            s.x = 40;
            s.y = 10;
            container.addChild(s);
            return container;
        }

        function createRadialGradientFill() {
            var container = createTile();
            var s = new createjs.Shape();
            s.graphics.ss(8).s("#f0f").rf(["#FFF","#0FF"],[0,1],0,0,0,0,0,40).dc(0,0,40);
            s.x = s.y = 80;
            container.addChild(s);
            return container;
        }

        function createLineTo() {
            var container = createTile();
            var s = new createjs.Shape();
            s.graphics.ss(16, "round", "round").s("#f90").mt(20,10).lt(90,90).lt(90,140);
            container.addChild(s);
            return container;
        }

        function createHex() {
            var container = createTile();
            var s = new createjs.Shape();
            s.graphics.f("#0F0").dp(0,0,40,6).dp(0,75,40,6);
            s.x = 80
            s.y = 40;

            container.addChild(s);
            return container;
        }

        function createStar() {
            var container = createTile();
            var s = new createjs.Shape();
            s.graphics.ss(1).s(createjs.Graphics.getRGB(255, 255, 0)).f("#FF0").es().dp(0,0,80,5,0.6,-90);
            s.x = 80
            s.y = 85;

            container.addChild(s);
            return container;
        }

        function createTile() {
            var container = new createjs.Container();
            var bg = new createjs.Shape();
            bg.graphics.f('#CCCCCC').dr(0, 0, 155, 155).ef();
            bg.alpha = 0.25;
            container.addChild(bg);
            return container;
        }

