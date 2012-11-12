
var stage;
var isMouseDown;
var currentShape;
var oldMidX, oldMidY, oldX, oldY;
var txt;

function init() {

	// get a reference to the canvas we'll be working with:
	var canvas = document.getElementById("canvas");
	// create a stage object to work with the canvas. This is the top level node in the display list:
	stage = new createjs.Stage(canvas);   
	// enable touch interactions if supported on the current device:
	createjs.Touch.enable(stage);
		  
	txt = new createjs.Text("Click and Drag to Draw", "36px Arial", "#777777");
    txt.x = 300;
    txt.y = 200;
    stage = new createjs.Stage(canvas);
    stage.autoClear = true;
    stage.onMouseDown = handleMouseDown;
    stage.onMouseUp = handleMouseUp;
    
    createjs.Touch.enable(stage); // for ejecta
    
    stage.addChild(txt);
    stage.update();
    createjs.Ticker.addListener(window);
}

function stop() {
    createjs.Ticker.removeListener(window);
}

function tick() {
    if (isMouseDown) {
        var pt = new createjs.Point(stage.mouseX, stage.mouseY);
        var midPoint = new createjs.Point(oldX + pt.x>>1, oldY+pt.y>>1);
        currentShape.graphics.moveTo(midPoint.x, midPoint.y);
        currentShape.graphics.curveTo(oldX, oldY, oldMidX, oldMidY);
        
        oldX = pt.x;
        oldY = pt.y;
        
        oldMidX = midPoint.x;
        oldMidY = midPoint.y;
        
        stage.update();
    }
}

function handleMouseDown() {
    isMouseDown = true;
    stage.removeChild(txt);
    
    var s = new createjs.Shape();
    oldX = stage.mouseX;
    oldY = stage.mouseY;
    oldMidX = stage.mouseX;
    oldMidY = stage.mouseY;
    var g = s.graphics;
    var thickness = Math.random() * 30 + 10 | 0;
    g.setStrokeStyle(thickness + 1, 'round', 'round');
    var color = createjs.Graphics.getRGB(Math.random()*255 | 0 ,Math.random()*255 | 0, Math.random()*255 | 0);
    g.beginStroke(color);
    stage.addChild(s);
    currentShape = s;
}

function handleMouseUp() {
    isMouseDown = false;
}

