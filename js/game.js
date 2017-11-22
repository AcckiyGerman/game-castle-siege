var windowLoaded = false;
var fontsLoaded = false;

WebFont.load({
	custom: {
	  families: ['electronic']
	},
	active: function() {
		fontsLoaded = true;
		if (windowLoaded && fontsLoaded) startGame();
	}
});

window.onload = function() {
	windowLoaded = true;
	if (windowLoaded && fontsLoaded) startGame();
};

function startGame() {
   
    setTimeout(function() {
        window.scrollTo(0, 1)
    }, 10);
	game = new Phaser.Game(1920, 1080, Phaser.CANVAS, "game");
	game.state.add("preload", preloadState);
	game.state.add("menu", menuState);	
	game.state.add("rules", rulesState);
	game.state.add("settings", settingsState);
	game.state.add("questions", questionsState);
	game.state.add("climbers", climbersState);
	game.state.add("play", playState);
	// game.state.add("winner", winnerState);
	game.state.add("boot", bootState, true);
	
	Global.questions = [];
	
	$("#questions-scrollbar-holder").mCustomScrollbar({
		theme:"rounded-dots"
	});
}