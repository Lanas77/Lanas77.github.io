var gameoverstate = {}

gameoverstate.preload = function (); {
    this.game.load.image("gameoverbg", "assets/images/gameover2.png");
    
    
}




gameoverstate.create = function (); {
    this.game.add.sprite(0, 0, 'gameoverbg');
    
    
}



gameoverstate.update = function () {
    
    
    
}