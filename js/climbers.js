var climbersState = {
    create: function() {
		this.add.image(0, 0, "knights_bg");
        this.world.add(
        	new Phaser.Text(this.game, 700, 100, 'Select Your Colors', {
            	font: '50pt electronic',
            	fill: 'white'}));
		showClimbers();
		
		if (game.cache.checkVideoKey('video')) {
			this.video = game.add.video('video');
			this.video.loop = false;
			this.videoSprite = this.video.addToWorld(0, 0);
			this.video.onComplete.add(function() {
				this.game.state.start('play',true);
			});
			this.videoSprite.visible = false;
		} else {
			this.video = null;
			this.videoSprite = null;
		}
		
		this.btnStart = new ButtonX(this.game, 980, 990, "buttons", this.onStartClicked, this, "StartGameBTN");
		this.world.add(this.btnStart);
		this.btnStart.visible = false;
	},
	onSubmitClicked: function() {
		if (this.video == null) {
			this.game.state.start('play',true);
		} else {
			this.btnStart.visible = true;
			this.videoSprite.visible = true;
			this.video.play();
		}
	},
	onStartClicked: function() {
		this.video.stop();
		this.game.state.start('play',true);
	}
};