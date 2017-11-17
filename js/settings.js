var settingsState = {
    create: function() {
		this.add.image(0, 0, "settings_bg");
		
		this.numberOfClimbers = [];
		this.mountains = [];

        this.world.add(
        	new Phaser.Text(this.game, 750, 100, 'Game Settings', {
				font: '50pt electronic',
				fill: 'white'
			})
		);

        this.world.add(
        	new Phaser.Text(this.game, 500, 250, 'Number of knights:', {
				font: '40pt electronic',
				fill: 'white'
			})
		);

		var padding = 10;
		// for (var i=0; i<6; i++) {
		// 	var btn = new ButtonX(this.game, 0, 460, "misc", this.onNumberOfClimbersClicked, this, "btn_" + (i+1));
		// 	btn.id = (i+1);
		// 	btn.anchor.setTo(0, 0.5);
		// 	btn.x = 144 + i * (btn.width + padding);
		// 	this.numberOfClimbers[i] = btn;
		// 	this.world.add(btn);
		// }
		// this.activate(this.numberOfClimbers, this.numberOfClimbers[1]);

		this.world.add(
			new Phaser.Text(this.game, 750, 400, 'Size of the castle:',{
				font: '40pt electronic',
				fill: 'white'
			})
		);

		for (var i=0; i<3; i++) {
			var btn = new ButtonX(this.game, 0, 655, "misc", this.onMountainClicked, this, "btn_mountain_" + (i+1));
			btn.id = (i+1);
			btn.anchor.setTo(0, 0.5);
			btn.x = 144 + i * (btn.width + padding);
			this.mountains[i] = btn;
			this.world.add(btn);
		}
		this.activate(this.mountains, this.mountains[0]);
		
		this.btnYes = new ButtonX(this.game, 144, 840, "misc", this.onYesClicked, this, "btn_yes");
		this.btnYes.anchor.setTo(0, 0.5);
		this.world.add(this.btnYes);
		
		this.btnNo = new ButtonX(this.game, 144+177+padding, 840, "misc", this.onNoClicked, this, "btn_no");
		this.btnNo.anchor.setTo(0, 0.5);
		this.world.add(this.btnNo);
		this.onYesClicked();
		
		this.btnSubmit = new ButtonX(this.game, 144, 1000, "misc", this.onSubmitClicked, this, "btn_submit");
		this.btnSubmit.anchor.setTo(0, 0.5);
		this.world.add(this.btnSubmit);
	}, 
	onSubmitClicked: function() {
		if (this.btnYes.frameName == "btn_yes_down") 
			Global.showQuestions = true;
		else
			Global.showQuestions = false;
		
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
	onMountainClicked: function(button) {
		this.activate(this.mountains, button);
	},
	activate:function(group, who) {
		for (var i=0; i<group.length; i++) {

			if (who.id == group[i].id) {
				group[i].frameName = group[i].frameName.replace("_down", "") + "_down";
			} else {
				group[i].frameName = group[i].frameName.replace("_down", "");
			}
		}
	},
	onNoClicked: function() {
		this.btnYes.frameName = "btn_yes";
		this.btnNo.frameName = "btn_no_down";
	},
	onYesClicked: function() {
		this.btnYes.frameName = "btn_yes_down";
		this.btnNo.frameName = "btn_no";
	}
}