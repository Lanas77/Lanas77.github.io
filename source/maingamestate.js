var mainGameState = {}
    
//add the preload function
mainGameState.preload = function() {
    console.log("Pre-loading the Game");
    this.game.load.image("space-bg", "assets/images/space2-bg.jpg");
    this.game.load.image("playership", "assets/images/alien4.png");
}

//add the create function 
mainGameState.create = function() {
    game.add.sprite(-100, -200, 'space-bg');
    
var x = game.width * 0.5;
var y = game.height * 0.95;

    this.playerShip = game.add.sprite(x, y, 'playership');
    this.playerShip.anchor.setTo(0.5, 0.5);
    this.playerShip.scale.setTo(0.5,0.5);
}

//Add the update function
mainGameState.update = function() {
    
}