var preloadState = {
    preload: function() {
		var txtProgress = game.add.text(game.world.centerX, game.world.centerY, "0%", standarText);
        game.load.onFileComplete.add(function(progress) {
            txtProgress.setText(progress + "%")
        }, this);

        game.load.image('title_screen', 'assets/titlescreen/TitleScreen.png');
		game.load.image('menu_bg', 'assets/menu_bg.png');
		game.load.image('rules_bg', 'assets/knights_bg.png');
		game.load.image('settings_bg', 'assets/menu_bg.png');
		game.load.image('questions_bg', 'assets/questions_bg.png');
		game.load.image('knights_bg', 'assets/knights_bg.png');
		game.load.image('map0', 'assets/map0.png');
		game.load.image('map1', 'assets/map1.png');
		game.load.image('map2', 'assets/map2.png');
		game.load.image('question_bg', 'assets/question_bg.png');
        game.load.image('question_red', 'assets/question_red.png');
        game.load.image('Victory', 'assets/Victory.png');

		// gameplay assets
		game.load.image('Archer', 'assets/gameplay/Archer.png');
		game.load.image('ArcherFire', 'assets/gameplay/ArcherFire.png');
		game.load.image('Arrow', 'assets/gameplay/Arrow.png');
		game.load.image('Ladder', 'assets/gameplay/Ladder.png');
		game.load.image('LadderOnFire', 'assets/gameplay/LadderOnFire.png');
		game.load.image('PlayersBoard', 'assets/gameplay/PlayersBoard.png');

		// load assets with different colors
		for (var i in Global.knightColors){
			var color = Global.knightColors[i];
			var knightFrontImgName = 'KnightFront'+color;
			var knightClimbingName = 'KnightClimbing'+color;
			var flagName = 'Flag'+color;
			game.load.image(knightFrontImgName, 'assets/knights/'+knightFrontImgName+'.png');
			game.load.image(knightClimbingName, 'assets/knights/'+knightClimbingName+'.png');
			game.load.image(flagName, 'assets/flags/'+color+'.png');
		}
		
		game.load.video('video', 'assets/video.mp4');
		game.load.atlasXML("misc", "assets/misc.png", "assets/misc.xml"); // buttons from the old game
        game.load.atlasJSONHash('buttons', 'assets/buttons.png', 'assets/buttons.json');
		game.load.audio("correctAnswerBell", ["assets/audio/correctAnswerBell.mp3"]);
		game.load.audio("drums", ["assets/audio/drums.mp3"]);
		game.load.audio("night_in_the_castle", ["assets/audio/night_in_the_castle.mp3"]);
		game.load.audio("arrowSwoosh", "assets/audio/arrowSwoosh.mp3");
		this.isNextStageStarted = false;
	},
	update: function() {
		if (game.cache.isSoundDecoded("night_in_the_castle")) {
			if (!this.isNextStageStarted) {
				this.isNextStageStarted = true;
				// game should start with 'menu' scene
				// you can change it for debug
				this.game.state.start('menu');
			}
		} 
    }
};