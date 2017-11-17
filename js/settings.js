var settingsState = {
    create: function() {
		this.add.image(0, 0, "settings_bg");
		
		this.numberOfClimbers = 2;
		this.castles = [];

        this.world.add(new Phaser.Text(this.game, 700, 100, 'Game Settings', {
				font: '50pt electronic',
				fill: 'white'}));
        this.world.add(new Phaser.Text(this.game, 500, 250, 'Number of knights:', {
				font: '40pt electronic',
				fill: 'white'}));

        var padding = 20;

        // knights counter
        var decreaseBtn = new ButtonX(this.game, 1020, 280, 'buttons', this.decreaseClimbers, this, 'LeftBTN');
		decreaseBtn.scale.setTo(2, 2);
		this.world.add(decreaseBtn);
		//var emptySpace = new Phaser.Image(this.game, 1055, 230, 'buttons', 'EmptyBTN');
		//this.world.add(emptySpace);
		this.counterText = new Phaser.Text(this.game, 1090, 240, this.numberOfClimbers, {
			font: '60pt electronic', fill: 'white'
		});
		this.world.add(this.counterText);
		var increaseBtn = new ButtonX(this.game, 1200, 280, 'buttons', this.increaseClimbers, this, 'RightBtn');
		increaseBtn.scale.setTo(2, 2);
		this.world.add(increaseBtn);


		this.world.add(
			new Phaser.Text(this.game, 700, 400, 'Size of the castle:', {
				font: '40pt electronic',
				fill: 'white'
			})
		);

        ['SmallCastle', 'MediumCastle', 'LargeCastle'].forEach(function(castle, i){
            var btn = new ButtonX(this.game, 0, 550, 'buttons', this.onCastleClicked, this, castle);
            btn.x = 600 + i * (btn.width + padding);
            this.castles[i] = btn;
            this.world.add(btn)
        }, this);
        this.activate(this.castles, this.castles[0]);

        // Show questions? (yes, no)
        this.world.add(
            new Phaser.Text(this.game, 300, 700, 'Questions displayed\non screen:', {
                font: '40pt electronic',
                fill: 'white'
            })
        );
		// yes btn
		this.showQuestionsYes = new ButtonX(this.game, 850, 750, "buttons", this.switchShowQuestion, this, "YesBTN");
		this.showQuestionsYes.anchor.setTo(0, 0.5);
		this.world.add(this.showQuestionsYes);
		// no btn
		this.showQuestionsNo = new ButtonX(this.game, 850+this.showQuestionsYes.width+2*padding, 750, "buttons", this.switchShowQuestion, this, "NoBTN");
		this.showQuestionsNo.anchor.setTo(0, 0.5);
		this.world.add(this.showQuestionsNo);
		// make group and activate 'Yes'
		this.showQuestions = [this.showQuestionsYes, this.showQuestionsNo];
		this.activate(this.showQuestions, this.showQuestions[0]);

		// Archer attacks? (yes, no)
        this.world.add(
            new Phaser.Text(this.game, 300, 900, 'Archer attacks:', {
                font: '40pt electronic',
                fill: 'white'
            })
        );
		// yes, no buttons
		this.archerAttacksSwitcher = [];
		['YesBTN', 'NoBTN'].forEach(function(button, i){
			var btn = new ButtonX(this.game, 0, 950, 'buttons', this.switchArcherQuestion, this, button);
			btn.x = 980 + i * (btn.width + padding*2);
			this.archerAttacksSwitcher.push(btn);
			this.world.add(btn)
		}, this);
		this.activate(this.archerAttacksSwitcher, this.archerAttacksSwitcher[0]);




		this.btnSubmit = new ButtonX(this.game, 1600, 1000, "buttons", this.onSubmitClicked, this, "SubmitBTN");
		this.btnSubmit.anchor.setTo(0, 0.5);
		this.world.add(this.btnSubmit);
	},

	onSubmitClicked: function() {
    	Global.showQuestions = this.showQuestionsYes.pressed;
		Global.archerAttacks = this.archerAttacksSwitcher[0].pressed;
		
		var noOfPlayers = 0;
		var defaultNames = ["Phil", "Teresa", "Nathan", "Sophia", "Laila", "Brandon"];
		for (var i=0; i<6; i++) {
			if (this.numberOfClimbers[i].frameName == "btn_" + (i+1) + "_down") {
				if (Global.players.length != i+1) {
					Global.players = [];
					for (var j=0; j<i+1; j++) {
						Global.players[j] = {
							"name": defaultNames[j], "avatar": "" + (j+1), "score": 0, "position": 0
						};
					}
				}
			}
		}
			
		for (var i=0; i<3; i++) {
			if (this.mountains[i].frameName == "btn_mountain_" + (i+1) + "_down") {
				Global.selectedMap = i;
			}
		}
		var noOfQuestions = 10;
		if (Global.selectedMap == 0) noOfQuestions = 10;
		if (Global.selectedMap == 1) noOfQuestions = 15;
		if (Global.selectedMap == 2) noOfQuestions = 20;
		
		
		Global.minQuestions = noOfQuestions;
		while (Global.questions.length < noOfQuestions) {
			Global.questions.push({"q": ""});
		}
		
		if (Global.showQuestions)
			this.game.state.start("questions", true);
		else
			this.game.state.start("climbers", true);
	},
	onNumberOfClimbersClicked: function(button) {
		this.activate(this.numberOfClimbers, button);
	},

	switchShowQuestion: function (button) {
		this.activate(this.showQuestions, button)
    },
    switchArcherQuestion: function (button) {
		this.activate(this.archerAttacksSwitcher, button)
    },

    onCastleClicked: function(button) {
		this.activate(this.castles, button);
	},

	activate: function(group, who) {
        console.log('activate', who.frameName);
        group.forEach(function(element){ element.unpress() });
        setTimeout(who.press, 50)
	},

	increaseClimbers: function () {
    	if (this.numberOfClimbers >= 10) return;

		this.numberOfClimbers += 1;
		this.counterText.text = this.numberOfClimbers;
    },
	decreaseClimbers: function () {
    	if (this.numberOfClimbers <= 1) return;
		this.numberOfClimbers -= 1;
		this.counterText.text = this.numberOfClimbers;
    }
};