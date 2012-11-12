	var canvas;
	var stage;

	var bar1;		// visual of the blue bar
	var bar2;		// visual of the green bar
	var bar3;		// visual of the red bar

	var arm1;		// container of the blue arm to allow for children
	var arm2;		// container of the green arm to allow for children
    var image = new Image();


	function init() {
        image.src = "examples/assets/daisy.png";

		// get a reference to the canvas we'll be working with:
		canvas = document.getElementById("canvas");

		// create a new stage and point it at our canvas:
		stage = new createjs.Stage(canvas);

		// set up arms:

        bitmap = new createjs.Bitmap(image);
        
		// this is the shape that represents the end (red) arm:
		bar3 = new createjs.Shape();
		var g = bar3.graphics;
		g.beginFill("#8B2222");
		g.drawRect(-3,-3,6,130);
		bar3.regY = 20;
		bar3.y = 105;

		// unlike the other 2, bar3 does not require a matching arm element,
		// because there are no other children.

		// visible middle (green) bar
		bar2 = new createjs.Shape();
		g = bar2.graphics;
		g.beginFill("#228B22");
		g.drawRect(-5,-5,10,110);

		// arm container that holds the green bar, and the nested red bar:
		arm2 = new createjs.Container();

		arm2.regY = 20;
		arm2.y = 72;		//position in parent object
		arm2.addChild(bar2);
		arm2.addChild(bar3);
        arm2.addChild(bitmap);
        
		// visible anchor (blue) bar:
		bar1 = new createjs.Shape();
		g = bar1.graphics;
		g.beginFill("#22228B");
		g.drawRect(-8,-8,16,80);

		// arm container that holds the blue bar, and the nested green bar:
		arm1 = new createjs.Container();
		arm1.addChild(bar1);
		arm1.addChild(arm2);
		stage.addChild(arm1);
		// center arm1 on screen
		arm1.x = canvas.width/2;
		arm1.y = canvas.height/2;

		// start the tick and point it at the window so we can do some work before updating the stage:
		createjs.Ticker.setInterval(20);		// in ms, so 50 fps
		createjs.Ticker.addListener(window);
	}



	function tick() {


		bar3.rotation += 4.4;
		arm2.rotation += -2.7;
		// update rotation for all arms:
		arm1.rotation += 1.9;
       // console.log(arm1.getNumChildren());
		// calculate the global (stage) position of the end of the red bar,
		// and move the HTML "whee" button to that position:
		var pt = bar3.localToGlobal(0, 130);


		stage.update();
	}