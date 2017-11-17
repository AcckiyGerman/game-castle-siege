var rulesState = {
    create: function() {
		this.bg = this.add.image(0, 0, "rules_bg");
		
		
		this.btnNext = new ButtonX(this.game, 980, 980, "buttons", this.onNextClicked, this, "NextBTN");
		this.world.add(this.btnNext);
	},
	onNextClicked: function() {
		game.time.events.add(300,function()
        {
			this.game.state.start('settings',true);
        },this);
		
	}
}