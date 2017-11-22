var bootState = {
	create: function() {
		this.game.input.maxPointers = 1;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true
        game.scale.onSizeChange.add(updateSize);
    },
	update: function() {
		this.game.state.start("preload");
	},
	resize: function() {
		
		 var _game = this.game;
        setTimeout(function() {
            _game.scale.refresh();
            setTimeout(function() {
                _game.scale.refresh()
				updateSize();
            }, 400);
        }, 400);
	}
	
};