/*
Dim Sum Run by Angela Jiang, Xiao Qing Yu, Nikolas Sanchez


Credits:
Music(CC): Shenyang by Kevin MacLeod -> Link: https://incompetech.filmmusic.io/song/4346-shenyang
Ishikari Lore by Kevin MacLeod -> Link: https://incompetech.filmmusic.io/song/3929-ishikari-lore
License: http://creativecommons.org/licenses/by/4.0/

*/
//game settings
let config = {

    type: Phaser.CANVAS,
    width:960,
    height:640,
    scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 1000
            }
        }
    },    
    scene: [Load, Menu, Play, Endgame,Tutorial]
    //scene: [Tutorial]

};

let game = new Phaser.Game(config);

let width = game.config.width;
let height = game.config.height;
//debug key for scene transition
let keyS;

//loading google text, taken from: https://phaser.io/examples/v2/text/google-webfonts
let WebFontConfig = {
    active: function() {game.time.events.add(Phaser.Timer.SECOND,createText,this);},
    google:{
        families: ['Yeon Sung']
    }
}

//Player object
let mainPlayer;

//Player Movement / Keybinds
let playerLeft, playerRight, playerJump, playerAttack;

//Scores
let score, highScore;
if(localStorage.getItem('highestScore') == null){
    localStorage.setItem('highestScore', 0);
    highScore = 0;
} else {
    highScore = localStorage.getItem('highestScore');
}

//Speed
let difficulty_speed = -300;

//Music
let menuMusic, gameMusic;
