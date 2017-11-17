var Global = {
	minQuestions: 10,
	questions: [],
	players: [],
	selectedMap: 0,
	showQuestions: false
};

//var standarText = { font: "32px furoreregular", fill: "#ffffff", fontVariant: "small-caps"};
//var standarTextBlack = { font: "32px furoreregular", fill: "#000000", fontVariant: "small-caps"};

var standarText = { font: "32px Raleway", fill: "#ffffff"};
var standarTextBlack = { font: "32px Raleway", fill: "#000000"};

var ButtonX = function(game, x, y, key, callback, callbackContext, overFrame) {
    Phaser.Button.call(this, game, x, y, key, callback, callbackContext);
    this.anchor.setTo(.5, .5);
	this.frameName = overFrame;
    this.onInputDown.add(function() {
		this.scale.setTo(1.1,1.1);
		game.world.bringToTop(this);
	}, this);
    this.onInputUp.add(function() {
		this.scale.setTo(1, 1);
		game.world.bringToTop(this);
    }, this)
};
ButtonX.prototype = Object.create(Phaser.Button.prototype);
ButtonX.prototype.constructor = ButtonX;