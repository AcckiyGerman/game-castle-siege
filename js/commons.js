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
	this.pressed = false;

	// checkbox behavior
	var self = this;
    this.press = function(){
    	self.pressed = true;
        // check if the last letter is in UPPER case.
        if (overFrame.slice(-1) === overFrame.slice(-1).toUpperCase())
            self.frameName = overFrame + 'press';
        else
            self.frameName = overFrame + 'Press';

		game.world.bringToTop(self);
	};
	this.unpress = function(){
    	self.pressed = false;
		self.frameName = overFrame;
        game.world.bringToTop(self);
	};

	// listeners
    this.onInputDown.add(this.press, this);
    this.onInputUp.add(this.unpress, this);

};
ButtonX.prototype = Object.create(Phaser.Button.prototype);
ButtonX.prototype.constructor = ButtonX;