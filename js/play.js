var playState = {
	randomQueue: [],
	players: [],
    create: function() {
		this.add.image(0, 0, "play_bg");
		this.add.image(475, 135, "map" + (Global.selectedMap+1));
		
		
		this.btnSubmit = new ButtonX(this.game, 247, 940, "misc", this.onSubmitClicked, this, "btn_submit");
		this.btnSubmit.anchor.setTo(.5, 0);
		this.game.world.add(this.btnSubmit);
		
		this.maxScore = [5, 10, 15];
		this.mapPositions = [
			[
				[550, 980, "R"],
				[918, 807, "R"],
				[1155, 660, "R"],
				[1419, 550, "R"],
				[1257, 436, "R"],
				[1353, 289, "R"]
			], [
				[572, 900, "R"],
				[726, 788, "R"], 		//1
				[892, 710, "R"],		//2
				[924, 614, "L"],		//3
				[1250, 614, "R"],		//4
				[1425, 510, "R"],		//5
				[1294, 438, "R"],		//6
				[948, 468, "L"],		//7
				[890, 400, "L"],		//8
				[1016, 314, "L"],		//9
				[1268, 276, "R"]		//10
			], [
				[1354, 976, "R"],
				[702, 938, "R"],		//1
				[918, 902, "R"],		//2
				[976, 818, "L"],		//3
				[1304, 810, "R"],		//4
				[1206, 708, "R"],		//5
				[1076, 654, "R"],		//6
				[798, 610, "L"],		//7
				[926, 530, "L"],		//8
				[1170, 600, "R"],		//9
				[1356, 558, "R"],		//10
				[1474, 468, "R"],		//11
				[1350, 406, "R"],		//12
				[1070, 384, "L"],		//13
				[1330, 328, "R"],		//14
				[1300, 242, "R"]
			]
		];
		
		this.usersPerPos = [];
		for (var i=0; i<this.maxScore[Global.selectedMap]+1; i++)
			this.usersPerPos[i] = 0;
			
		this.isGameOver = false;
		this.currentQuestion = 1;
		
		
		this.createRandomQueue();
		this.createPlayers();
		
		this.questionBar = game.add.group();
		this.questionBar.bg = game.add.sprite(13, 10, "question_bg", 0, this.questionBar);
		this.questionBar.txt = game.add.text(960, 50, Global.questions[this.randomQueue[0]].q, standarText, this.questionBar);
		this.questionBar.txt.anchor.setTo(.5, 0);
		this.questionBar.y = -200;
		this.showQuestion();
	},
	createRandomQueue: function() {
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
		this.players = [];
		var tmpX = 0;
		for (var i=0; i<Global.players.length; i++) {
			var p = game.add.group();
			p.id = i;
			p.currentPosition = 1;
			p.currentScore = 0;
			Global.players[i].score = 0;
			p.txtTitle = game.add.text(85, 0, p.currentPosition + ". " + Global.players[i].name, standarText, p);
			p.avatar = game.add.sprite(0, 0, "c" + Global.players[i].avatar, 0, p);
			p.avatar.scale.setTo(0.3, 0.3);
			p.mapAvatar = game.add.sprite(0, 0, "c" + Global.players[i].avatar, 0);
			p.mapAvatar.anchor.setTo(.5, .5);
			p.mapAvatar.scale.setTo(0.3, 0.3);
			if (this.mapPositions[Global.selectedMap][0][2] == "L")
				p.mapAvatar.x = this.mapPositions[Global.selectedMap][0][0] - tmpX;
			else
				p.mapAvatar.x = this.mapPositions[Global.selectedMap][0][0] + tmpX;
			p.mapAvatar.y = this.mapPositions[Global.selectedMap][0][1];
			tmpX += p.mapAvatar.width + 15;
			p.btnCorrect = new ButtonX(this.game, 342, 65, "misc", this.onCorrectClicked, p, "btn_correct");
			p.add(p.btnCorrect);
			p.btnWrong = new ButtonX(this.game, 420, 65, "misc", this.onWrongClicked, p, "btn_wrong");
			p.add(p.btnWrong);
			p.imgCorrect = new ButtonX(this.game, p.btnCorrect.x, p.btnCorrect.y, "misc", this.onCorrectClicked, p, "img_correct");
			p.add(p.imgCorrect);
			p.imgWrong = new ButtonX(this.game, p.btnWrong.x, p.btnWrong.y, "misc", this.onWrongClicked, p, "img_wrong");
			p.add(p.imgWrong);
			p.imgCorrect.visible = false;
			p.imgWrong.visible = false;
			p.x = 10;
			p.y = 120 * i + 140;
			this.players[i] = p;
		}
	},
	calcPositions: function() {
		var place = 1;
		var hasPlayer = false;
		for (var sc=this.maxScore[Global.selectedMap]; sc>=0; sc--) {
			hasPlayer = false;
			for (var i=0; i<this.players.length; i++) {
				if (this.players[i].currentScore == sc) {
					this.players[i].currentPosition = place;
					hasPlayer = true;
				}
			}
			if (hasPlayer == true) {
				place++;
			}
		}
		for (var i=0; i<this.players.length; i++) {
			this.players[i].txtTitle.setText(this.players[i].currentPosition + ". " + Global.players[i].name);
		}
		
		var posOnScreen = 0;
		for (var pos=1; pos<7; pos++) {
			for (var i=0; i<this.players.length; i++) {
				if (pos == this.players[i].currentPosition) {
					game.add.tween(this.players[i]).to({
						y: 120 * posOnScreen + 140
					}, 1000, Phaser.Easing.Quintic.Out, true, 0);
					posOnScreen++;
				}
			}	
		}
		
		if (this.isGameOver) {
			game.time.events.add(5000, function() {
				this.game.state.start('winner', true);
			}, this);
		} else {
			game.time.events.add(1000, function() {
				this.enableLeftButtons();
			}, this);
		}
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
			if (this.players[i].imgCorrect.visible == true)
				Global.players[this.players[i].id].score++;
			if (Global.players[this.players[i].id].score == this.maxScore[Global.selectedMap]) doWeHaveAWinner = true;	
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
		this.questionBar.txt.wordWrapWidth = playState.questionBar.bg.width - 50;
		this.questionBar.txt.align = 'center';
		
		this.questionBar.bg.height = this.questionBar.txt.height + 80;
		
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
		this.usersPerPos = [];
		for (var i=0; i<this.maxScore[Global.selectedMap]+1; i++)
			this.usersPerPos[i] = 0;
			
		var hasMoved = false;
		var isEndGame = false;
		for (var i=0; i<this.players.length; i++) {
			var score = Global.players[this.players[i].id].score;
			if (hasMoved)
				score = this.players[i].currentScore;
			if (this.mapPositions[Global.selectedMap][score][2] == "L") {
				
				game.add.tween(this.players[i].mapAvatar).to({
					x: this.mapPositions[Global.selectedMap][score][0] - this.usersPerPos[score],
					y: this.mapPositions[Global.selectedMap][score][1]
				}, 1000, Phaser.Easing.Quintic.Out, true, 0);
				this.usersPerPos[score] += this.players[i].mapAvatar.width + 15;
			} else {
				game.add.tween(this.players[i].mapAvatar).to({
					x: this.mapPositions[Global.selectedMap][score][0] + this.usersPerPos[score],
					y: this.mapPositions[Global.selectedMap][score][1]
				}, 1000, Phaser.Easing.Quintic.Out, true, 0);
				this.usersPerPos[score] += this.players[i].mapAvatar.width + 15;
			}
			if (this.players[i].currentScore != score) {
				this.players[i].currentScore = score;
				hasMoved = true;
			}
			if (score == this.maxScore[Global.selectedMap]) isEndGame = true;
		}
		
		if (hasMoved) {
			game.time.events.add(800, function() {
				this.animateRepositions();
			}, this);	
		} else {
			if (isEndGame)
				this.isGameOver = true;
			this.calcPositions();
		}
		
	} 
	
	
}