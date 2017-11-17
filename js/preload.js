var preloadState = {
    preload: function() {
		var txtProgress = game.add.text(game.world.centerX, game.world.centerY, "0%", standarText);
        game.load.onFileComplete.add(function(progress) {
            txtProgress.setText(progress + "%")
        }, this);
		
		game.load.image('menu_bg', 'assets/menu_bg.png');
		game.load.image('rules_bg', 'assets/rules_bg.png');
		game.load.image('settings_bg', 'assets/settings_bg.png');
		game.load.image('questions_bg', 'assets/questions_bg.png');
		game.load.image('climbers_bg', 'assets/climbers_bg.png');
		game.load.image('map1', 'assets/map1.png');
		game.load.image('map2', 'assets/map2.png');
		game.load.image('map3', 'assets/map3.png');
		game.load.image('play_bg', 'assets/play_bg.png');
		game.load.image('question_bg', 'assets/question_bg.png');
		game.load.image('winner_bg', 'assets/winner_bg.png');
		
		for (var i=1; i<7; i++)
			game.load.image('c'+i, 'assets/c' + i + '.png');
		
		game.load.video('video', 'assets/video.mp4');
		game.load.atlasXML("misc", "assets/misc.png", "assets/misc.xml");
		game.load.audio("answered", ["assets/audio/answered.ogg", "assets/audio/answered.mp3"]);
		game.load.audio("answered_top", ["assets/audio/answered_top.ogg", "assets/audio/answered_top.mp3"]);
		game.load.audio("night_in_the_castle", ["assets/audio/night_in_the_castle.mp3"]);
		this.isNextStageStarted = false;
	},
	update: function() {
		if (game.cache.isSoundDecoded("night_in_the_castle")) {
			if (!this.isNextStageStarted) {
				this.isNextStageStarted = true;
				this.game.state.start('menu');
			}
		} 
    }
};