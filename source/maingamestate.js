var mainGameState = {}
    
//add the preload function
mainGameState.preload = function() {
    console.log("Pre-loading the Game");
    this.game.load.image("space-bg", "assets/images/space2-bg.jpg");
    this.game.load.image("playership", "assets/images/alien4.png");
    this.game.load.audio("gametheme", "assets/music/spacegametheme.mp3");
    this.game.load.image("asteriodsmall", "assets/images/asteroid-small-01.png");
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
    //this.music.play();
    //this.music.loop = true;
    
    //asteroids
    this.asteroidTimer = 2.0;
    
}

//Add the update function
mainGameState.update = function() {
    
    //move ship over the canavas
    
    if (this.cursors.right.isDown) {
        this.playerShip.body.velocity.x = -200;
    } else if (this.cursors.left.isDown) {
        this.playerShip.body.velocity.x = 200;
    } else {
        this.playerShip.body.velocity.x = 0;
    }
    
    //asteroids spawn every 2 seconds
    
    this.asteroidTimer -= game.time.physicsElapsed;
    
    if ( this.asteroidTimer <= 0.0) {
        this.spawnAsteriod();
        this.asteroidTimer = 2.0;
    }
    
}

//Spawning Asteriods
mainGameState.spawnAsteriod = function() {
    
    //Create asteriod
    var x = game.rnd.integerInRange(0, game.width);
    var asteriod = game.add.sprite(x, 0, 'asteriodsmall');
    asteriod.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(asteriod);
    asteriod.body.velocity.setTo(0, 200);
    
}