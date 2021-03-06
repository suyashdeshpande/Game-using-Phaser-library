  
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('devil','assets/baddie.png',32,32);

}

var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText,healthText;
var devilgroup;
var baddie1,baddie2,baddie3,baddie4,baddie5,baddie6,baddie7;
var health=1000;

function create() {
    
    

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Finally some stars to collect
    stars = game.add.group();
    devilgroup=game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;
    devilgroup.enableBody=true;
       baddie1 = devilgroup.create(50, 0, 'devil');
   baddie2 = devilgroup.create(175, 25, 'devil');
   baddie3 = devilgroup.create(280, 120, 'devil');
   baddie4 = devilgroup.create(350, 150, 'devil');
   baddie5 = devilgroup.create(450, 100, 'devil');
   baddie6 = devilgroup.create(565, 150, 'devil');
   baddie7 = devilgroup.create(660, 120, 'devil');
   baddie1.body.gravity.y = 110;
   baddie2.body.gravity.y = 80;
   baddie3.body.gravity.y = 105;
   baddie4.body.gravity.y = 95;
   baddie5.body.gravity.y = 100;
   baddie6.body.gravity.y = 110;
   baddie7.body.gravity.y = 90;
   baddie1.body.bounce.y = 1;
   baddie2.body.bounce.y = 1;      
   baddie3.body.bounce.y = 1;
   baddie4.body.bounce.y = 1;
   baddie5.body.bounce.y = 1;
   baddie6.body.bounce.y = 1;
   baddie7.body.bounce.y = 1;
   //Our baddie animations, walking left and right
   baddie1.animations.add('left', [0,1], 10, true);
   baddie2.animations.add('left', [0,1], 10, true);
   baddie3.animations.add('left', [0,1], 10, true);
   baddie1.animations.add('right', [1,2], 10, true);
   baddie2.animations.add('right', [1,2], 10, true);
   baddie3.animations.add('right', [1,2], 10, true);

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    /*for(var i=0;i<10;i++){
        
        var devil=devilgroup.create(i*35,0,'devil');
        devil.frame=3;
        devil.body.gravity.y=500;
        devil.body.bounce.y=1;
    }*/
    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    
    healthText = game.add.text(640, 16, 'Health : 100', { fontsize: '32px', fill: '#010'});
    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    
}

function update() {

    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(devilgroup,platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player,devilgroup,shit,null,this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }
    

}

function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;

}
       
function shit(player){
    health-=10;
    healthText.text='Health: ' + health/20;
    if(health==0)
        {
            player.kill();
             game.add.text(275, 250, 'YOU LOST...', {fontsize: '100px', fill: '#000'})
        }
}