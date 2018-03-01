var game = new Phaser.Game(800, 480, Phaser.AUTO, 'gameDiv', 
	{ 
		preload: preload, 
		create: create, 
		update: update 
	});

function preload(){
	game.load.tilemap('level1','assets/mappe/tilemap600x20.json',null,Phaser.Tilemap.TILED_JSON);
	game.load.image('tiles-1','assets/mappe/tiles-1.png');
	game.load.spritesheet('player','assets/spritesheets/dude.png',32,48);

}
	
var map;
var player;
var layer;
var cursors;
var jumpButton;
var facing;
var jumpTimer=0;



function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	//game.physics.enable(robot,Phaser.Physics.ARCADE);
	
	map = game.add.tilemap('level1');
	map.addTilesetImage('tiles-1');
	
	map.setCollisionByExclusion([ 13, 14, 15, 16, 17, 46, 47, 48, 49, 50, 51 ]);
	layer = map.createLayer('Livello tile 1');

	layer.resizeWorld();

	game.physics.arcade.gravity.y = 384;
	player = game.add.sprite(32,32,'player');
	game.physics.enable(player,Phaser.Physics.ARCADE);

	//player.body.bounce.y = 0.2;
	player.body.colliderWorldBounds = true;
	//player.body.checkCollision.up = false;
	//player.body.checkCollision.down = false;

	player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();

    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
}

function update(){

	game.physics.arcade.collide(player, layer);

	player.body.velocity.x = 0;

	if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }


    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -208;
        jumpTimer = game.time.now + 750;
    }
	
}