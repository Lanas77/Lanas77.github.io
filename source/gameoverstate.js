var gameOverState = {}

gameOverState.preload = function (){
    this.game.load.image("gameoverbg", "assets/images/gameover.gif");
    
    
}




gameOverState.create = function () {
    this.game.add.sprite(0, 0, 'gameoverbg');
    
    
}



gameOverState.update = function () {
    
    
    
}