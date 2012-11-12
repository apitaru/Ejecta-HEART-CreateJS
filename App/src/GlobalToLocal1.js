	var canvas;
	var stage;

	var _mouseIsDown;
	var _mouseX;
	var _mouseY;

	var spin1;		// nested invisble container to generate a spirograph effect
	var spin2;		// nested invisble container to generate a spirograph effect

	var shape;		// drawing shape
	var color;		// drawing color
	var lastPt;		// last draw position
	var text;
	var graphics;
	var count = 0;

	function init() {

		// get a reference to the canvas we'll be working with:
		canvas = document.getElementById("canvas");
		stage = new createjs.Stage(canvas);
        
        createjs.Touch.enable(stage); // for Ejecta

		// attach mouse handlers directly to the source canvas
		// better than calling from canvas tag for cross browser
		stage.onMouseMove = mouseMove;
		stage.onMouseDown = mouseDown;
		stage.onMouseUp = mouseUp;

		text = new createjs.Text("Click and Drag", "36px Arial", "#777777");
		text.x = 360; text.y = 200;
		stage.addChild(text);

		// shape to draw vector data into:
		shape = new createjs.Shape();
		shape.x = 300;		//position in parent container
		graphics = shape.graphics;
       
		// middle spinner:
		spin2 = new createjs.Container();

		spin2.x = 40;		//position in parent container
        spin2.addChild(shape);
        
		// outside spinner:
		spin1 = new createjs.Container();
		spin1.addChild(spin2);

		// center it on the stage:
		spin1.x = canvas.width/2;
		spin1.y = canvas.height/2;
		stage.addChild(spin1);

		// start the tick and point it at the window so we can do some work before updating the stage:
		createjs.Ticker.setFPS(30);
		createjs.Ticker.addListener(window);
        
	}

	function tick() {

		// update rotation:
		spin1.rotation += 10;
		spin2.rotation += -7;
		shape.rotation += 3;

		if(_mouseIsDown) {
			var color = createjs.Graphics.getHSL(
				Math.cos((count++)*0.01) * 180,
				100,
				50,
				1.0);

			// set up our drawing properties:
			graphics.setStrokeStyle(Math.random()*20+2,"round").beginStroke(color);

			// start the line at the last position:
			graphics.moveTo(lastPt.x,lastPt.y);

			// calculate the new position in the shape's local coordinate space:
			lastPt = shape.globalToLocal(_mouseX,_mouseY);

			// draw the line, and close the path:
			graphics.lineTo(lastPt.x,lastPt.y);
		}

		// update the stage:
		stage.update();
	}

	//start drawing
	function mouseDown(e) {
		//if(!e){ e = window.event; }

		stage.removeChild(text);
		_mouseIsDown = true;

		// set up the first point in the new draw, and choose a random color:
		//lastPt = shape.globalToLocal(e.pageX-canvas.offsetLeft,e.pageY-canvas.offsetTop); // ejecta
        lastPt = shape.globalToLocal(e.stageX,e.stageY);
		//color = "#"+(Math.random()*0xFFFFFF|0).toString(16);


		// clear the cache, so the vector data is drawn each tick:
		shape.uncache();
	}

	//stop drawing
	function mouseUp() {
		_mouseIsDown = false;

		// cache the vector data to a saved canvas, so we don't have to render it each tick:
		shape.cache(-800,-800,1600,1600);
	}

	//update mouse positions
	function mouseMove(e) {
		//if(!e){ e = window.event; }
		_mouseX = e.stageX ;//e.pageX-canvas.offsetLeft; // ejecta
		_mouseY = e.stageY ;//e.pageY-canvas.offsetTop;
	}
