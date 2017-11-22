var avaXstart = 10;
var avaYstart = 180;
var avaYspace = 75;  // space between avatars

var heroXstart = 800;
var heroXspace = 80;  // space between heroes
var heroYstart = 1000;

var ladderHeight = 35;
var ladderYstart = 1020;

var archerX = 1600;
var archerY = 0;

var playState = {
	randomQueue: [],
	players: [],
    create: function() {

        // THIS IS FOR DEBUG PURPOSES:
        Global = {
            "minQuestions":7,
            "questions":[
                {"q":"question 1"},
                {"q":"medium medium question question"},
                {"q":"long long long question question question"},
                {"q":"very long very long very long very long question question question question "},
                {"q":"very long very long very long very long question question question question  very long very question question "},
                {"q":"question 6"},
                {"q":"very long very long very long very long question question question question  very long very question question "}],
            "players":[
                {"name":"Launcelot","avatar":"Black","score":0,"position":0},
                {"name":"Gawain","avatar":"Blue","score":0,"position":0},
                {"name":"Percivale","avatar":"Brown","score":0,"position":0},
                {"name":"Lionel","avatar":"Green","score":0,"position":0},
                {"name":"Tristram","avatar":"Orange","score":0,"position":0},
                {"name":"Gareth","avatar":"Pink","score":0,"position":0},
                {"name":"Bleoberis","avatar":"Purple","score":0,"position":0},
                {"name":"Lacotemale","avatar":"Red","score":0,"position":0},
                {"name":"Lucan","avatar":"White","score":0,"position":0},
                {"name":"Lamorak","avatar":"Yellow","score":0,"position":0}
            ],
            "numberOfKnights":10,
            "selectedMap":0,
            "showQuestions":true,
            "archerAttacks":true,
            "knightColors":["Black","Blue","Brown","Green","Orange","Pink","Purple","Red","White","Yellow"],
            "knightNames":["Launcelot","Gawain","Percivale","Lionel","Tristram","Gareth","Bleoberis","Lacotemale","Lucan","Lamorak"]
        };
        // ^^^ DELETE THIS UPPER ^^^

		this.add.image(0, 0, "map" + Global.selectedMap);
		var playersBoard = this.add.image(5, 180, 'PlayersBoard');
		playersBoard.scale.setTo(1.3, 0.115*Global.players.length);

		this.btnSubmit = new ButtonX(this.game, 247, 940, "buttons", this.onSubmitClicked, this, "SubmitBTN");
		this.btnSubmit.anchor.setTo(.5, 0);
		this.game.world.add(this.btnSubmit);

		this.maxScore = Global.minQuestions;
        this.winners = []
		this.currentQuestion = 1;
		this.createPlayers();

		if (Global.selectedMap == 0) archerY = 600;
		if (Global.selectedMap == 1) archerY = 450;
		if (Global.selectedMap == 2) archerY = 350;


		if (Global.archerAttacks) {
            this.archer = game.add.sprite(archerX, archerY, 'Archer');
            this.archer.anchor.setTo(0.5, 0.5);
            //this.archer.visible = false;
        }
        this.archerActive = false;
        this.round = 0;  // every 4-th round the archer appears


        this.createRandomQuestionsQueue();
		this.questionBar = game.add.group();
		this.questionBar.bg = game.add.sprite(50, 30, "question_bg", 0, this.questionBar);
		this.questionBar.txt = game.add.text(700, 45, Global.questions[this.randomQueue[0]].q, standarTextBlack, this.questionBar);
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
		this.players = [];
		Global.players.forEach(function(player, i){
			var p = game.add.group();
			p.id = i;
			p.currentPosition = 1;
			p.score = 0;
			p.color = player.avatar;
			Global.players[i].score = 0;

			// Creating list of players and answer buttons on the left part of the screen
			p.txtTitle = game.add.text(50, 20, p.currentPosition + ". " + Global.players[i].name, standarTextBlack, p);
			p.avatar = game.add.sprite(0, 0, 'KnightFront'+player.avatar, 0, p);
			p.avatar.scale.setTo(0.5, 0.5);

			p.btnCorrect = new ButtonX(this.game, 342, 30, "buttons", this.onCorrectClicked, p, "V");
			p.add(p.btnCorrect);
			p.btnWrong = new ButtonX(this.game, 420, 30, "buttons", this.onWrongClicked, p, "X");
			p.add(p.btnWrong);
			p.imgCorrect = new ButtonX(this.game, p.btnCorrect.x, p.btnCorrect.y, "misc", this.onCorrectClicked, p, "img_correct");
			p.add(p.imgCorrect);
			p.imgWrong = new ButtonX(this.game, p.btnWrong.x, p.btnWrong.y, "misc", this.onWrongClicked, p, "img_wrong");
			p.add(p.imgWrong);
			p.imgCorrect.visible = false;
			p.imgWrong.visible = false;

			p.x = avaXstart;
			p.y = avaYstart + i*avaYspace;

			// Creating list of heroes on the starting positions
            p.hero = game.add.sprite(0, 0, "KnightFront"+player.avatar, 0);
            //p.hero.anchor.setTo(.5, .5);
            //p.hero.scale.setTo(0.7, 0.7);
            p.hero.x = heroXstart + i*heroXspace;
            p.hero.y = heroYstart;

            p.ladder = [];

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
		this.players.forEach(function(player) {
			if (player.imgCorrect.visible === true) {
                Global.players[player.id].score++;
                player.score++;
                // build ladder piece
                var ladder = game.add.sprite(player.hero.x, 0, "Ladder", 0);
                ladder.y = ladderYstart - player.score*ladderHeight;
                ladder.anchor.setTo(.5, .5);
                player.ladder.push(ladder);
				player.hero.bringToTop()
            } else {
			    if (this.archerActive && player.score > 1) {
                    Global.players[player.id].score--;
                    player.score--;
                    this.archerAttackPlayer(player)
                }
            }

			if (player.score === this.maxScore) {
                doWeHaveAWinner = true;
                this.winners.push(player)
            }

			player.imgCorrect.visible = false;
			player.imgWrong.visible = false;
			player.btnCorrect.visible = false;
			player.btnWrong.visible = false;
			player.txtTitle.setText(Global.players[player.id].name);
		}, this);

		// reset Archer and question bg color
		this.archerActive = false;
        this.questionBar.bg.loadTexture('question_bg');  // reset bg color
		
		if (doWeHaveAWinner){
			game.add.audio("answered_top").play();
		    this.congratWinner()
		} else {
            game.add.audio("answered").play();
            this.animateRepositions();
            this.hideQuestion();
		}
	},
	hideQuestion: function() {
		game.add.tween(this.questionBar).to({
				y: -80 - this.questionBar.bg.height
			}, 1000, Phaser.Easing.Quintic.Out, true, 0);
	},
	showQuestion: function() {
	    // archer logic
        this.round++;
        if (this.round % 4 === 0 && Global.archerAttacks)
            this.archerActive = true;

        if (this.archerActive){
            this.archer.loadTexture("ArcherFire");
            game.add.audio("arrowSwoosh").play();
            this.questionBar.bg.loadTexture('question_red')
        }

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
		this.players.forEach(function(player) {
			if (player.score == 1) {
			    // go to ladder
                player.hero.loadTexture("KnightClimbing" + player.color, 0);
                player.hero.anchor.setTo(.5, .5);
                player.hero.scale.setTo(0.7, 0.7);
            } else if (player.score > 1){
			    // go one step higher
                game.add.tween(player.hero).to({
                    y: heroYstart - ladderHeight * (player.score-1)
                }, 1000, Phaser.Easing.Quintic.Out, true, 0);
            }
			if (player.score === this.maxScore)
				isEndGame = true;
		}, this);

        if (isEndGame) {
            game.time.events.add(5000, function() {
                this.game.state.start('winner', true);
            }, this);
        } else {
            game.time.events.add(1000, function() {
                this.enableLeftButtons();
            }, this);
        }
	},
    archerAttackPlayer: function(player){
        // shoot
        var arrow = this.game.add.sprite(this.archer.x - 20, this.archer.y, 'Arrow', 0);
        arrow.anchor.setTo(0, 1);
        var ladderPiece = player.ladder[player.ladder.length-1];
        if (!ladderPiece) return; // another error check

        // shoot the arrow
        this.archer.loadTexture("Archer");
        game.add.audio("arrowSwoosh").play();
        game.add.tween(arrow).to({
            x: player.hero.x,
            y: heroYstart - ladderHeight * player.score,
            angle: -50
        }, 1000, Phaser.Easing.Quintic.Out, true, 0)
            //set ladder in fire when arrow hit it
            .onComplete.add(function(arrow){
                ladderPiece.loadTexture('LadderOnFire');
                setTimeout(function(){
                    // destroy the burning ladder
                    ladderPiece.destroy();
                    arrow.destroy();
                    player.ladder.length--;
                }, 5000)
        }, this)
    },
    congratWinner: function(){
        this.winners.forEach(function(p){
            game.add.tween(p.hero).to({
                y: p.hero.y - ladderHeight*3
            }, 1000, Phaser.Easing.Quintic.Out, true, 0)
                .onComplete.add(function(){
                    p.hero.loadTexture("KnightFront"+p.color);
                    var flag = game.add.sprite(p.hero.x, p.hero.y, 'Flag'+p.color);
                    flag.anchor.setTo(0.4, 0.75);
                }, this)
        }, this)

    }
};