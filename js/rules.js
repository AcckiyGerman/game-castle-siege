var rulesState = {
    create: function() {
		this.bg = this.add.image(0, 0, "rules_bg");

        this.world.add(
            new Phaser.Text(this.game, 750, 50, 'Game Rules', {
                font: '60pt electronic',
                fill: 'white'
            })
        );

        this.rulesText = `
At the beginning of the game, one knight is selected for each team. Up to 10 teams can compete at once.
The size of the castle represents the duration of the game:
-      Small castle: 10 questions to answer.
-       Medium castle: 15 questions to answer.
-       Large castle: 20 questions to answer.
 
Questions can be entered and displayed on screen or asked out-loud without being entered in the game.

If the archer’s attacks are added to the game, they will come in randomly to trigger a special question!`;

        this.world.add(
        	new Phaser.Text(this.game, 150, 150, this.rulesText, {
        		font: '24pt electronic',
				fill: 'white',
				align: 'center',
                boundsAlignH: 'center'
			})
		);

        this.actionsText = `
1. At the beginning of a game, a question is asked of all teams.
2. If they answer correctly, a piece of ladder is added to the wall. If they don’t answer correctly,
 they don’t get anything.
3. If an archer shows up, only the knights who answer the question correctly will keep the last piece
 of ladder they won.
4. The first knight(s) to reach the top of the wall is/are victorious.

Good luck!`;
        this.world.add(
            new Phaser.Text(this.game, 150, 550, this.actionsText, {
                font: '24pt electronic',
                fill: 'white'
            })
        );

		
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