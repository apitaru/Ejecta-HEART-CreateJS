/*
Partially works.
Todo:
- DrawRoundRect is broken. need to examine easeljs code and figure out where ejecta differs in its implementation
*/

	var stage, canvas;

	function init() {

		// get a reference to the canvas we'll be working with:
		canvas = document.getElementById("canvas");

		// create a stage object to work with the canvas. This is the top level node in the display list:
		stage = new createjs.Stage(canvas);
			
	    width = canvas.width;
	    height = canvas.height;
	    stage = new createjs.Stage(canvas);

	    var s = drawSmiley();
		s.x = (width-350)/2;
		s.y = (height - 350)/2;
	    stage.addChild(s);
	    stage.update();

	}

	function drawSmiley() {
	    var s = new createjs.Shape();
	    var g = s.graphics;

	    //Head
	    g.setStrokeStyle(15, 'round', 'round');
	    g.beginStroke("#000");
	    g.beginFill("#F00");
	    g.drawCircle(170, 170, 170); //55,53
	    g.endFill();
	    g.setStrokeStyle(1, 'round', 'round');

	    //Right eye
	    g.setStrokeStyle(5, 'round', 'round');
	    g.beginStroke("#000");
	    g.beginFill("#000");
	    g.drawRoundRect(125, 64, 20, 50, 10);
	    g.endFill();

	    //Left eye
	    g.setStrokeStyle(5, 'round', 'round');
	    g.beginStroke("#000");
	    g.beginFill("#000");
	    g.drawRoundRect(200, 64, 20, 50, 10);
	    g.endFill();

	    //Mouth
	    g.setStrokeStyle(15, 'round', 'round');
	    g.beginStroke("#000");
	    g.moveTo(45, 155);
	    g.bezierCurveTo(83, 307, 254, 317, 296, 152);
	    return s;
	}

	