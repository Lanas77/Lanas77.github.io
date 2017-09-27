var mainGameState = {}
    
//add the preload function
mainGameState.preload = function() {
    console.log("Pre-loading the Game");
    this.game.load.image("space-bg", "assets/images/space2-bg.jpg");
    this.game.load.image("playership", "assets/images/alien4.png");
    this.game.load.audio("gametheme", "assets/music/spacegametheme.mp3");
}

//add the create function 
mainGameState.create = function() {
    
    var x = game.width * 0.5;
    var y = game.height * 0.95;
   
    //Background
    this.game.add.sprite(-100, -200, 'space-bg');

    //Spaceship
    this.playerShip = game.add.sprite(x, y, 'playership');
    this.playerShip.anchor.setTo(0.5, 0.5);
    this.playerShip.scale.setTo(0.5,0.5);
    
    //Move
    game.physics.startSystem(Phaser.Physics.ARCADE); 
    game.physics.arcade.enable(this.playerShip);
    
    this.cursors = game.input.keyboard.createCursorKeys();
    
    //Musics
    this.music = game.add.audio('gametheme');
    this.music.play();
    this.music.loop = true;
    
}

//Add the update function
mainGameState.update = function() {
    
    //move over the canavas
    
    if (this.cursors.right.isDown) {
        this.playerShip.body.velocity.x = -200;
    } else if (this.cursors.left.isDown) {
        this.playerShip.body.velocity.x = 200;
    } else {
        this.playerShip.body.velocity.x = 0;
    }
    
}