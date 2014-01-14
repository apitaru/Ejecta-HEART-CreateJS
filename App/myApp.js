
(function() {

 var c = createjs;

  var myApp = function() { this.initialize(); };
  var p = myApp.prototype;

  p.initialize = function() {

    console.log('demo app initialized');


    var stage = new c.Stage(canvas);

    var daisy = new c.Bitmap("daisy.png");

    daisy.scaleX = 4;
    daisy.scaleY = 4;
    daisy.x = canvas.width/2;
    daisy.y = canvas.height/2;
    daisy.touchesDown = 0;

    c.Touch.enable(stage);
    c.Ticker.setFPS(60);
    c.Ticker.addEventListener('tick',  stage);
    c.Ticker.addEventListener('tick', onTick);

    stage.addChild(daisy);

    daisy.addEventListener('mousedown', onMouseDown);
    daisy.addEventListener('pressmove', onPressMove);
    daisy.addEventListener('pressup', onPressUp);

    function onMouseDown(e) {
     console.log("onMouseDown")
     daisy.touchesDown ++;

     if(daisy.touchesDown == 1){
       daisy.primaryID = e.pointerID;
        setAnchorPoint(e);
     } else if(daisy.touchesDown == 2){
        daisy.secondaryID = e.pointerID;
        daisy.baseRotation = daisy.rotation;
        daisy.rotationOffset = angle(e.stageX, e.stageY, daisy.x, daisy.y);
        daisy.baseDist =distance(e.stageX, e.stageY, daisy.x, daisy.y);
        daisy.baseScale = daisy.scaleX;

     }

 
    }

    function onPressMove(e) {
      console.log("onMouseMove, fingers on daisy:", daisy.touchesDown, e.primary);
      if(daisy.touchesDown == 1){
        if(daisy.resetAnchorPoint){
          setAnchorPoint(e);
          daisy.resetAnchorPoint = false;
        }
        daisy.x = e.stageX;
        daisy.y = e.stageY;
      } else if(daisy.touchesDown == 2){

        if(e.pointerID == daisy.primaryID){
          daisy.x = e.stageX;
          daisy.y = e.stageY;
        } else {
          daisy.rotation = daisy.baseRotation + angle(e.stageX, e.stageY, daisy.x, daisy.y) - daisy.rotationOffset;
          daisy.scaleX = daisy.scaleY = daisy.baseScale*distance(e.stageX, e.stageY, daisy.x, daisy.y)/ daisy.baseDist;
        }
      }

    }

    function onPressUp(e) {
     console.log("onMouseUp")
      daisy.touchesDown --;

      if(daisy.touchesDown == 1 && e.pointerID == daisy.primaryID){
        daisy.resetAnchorPoint = true;
        daisy.primaryID = daisy.secondaryID;

      }


    }

    function setAnchorPoint(e){
      daisy.regX = daisy.globalToLocal(e.stageX, e.stageY).x;
      daisy.regY =  daisy.globalToLocal(e.stageX, e.stageY).y;
      daisy.x = e.stageX;
      daisy.y = e.stageY;

    }

    function onTick() {
      //console.log("onTick");
    }
 
    function angle (x1,y1,x2,y2) {
      var rads =  (Math.atan2(y1-y2,x1-x2) - (Math.PI/2));
      var degrees = rads*(180/Math.PI);
      if (degrees < -180) { degrees += 360; }
      return degrees;
    };

    function distance (x1,y1,x2,y2) {
      return Math.sqrt(Math.pow((x2 - x1), 2)+Math.pow((y2 - y1), 2));
    };


  };

 window.myApp = myApp;

})();

