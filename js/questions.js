var questionsState = {
    create: function() {
		this.add.image(0, 0, "questions_bg");
        // title
        this.world.add(new Phaser.Text(this.game, 700, 100, 'Enter Questions', {
            font: '50pt electronic',
            fill: 'white'}));
		showQuestions();
	},
	onSubmitClicked: function() {
		game.time.events.add(300,function()
        {
            this.game.state.start('climbers',true);
        },this);
	}
}