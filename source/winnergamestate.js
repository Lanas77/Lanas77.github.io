var winnerGameState = {}

winnerGameState.preload = function (){
    
    
    
}




winnerGameState.create = function () {
    var textStyle1 = {font: "50px Arial", fill: "#43F723", align: "center"};
     var textStyle2 = {font: "30px Arial", fill: "#ffffff", align: "center"};

	WinnerTitle = game.add.text(game.width * 0.3, 40, "YOU WON!", textStyle1);

    WinnerText = game.add.text(game.width *0.15,130, "Wanna play again? Click any key", textStyle2);
}


winnerGameState.update = function () {
    
    //var startoverkey = "Q"
   // if (startoverkey = true){
        //game.state.start("MainGame");
   // } else {
       // null
   // }
    
    
}
