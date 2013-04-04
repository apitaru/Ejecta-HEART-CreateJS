/*
EJECTA-HEART-CREATEJS
Created Nov 2012, Amit Pitaru 

The purpose of this file is to patch various CreateJS and Ejecta objects/functions (mostly via prototype injection)
Allowing Ejecta to run EaselJS projects seamlessly. 
*/


///////////////////////////////////
// LOAD CreateJS FILES AS NEEDED
///////////////////////////////////

/*
We can load any version of easeljs. For easier debugging, we can also load the bare easeljs source files.
'require' is special ejecta object to simulate what we would typicaly do with <script> tags in html.
*/
ejecta.include("../libs/createjs/easeljs/easeljs-NEXT.min.js");

// Beyond the minidied version, we mighy need ditional easelJS files such as the Filter, Movielcips and various builders. In aditio, for debugging purposes, I sometimes load the entire bare easeljs source code instead of the minified version. I have not required the entire source files in the repo, as I'd like to prevent XCODE loading them unless needed. If you unmark the files below, make sure to copy them into the libs/createjs/easeljs folder.
/*
ejecta.include("../libs/createjs/easeljs/src/easeljs/utils/UID.js");
ejecta.include("../libs/createjs/easeljs/src/easeljs/utils/Ticker.js");
ejecta.include("../libs/createjs/easeljs/src/easeljs/utils/SpriteSheetUtils.js");
ejecta.include("../libs/createjs/easeljs/src/easeljs/utils/SpriteSheetBuilder.js");

ejecta.include("../libs/createjs/easeljs/src/easeljs/geom/Matrix2D.js");
ejecta.include("../libs/createjs/easeljs/src/easeljs/geom/Rectangle.js");
ejecta.include("../libs/createjs/easeljs/src/easeljs/geom/Point.js");

ejecta.include("../libs/createjs/easeljs/src/easeljs/display/DisplayObject.js");
ejecta.include("../libs/createjs/easeljs/src/easeljs/display/Container.js");
ejecta.include("../libs/createjs/easeljs/src/easeljs/display/Stage.js");
ejecta.include("../libs/createjs/easeljs/src/easeljs/display/Bitmap.js");
ejecta.include("../libs/createjs/easeljs/src/easeljs/display/BitmapAnimation.js");
ejecta.include("../libs/createjs/easeljs/src/easeljs/display/SpriteSheet.js");
ejecta.include("../libs/createjs/easeljs/src/easeljs/display/Shape.js");
ejecta.include("../libs/createjs/easeljs/src/easeljs/display/Graphics.js");
ejecta.include("../libs/createjs/easeljs/src/easeljs/display/Text.js");
ejecta.include("../libs/createjs/easeljs/src/easeljs/display/Shadow.js");

ejecta.include("../libs/createjs/easeljs/src/easeljs/events/MouseEvent.js");
ejecta.include("../libs/createjs/easeljs/src/easeljs/events/EventDispatcher.js");

ejecta.include("../libs/createjs/easeljs/src/easeljs/ui/Touch.js");
*/

ejecta.include("../libs/createjs/tweenjs/tweenjs-0.3.0.min.js");
ejecta.include("../libs/createjs/easeljs/display/MovieClip.js");


ejecta.include("../libs/createjs/easeljs/filters/Filter.js");
ejecta.include("../libs/createjs/easeljs/filters/ColorMatrixFilter.js");
ejecta.include("../libs/createjs/easeljs/filters/ColorMatrix.js");
ejecta.include("../libs/createjs/easeljs/filters/ColorFilter.js");
ejecta.include("../libs/createjs/easeljs/filters/BoxBlurFilter.js");
ejecta.include("../libs/createjs/easeljs/filters/AlphaMaskFilter.js");
ejecta.include("../libs/createjs/easeljs/filters/AlphaMapFilter.js");


///////////////////////////////////
// PATCH EASELJS
///////////////////////////////////


/**
 * @method _getElementRect
 * @protected
 * @param {HTMLElement} e
 **/
 
createjs.Stage.prototype._getElementRect = function(e) {
  
		/*
		// Original implementation required the offest of HTML elements.
		// It was also using a.getBoundingClientRect() which isn't implemented in Ejecta
		// For Ejecta, we just need to return the entire canvas size object.
		// I'll explain in more detail soon... 
		*/
		  
        return {
        left: 0,
        right: this.canvas.width,
        top: 0,
        bottom: this.canvas.height
        }
		
}

    
// A new routine for the display object, replacing instances where the canvas is reset using the brower-only canvas.width=0 method
createjs.DisplayObject.resetHitTestCanvas = function () {
    var ctx = createjs.DisplayObject._hitTestContext;
    var canvas = createjs.DisplayObject._hitTestCanvas;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0,0, canvas.width, canvas.height);
}



/**
 * Tests whether the display object intersects the specified local point (ie. draws a pixel with alpha > 0 at
 * the specified position). This ignores the alpha, shadow and compositeOperation of the display object, and all
 * transform properties including regX/Y.
 * @method hitTest
 * @param {Number} x The x position to check in the display object's local coordinates.
 * @param {Number} y The y position to check in the display object's local coordinates.
 * @return {Boolean} A Boolean indicting whether a visible portion of the DisplayObject intersect the specified
 * local Point.
 */
createjs.DisplayObject.prototype.hitTest = function(x, y) {
    var ctx = DisplayObject._hitTestContext;
    var canvas = DisplayObject._hitTestCanvas;
    
    ctx.setTransform(1,  0, 0, 1, -x, -y);
    this.draw(ctx);
    
    var hit = this._testHit(ctx);
    
    // START
	//Replaced the canvas reset method (canvas.width=0) with a manual reset routine (Defined above)
    //canvas.width = 0;
    //canvas.width = 1;
    createjs.DisplayObject.resetHitTestCanvas();
    ctx = createjs.DisplayObject._hitTestContext;
    canvas = createjs.DisplayObject._hitTestCanvas;
	// END
    
    return hit;
}


/**
 * @method _getObjectsUnderPoint
 * @param {Number} x
 * @param {Number} y
 * @param {Array} arr
 * @param {Number} mouseEvents A bitmask indicating which mouseEvent types to look for. Bit 1 specifies onPress &
 * onClick & onDoubleClick, bit 2 specifies it should look for onMouseOver and onMouseOut. This implementation may change.
 * @return {Array[DisplayObject]}
 * @protected
 **/
createjs.Container.prototype._getObjectsUnderPoint = function(x, y, arr, mouseEvents) {
    var ctx = createjs.DisplayObject._hitTestContext;
    var canvas = createjs.DisplayObject._hitTestCanvas;
    var mtx = this._matrix;
    var hasHandler = (mouseEvents&1 && (this.onPress || this.onClick || this.onDoubleClick)) || (mouseEvents&2 &&
                                                                                                 (this.onMouseOver || this.onMouseOut));

    // if we have a cache handy & this has a handler, we can use it to do a quick check.
    // we can't use the cache for screening children, because they might have hitArea set.
    if (this.cacheCanvas && hasHandler) {
        this.getConcatenatedMatrix(mtx);
        ctx.setTransform(mtx.a,  mtx.b, mtx.c, mtx.d, mtx.tx-x, mtx.ty-y);
        ctx.globalAlpha = mtx.alpha;
        this.draw(ctx);
        if (this._testHit(ctx)) {
            
			//START
			//Replaced the canvas reset method (canvas.width=0) with a manual reset routine (Defined above)
            //canvas.width = 0;
            //canvas.width = 1;
            createjs.DisplayObject.resetHitTestCanvas();
            ctx = createjs.DisplayObject._hitTestContext;
            canvas = createjs.DisplayObject._hitTestCanvas;
            //END
            
            return this;
        }
    }
    
    // draw children one at a time, and check if we get a hit:
    var l = this.children.length;
    for (var i=l-1; i>=0; i--) {
        var child = this.children[i];
        if (!child.isVisible() || !child.mouseEnabled) { continue; }
        
        if (child instanceof createjs.Container) { // patched <<<<<<<<<<<
            var result;
            if (hasHandler) {
                // only concerned about the first hit, because this container is going to claim it anyway:
                result = child._getObjectsUnderPoint(x, y);
                if (result) { return this; }
            } else {
                result = child._getObjectsUnderPoint(x, y, arr, mouseEvents);
                if (!arr && result) { return result; }
            }
        } else if (!mouseEvents || hasHandler || (mouseEvents&1 && (child.onPress || child.onClick || child.onDoubleClick)) || (mouseEvents&2 && (child.onMouseOver || child.onMouseOut))) {
            var hitArea = child.hitArea;
            child.getConcatenatedMatrix(mtx);
            
            if (hitArea) {
                mtx.appendTransform(hitArea.x+child.regX, hitArea.y+child.regY, hitArea.scaleX, hitArea.scaleY, hitArea.rotation, hitArea.skewX, hitArea.skewY, hitArea.regX, hitArea.regY);
                mtx.alpha *= hitArea.alpha/child.alpha;
            }
            
            ctx.globalAlpha = mtx.alpha;
            ctx.setTransform(mtx.a,  mtx.b, mtx.c, mtx.d, mtx.tx-x, mtx.ty-y);
            (hitArea||child).draw(ctx);
            if (!this._testHit(ctx)) { continue; }
			
			// START
			//Replaced the canvas reset method (canvas.width=0) with a manual reset routine (Defined above)
            //canvas.width = 0;
            //canvas.width = 1;
            createjs.DisplayObject.resetHitTestCanvas();
            ctx = createjs.DisplayObject._hitTestContext;
            canvas = createjs.DisplayObject._hitTestCanvas;
			// END
            
            if (hasHandler) { return this; }
            else if (arr) { arr.push(child); }
            else { return child; }
        }
    }
    return null;
}


/**
 * Tests whether the display object intersects the specified local point (ie. draws a pixel with alpha > 0 at
 * the specified position). This ignores the alpha, shadow and compositeOperation of the display object, and all
 * transform properties including regX/Y.
 * @method hitTest
 * @param {Number} x The x position to check in the display object's local coordinates.
 * @param {Number} y The y position to check in the display object's local coordinates.
 * @return {Boolean} A Boolean indicting whether a visible portion of the DisplayObject intersect the specified
 * local Point.
 */
createjs.DisplayObject.prototype.hitTest = function(x, y) {
    var ctx = DisplayObject._hitTestContext;
    var canvas = DisplayObject._hitTestCanvas;
    
    ctx.setTransform(1,  0, 0, 1, -x, -y);
    this.draw(ctx);
    
    var hit = this._testHit(ctx);
    
    // START
	//Replaced the canvas reset method (canvas.width=0) with a manual reset routine (Defined above)
    //canvas.width = 0;
    //canvas.width = 1;
    DisplayObject.resetHitTestCanvas();
    ctx = DisplayObject._hitTestContext;
    canvas = DisplayObject._hitTestCanvas;
	// END
    
    return hit;
}


/**
 * Initialization method.
 * @method initialize
 * param {HTMLCanvasElement} canvas A canvas object, or the string id of a canvas object in the current document.
 * @protected
 **/
createjs.Stage.prototype.initialize = function(_canvas) {
    this.Container_initialize();
	
	// Replaced line below as HTMLCanvasElement is not defined In Ejecta
	//this.canvas =(canvas instanceof HTMLCanvasElement) ? canvas : document.getElementById(canvas);
    this.canvas = _canvas;
	
    this._pointerData = {};
    this.enableDOMEvents(true);
	
	
}


/**
 * @method _IOS_handleEvent
 * @protected
 * @static
 **/
createjs.Touch._IOS_handleEvent = function(stage, e) {
    if (!stage) { return; }
    if (stage.__touch.preventDefault) { e.preventDefault&&e.preventDefault(); }
    var touches = e.changedTouches;
    var type = e.type;
    for (var i= 0,l=touches.length; i<l; i++) {
        var touch = touches[i];
        var id = touch.identifier;
        
        // Removed this, as in ejecta we're always in the canvas + these Ejecta objects are not defined to return matchin values
        //if (touch.target != stage.canvas) { continue; }
		
        if (type == "touchstart") {
            this._handleStart(stage, id, e, touch.pageX, touch.pageY);
        } else if (type == "touchmove") {
            this._handleMove(stage, id, e, touch.pageX, touch.pageY);
        } else if (type == "touchend" || type == "touchcancel") {
            this._handleEnd(stage, id, e);
        }
    }
};

/**
 * Returns true or false indicating whether the display object would be visible if drawn to a canvas.
 * This does not account for whether it would be visible within the boundaries of the stage.
 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
 * @method isVisible
 * @return {Boolean} Boolean indicating whether the display object would be visible if drawn to a canvas
 **/
createjs.Bitmap.prototype.isVisible = function() {

    return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && this.image;
    // These image vars are not implemented in ejecta yet, so i removed from above expression
	// && (this.image.complete || this.image.getContext || this.image.readyState >= 2);
	
	// UDATE: this.image.complete just added per my request .. try to bring it back into the mix and test if it works.
}


///////////////////////////////////
// PATCH EJECTA
///////////////////////////////////

// Missing implementation of Window object, which is required for EaselJS
// Todo: Figure out proper implementation and send issue to Ejecta github
window.ontouchstart = true;


