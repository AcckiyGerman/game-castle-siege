var playState = {
	randomQueue: [],
	players: [],
    create: function() {
		this.add.image(0, 0, "map" + Global.selectedMap);
		
		this.btnSubmit = new ButtonX(this.game, 247, 940, "buttons", this.onSubmitClicked, this, "SubmitBTN");
		this.btnSubmit.anchor.setTo(.5, 0);
		this.game.world.add(this.btnSubmit);

		this.maxScore = [7, 12, 15];

		this.isGameOver = false;
		this.currentQuestion = 1;

		this.createRandomQuestionsQueue();
		this.createPlayers();
		
		this.questionBar = game.add.group();
		//this.questionBar.bg = game.add.sprite(13, 10, "question_bg", 0, this.questionBar);
		this.questionBar.txt = game.add.text(200, 75, Global.questions[this.randomQueue[0]].q, standarTextBlack, this.questionBar);
		this.questionBar.txt.anchor.setTo(.5, 0);
		this.questionBar.y = -200;
		this.showQuestion();
	},
	createRandomQuestionsQueue: function() {
		this.randomQueue = [];
		for (var i=0; i < Global.questions.length; i++) {
			var found = false;
			do {
				var rnd = Math.floor(Math.random() * Global.questions.length);	
				found = false;
				for (var j=0; j < this.randomQueue.length; j++)
					if (this.randomQueue[j] == rnd) found = true;
			} while (found == true);
			this.randomQueue[i] = rnd;
		}
	},
	createPlayers: function() {
		var avaXstart = 10;
		var avaYstart = 180;
		var avaYspace = 75;  // space between avatars

		var heroXstart = 800;
		var heroXspace = 80;  // space between heroes
		var heroYstart = 1000;

		this.players = [];
		Global.players.forEach(function(player, i){
			var p = game.add.group();
			p.id = i;
			p.currentPosition = 1;
			p.score = 0;
			Global.players[i].score = 0;

			// Creating list of players and answer buttons on the left part of the screen
			p.txtTitle = game.add.text(50, 20, p.currentPosition + ". " + Global.players[i].name, standarTextBlack, p);
			p.avatar = game.add.sprite(0, 0, 'KnightFront'+player.avatar, 0, p);
			p.avatar.scale.setTo(0.5, 0.5);

			p.btnCorrect = new ButtonX(this.game, 342, 30, "misc", this.onCorrectClicked, p, "btn_correct");
			p.add(p.btnCorrect);
			p.btnWrong = new ButtonX(this.game, 420, 30, "misc", this.onWrongClicked, p, "btn_wrong");
			p.add(p.btnWrong);
			p.imgCorrect = new ButtonX(this.game, p.btnCorrect.x, p.btnCorrect.y, "misc", this.onCorrectClicked, p, "img_correct");
			p.add(p.imgCorrect);
			p.imgWrong = new ButtonX(this.game, p.btnWrong.x, p.btnWrong.y, "misc", this.onWrongClicked, p, "img_wrong");
			p.add(p.imgWrong);
			p.imgCorrect.visible = false;
			p.imgWrong.visible = false;

			p.x = avaXstart;
			p.y = avaYstart + i*avaYspace;

			// Creating list of heroes on the game scene
            p.hero = game.add.sprite(0, 0, "KnightClimbing"+player.avatar, 0);
            p.hero.anchor.setTo(.5, .5);
            p.hero.scale.setTo(0.7, 0.7);
            p.hero.x = heroXstart + i*heroXspace;
            p.hero.y = heroYstart;

            // save player
			this.players[i] = p;
		}, this)
	},

	onCorrectClicked: function() {
		if (this.imgCorrect.visible == true) {
			this.btnCorrect.visible = true;
			this.btnWrong.visible = true;
			this.imgCorrect.visible = false;
		} else {
			this.imgCorrect.visible = true;
			this.btnCorrect.visible = false;
			this.btnWrong.visible = false;
		}
	}, 
	onWrongClicked: function() {
		if (this.imgWrong.visible == true) {
			this.btnCorrect.visible = true;
			this.btnWrong.visible = true;
			this.imgWrong.visible = false;
		} else {
			this.imgWrong.visible = true;
			this.btnCorrect.visible = false;
			this.btnWrong.visible = false;
		}
	}, 
	onSubmitClicked: function() {
		var doWeHaveAWinner = false;
		this.btnSubmit.visible = false;
		for (var i=0; i<this.players.length; i++) {
			if (this.players[i].imgCorrect.visible === true) {
                Global.players[this.players[i].id].score++;
                this.players[i].score++
            }

			if (this.players[i].score === this.maxScore[Global.selectedMap])
				doWeHaveAWinner = true;

			this.players[i].imgCorrect.visible = false;
			this.players[i].imgWrong.visible = false;
			this.players[i].btnCorrect.visible = false;
			this.players[i].btnWrong.visible = false;
			this.players[i].txtTitle.setText(Global.players[i].name);
		}
		
		if (doWeHaveAWinner)
			game.add.audio("answered_top").play();
		else
			game.add.audio("answered").play();

		this.animateRepositions();
		this.hideQuestion();
		
	},
	hideQuestion: function() {
		game.add.tween(this.questionBar).to({
				y: -80 - this.questionBar.bg.height
			}, 1000, Phaser.Easing.Quintic.Out, true, 0);
	},
	showQuestion: function() {
		game.add.tween(this.questionBar).to({
				y: 0
		}, 1000, Phaser.Easing.Quintic.Out, true, 0);
		if (Global.showQuestions) {
			this.questionBar.txt.setText(Global.questions[this.randomQueue[this.currentQuestion]].q);
		} else {
			this.questionBar.txt.setText("Question " + (this.currentQuestion));
		}
		this.questionBar.txt.wordWrap = true;
		this.questionBar.txt.wordWrapWidth = 1000;  //playState.questionBar.bg.width - 50;
		this.questionBar.txt.align = 'center';
		
		//this.questionBar.bg.height = this.questionBar.txt.height + 80;
		
		this.currentQuestion++;
		
		if (this.currentQuestion == Global.questions.length && Global.showQuestions)
			this.currentQuestion = 0;
	},
	enableLeftButtons: function() {
		for (var i=0; i<this.players.length; i++) {
			this.players[i].imgCorrect.visible = false;
			this.players[i].imgWrong.visible = false;
			this.players[i].btnCorrect.visible = true;
			this.players[i].btnWrong.visible = true;
		}
		this.btnSubmit.visible = true;
		this.showQuestion();
	},
	animateRepositions: function() {
		var isEndGame = false;
		this.players.forEach(function(player, i) {
			game.add.tween(player.hero).to({
				x: 0,
				y: 0
			}, 1000, Phaser.Easing.Quintic.Out, true, 0);
			if (player.score === this.maxScore[Global.selectedMap])
				isEndGame = true;
		});

        if (isEndGame) {
            game.time.events.add(5000, function() {
                this.game.state.start('winner', true);
            }, this);
        } else {
            game.time.events.add(1000, function() {
                this.enableLeftButtons();
            }, this);
        }
	}
};