var mainGameState = {}
    
//add the preload function
mainGameState.preload = function() {
    console.log("Pre-loading the Game");
    this.game.load.image("space-bg", "assets/images/space2-bg.jpg");
    this.game.load.image("playership", "assets/images/alien4.png");
    this.game.load.audio("gametheme", "assets/music/spacegametheme.mp3");
    this.game.load.image("asteroidsmall", "assets/images/asteroid-small-01.png");
    this.game.load.image("firebullet", "assets/images/bullet-fire.png");
    this.game.load.audio("asteroid_hit1", "assets/audio/asteroid_hit_01.mp3");
    this.game.load.audio("asteroid_hit2", "assets/audio/asteroid_hit_02.mp3");
    this.game.load.audio("asteroid_hit3", "assets/audio/asteroid_hit_03.mp3");
    this.game.load.audio("asteroid_hit4", "assets/audio/asteroid_hit_04.mp3");
    this.game.load.audio("asteroid_hit5", "assets/audio/asteroid_hit_05.mp3");
    this.game.load.audio("asteroid_hit6", "assets/audio/asteroid_hit_06.mp3");
    this.game.load.audio("player_fire1", "assets/audio/player_fire_01.mp3");
    this.game.load.audio("player_fire2", "assets/audio/player_fire_02.mp3");
    this.game.load.audio("player_fire3", "assets/audio/player_fire_03.mp3");
    this.game.load.audio("player_fire4", "assets/audio/player_fire_04.mp3");
    this.game.load.audio("player_fire5", "assets/audio/player_fire_05.mp3");
    this.game.load.audio("player_fire6", "assets/audio/player_fire_06.mp3");
    this.game.load.audio("asteroid_death1", "assets/audio/asteroid_death_01.mp3");
    this.game.load.audio("asteroid_death2", "assets/audio/asteroid_death_02.mp3");
    this.game.load.audio("asteroid_death3", "assets/audio/asteroid_death_03.mp3");
    this.game.load.audio("player_hit", "assets/audio/player_hit_01.mp3");
    this.game.load.audio("player_death", "assets/audio/player_death_01.mp3");
    this.game.load.image("starfieldbg", "assets/images/starfield.jpg");
}

//add the create method 
mainGameState.create = function() {
    
    var x = game.width * 0.5;
    var y = game.height * 0.95;
   
    //Background
    //this.game.add.sprite(-100, -200, 'space-bg');
    tileSprite = game.add.tileSprite(0, 0, 800, 600, 'starfieldbg');

    //Spaceship
    this.playerShip = game.add.sprite(x, y, 'playership');
    this.playerShip.anchor.setTo(0.5, 0.5);
    this.playerShip.scale.setTo(0.5,0.5);
    
    //Move
    game.physics.startSystem(Phaser.Physics.ARCADE); 
    game.physics.arcade.enable(this.playerShip);
    this.playerShip.body.immovable = true;
    
    this.cursors = game.input.keyboard.createCursorKeys();
    
    //Musics in the bg
    this.music = game.add.audio('gametheme');
    //this.music.play();
    //this.music.loop = true;
    
    //SFX
    this.playerFireSfx = [];
    this.playerFireSfx.push(game.add.audio("player_fire1"));
    this.playerFireSfx.push(game.add.audio("player_fire2"));
    this.playerFireSfx.push(game.add.audio("player_fire3"));
    this.playerFireSfx.push(game.add.audio("player_fire4"));
    this.playerFireSfx.push(game.add.audio("player_fire5"));
    this.playerFireSfx.push(game.add.audio("player_fire6"));
    
    //asteroids
    this.asteroidTimer = 2.0;
    this.asteroids = game.add.group();
    
    //bullets
    this.firebullets = game.add.group();
    this.fireTimer = 2.0;
    
    //set firekey to Z 
    this.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
     
    //create text object for player score
    var TextStyle = {font: "16px Arial", fill: "#ffffff", align: "center"}
    this.playerScoreTitle = game.add.text(game.width*0.70, 20, "Score", TextStyle);
    this.playerScoreTitle.fixedToCamera = true;
    
    this.scoreValue = game.add.text(game.width * 0.85, 20, "0", TextStyle);
    this.scoreValue.fixedToCamera = true;
    
    //Score Value at start
    this.playerScore = 0;
    
    //Player lives at start
    this.playerLives = 3;
    
    //create text object for player lives
    var TextStyle = {font: "16px Arial", fill: "#ffffff", align: "center"}
    this.playerLivesTitle = game.add.text(game.width*0.70, 40, "Lives", TextStyle);
    this.playerLivesTitle.fixedToCamera = true;
    
    this.playerLivesTotal = game.add.text(game.width*0.85, 40, "3", TextStyle);
    this.playerLivesTotal.fixedToCamera = true;
    
    this.timePerAsteroid = 2.0;
    
}

//Add the update method
mainGameState.update = function() {
    
    //repeat tile bg
    tileSprite.tilePosition.y += 1;
    
    //move ship over the canavas
    
    if (this.cursors.left.isDown) {
        this.playerShip.body.velocity.x = -200;
    } else if (this.cursors.right.isDown) {
        this.playerShip.body.velocity.x = 200;
    } else {
        this.playerShip.body.velocity.x = 0;
    }
    
    // asteroids spawn
    
    this.asteroidTimer -= game.time.physicsElapsed;
    if ( this.asteroidTimer <= 0.0) {
        this.spawnAsteroid();
        this.asteroidTimer = this.timePerAsteroid;
    }
    
    
    //clean up bullets
    this.fireTimer -= game.time.physicsElapsed;
    
    for(var i = 0; i <this.firebullets.children.length; i++ ) {
        if (this.firebullets.children[i].y < -100) {
            this.firebullets.children[i].destroy();
        }
    }
    
    //clean up asteriods
        //for loop that takes all the asteriods created from the group as an array, checks if
        //asteriod is out of the set area, what we can see plus some, and if outside, delete.
    for( var i = 0; i <this.asteroids.children.length; i++ ) {
        if ( this.asteroids.children[i].y > (game.height + 200) ) {
            this.asteroids.children[i].destroy();
        }
    }
    
     //check if Z is being pressed - shoot
    if ( this.fireKey.isDown ) {
        this.spawnFireBullet();
    }
    //check for collision asteroid - bullets
    game.physics.arcade.collide(this.asteroids, this.firebullets, this.onAsteroidBulletCollision, null, this);
    
    //update text label for player score
    this.scoreValue.setText(this.playerScore);
    
    //update text label for player lives
    this.playerLivesTotal.setText(this.playerLives);
    
    //check for collision player - asteroid
    game.physics.arcade.collide(this.playerShip, this.asteroids, this.onAsteroidPlayerCollision, null,this);
    
    //check if player is dead
    if (this.playerLives <= 0) {
        game.state.start("GameOver");
    }
    
    //check if player won level
     if (this.playerScore >= 10) {
        game.state.start("Winner");
    }
    
    
}

//Creating/spawning Asteroids
mainGameState.spawnAsteroid = function() {
    
    var x = game.rnd.integerInRange(0, game.width);
    var asteroid = game.add.sprite(x, 0, 'asteroidsmall');
    asteroid.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(asteroid);
    //all asteroids spawn with equal velocity
    //asteroid.body.velocity.setTo(0, 100); 
    //random velocity 
    asteroid.body.velocity.y= this.rnd.integerInRange(100, 0);
    this.asteroids.add(asteroid);
    
}

//Function for spawning bullets
mainGameState.spawnFireBullet = function() {
    if (this.fireTimer < 0) {
        this.fireTimer = 0.5;
    
    var firebullet = game.add.sprite(this.playerShip.x,(this.playerShip.y-55), 'firebullet');
    firebullet.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(firebullet);
    firebullet.body.velocity.setTo(0,-200);
    this.firebullets.add(firebullet);
    var sfxindex = game.rnd.integerInRange(0, 5);
    this.playerFireSfx[sfxindex].play();
    }
}

//function for collisions asteroid - bullets
//using object as it doesnt matter at this point both will be destroyed, different when //spaceschip vs something else
mainGameState.onAsteroidBulletCollision = function(object1, object2){ 
    console.log ("collision!!!!!");
    object1.pendingDestroy = true;
    object2.pendingDestroy = true;
    this.playerScore +=10;
}

//function for checking player - asteroid collision
mainGameState.onAsteroidPlayerCollision = function (object1, object2){
    if (object1.key.includes("asteroid") )  {
        object1.pendingDestroy = true;
    } else {
        object2.pendingDestroy = true;
        this.playerLives -=1;
    }
}
    
