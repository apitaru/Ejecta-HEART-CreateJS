///////////////////////////////////
// PATCH EASELJS
///////////////////////////////////

/**
 * @method _getElementRect
 * @protected
 * @param {HTMLElement} e
 **/
'use strict';

createjs.Stage.prototype._getElementRect = function(e) {

  // Original implementation required the offest of HTML elements.
  // It was also using a.getBoundingClientRect() which isn't implemented in Ejecta
  // For Ejecta, we just need to return the entire canvas size object.
  // I'll explain in more detail soon... 
  return {
    left: 0,
    right: e.width,
    top: 0,
    bottom: e.height
  };

};


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
};


/**
 * @method _IOS_handleEvent
 * @param {Stage} stage
 * @param {Object} e The event to handle
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
		//console.log("touch.target: " , touch.target);
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