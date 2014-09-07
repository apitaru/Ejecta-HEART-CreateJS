
var presstube = presstube || {},
    pt = presstube,
    c = createjs;

function init() {
    
    var stage = new c.Stage(canvas),
        globo = new pt.Globo();
    
    c.Ticker.setFPS(30);
    //c.Ticker.addListener(stage);
	c.Ticker.addEventListener('tick',  stage);

    globo.x = canvas.width / 2;
    globo.y =canvas.height / 2;
    stage.addChild(globo);
    
    // enable touch interactions if supported on the current device:
    c.Touch.enable(stage);

}

pt.Globo = function() { this.initialize(); };
p = pt.Globo.prototype = new c.Container();
p.Container_initialize = p.initialize;
p.initialize = function() {
    
    this.Container_initialize();
    
    var globo = this,
    sections = [
        new c.BitmapAnimation( pt.Globo.sectionSpriteSheets[0] ),
        new c.BitmapAnimation( pt.Globo.sectionSpriteSheets[1] ),
        new c.BitmapAnimation( pt.Globo.sectionSpriteSheets[2] ),
        new c.BitmapAnimation( pt.Globo.sectionSpriteSheets[3] )
    ],
    yPositions = [0, 50, 116, 186];
    
    _.each(sections, function(section, index) {
        section.y = yPositions[index];
        section.play();
		section.addEventListener('mousedown', function(e) {
									
									if (section.paused) {
									section.play();
									} else {
									section.stop();
									}
								 });
    });
    
    _.each( _.toArray(sections).reverse(), function(section) {
        globo.addChild(section);
    });
    
};

pt.Globo.sectionSpriteSheets = [
    new c.SpriteSheet({"images": ["img/globo-1.png"], "frames": {"regY": 152, "height": 156, "regX": 57, "width": 106, "count": 8}, "animations": {"all": [0, 7]}}),
    new c.SpriteSheet({"images": ["img/globo-2.png"], "frames": {"regY": 103, "height": 184, "regX": 136, "width": 271, "count": 16}, "animations": {"all": [0, 15]}}),
    new c.SpriteSheet({"images": ["img/globo-3.png"], "frames": {"regY": 95, "height": 117, "regX": 90, "width": 177, "count": 32}, "animations": {"all": [0, 31]}}),
    new c.SpriteSheet({"animations": {"all": [0, 16]}, "images": ["img/globo-4.png"], "frames": {"regY": 112, "height": 215, "regX": 106, "width": 210, "count": 17}})
];
  

