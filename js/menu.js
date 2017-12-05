var menuState = {
    create: function() {
		this.add.image(0, 0, "title_screen");
		
		this.btnNewGame = new ButtonX(this.game, 800, 900, "buttons", this.onNewGameClicked, this, "NewGameBTN");
		this.btnNewGame.anchor.setTo(0.5, 0);
		this.world.add(this.btnNewGame);
		
		this.btnLoadGame = new ButtonX(this.game, 1200, 900, "buttons", this.onLoadClicked, this, "LoadGameBTN");
		this.btnLoadGame.anchor.setTo(0.5, 0);
        this.world.add(this.btnLoadGame);
		
		this.music = game.add.audio("night_in_the_castle");
		this.music.play();
	},
	onNewGameClicked: function() {
		game.time.events.add(300,function()
        {
			this.music.stop();
            this.game.state.start('rules',true);
        },this);
	}, 
	onLoadClicked: function() {
		game.time.events.add(300,function()
        {
            showDialog('Select file: <input type="file" accept=".data" id="file-input" />');
			$("#button-dialog-ok").on("click.selectFile", function(){
				var reader = new FileReader();
				reader.onload = function(e) {
					var contents = e.target.result;
					try {
						var res = JSON.parse(contents);	
						var questionsString = CryptoJS.AES.decrypt(res.questions, "k234n111!?-Mnkw#").toString(CryptoJS.enc.Utf8) + "";
						var questions = JSON.parse(questionsString);
						console.log('loaded questions:', questions);
						for (var i=0; i<questions.length; i++) {
							Global.questions = [];
							for (var i=0; i<questions.length; i++) {
								Global.questions[i] = {
									q: questions[i].q,
									a: questions[i].a}
								}
						}
						menuState.music.stop();
						game.state.start('rules',true);
					} catch(err) {
						showDialog('Invalid file!');
					}
				};
				reader.readAsText($("#file-input")[0].files[0]);
				$("#button-dialog-ok").off("click.selectFile");
				
			});
        },this);
	}
	
}