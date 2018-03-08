var game = new Phaser.Game(800, 480, Phaser.AUTO, 'gameDiv', 
	{ 
		preload: preload, 
		create: create, 
		update: update 
	});

function preload(){
	game.load.tilemap('level1','assets/mappe/tilemap600x20.json',null,Phaser.Tilemap.TILED_JSON);
	game.load.image('tiles-1','Assets/mappe/tiles-1.png');
	game.load.spritesheet('player','assets/spritesheets/dude.png',32,48);
<<<<<<< HEAD
    game.load.atlas('robot','assets/atlas_robot_basicPackaging.png','assets/atlas_robot_basicPackaging.json');
    //aggiungo lo spritesheet del checkpoint
	game.load.spritesheet('flag','assets/spritesheets/flag.png',32,64);
	
	game.load.spritesheet('slime','Assets/spritesheets/slime.png',44,34);
||||||| merged common ancestors
    game.load.atlas('robot','assets/atlas_robot_basicPackaging.png','assets/atlas_robot_basicPackaging.json');
    //aggiungo lo spritesheet del checkpoint
    game.load.spritesheet('flag','assets/spritesheets/flag.png',32,64);
=======
    	game.load.atlas('robot','Assets/atlas_robot_basicPackaging.png','Assets/atlas_robot_basicPackaging.json');
    	//aggiungo lo spritesheet del checkpoint
    	game.load.spritesheet('flag','Assets/spritesheets/flag.png',32,64);
>>>>>>> master
}
	
var map;
var player;
var layer;
var cursors;
var jumpButton;
var facing;
var jumpTimer=0;

//variabili che memorizzano la posizione del salvataggio
var saveX = 0;
var saveY = 400;

//gruppo che conterra gli oggetti dell'object layer "Checkpoints"
var checkpoints;

var enemies;


function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	//game.physics.enable(robot,Phaser.Physics.ARCADE);
	
	map = game.add.tilemap('level1');
	map.addTilesetImage('tiles-1');
	
	map.setCollisionByExclusion([ 13, 14, 15, 16, 17, 46, 47, 48, 49, 50, 51 ]);
	layer = map.createLayer('Livello tile 1');

	layer.resizeWorld();

	game.physics.arcade.gravity.y = 384;
	player = game.add.sprite(32,32,'robot','Idle (1).png');
	game.physics.enable(player,Phaser.Physics.ARCADE,true);

	//player.body.bounce.y = 0.2;
	player.body.colliderWorldBounds = true;
	//player.body.checkCollision.up = false;
	//player.body.checkCollision.down = false;

	player.animations.add('run', Phaser.Animation.generateFrameNames('Run (',1,8,').png'), 10, true);
	player.animations.add('idle', Phaser.Animation.generateFrameNames('Idle (',1,8,').png'), 10, true);
	player.animations.add('jump', Phaser.Animation.generateFrameNames('Jump (',1,8,').png'), 10, true);

	player.anchor.setTo(0.5,0.5);

    player.scale.x = 0.28;
    player.scale.y = 0.28;

	game.camera.follow(player);

	cursors = game.input.keyboard.createCursorKeys();

	jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	//creo il gruppo di oggetti e faccio in modo che abbiano un corpo
	checkpoints = game.add.group();
	checkpoints.enableBody = true;

	//createFromObjects è una funzione che permette di prendere un livello di tiled di tipo Object Layer e inserire gli oggetti nel gruppo da noi creato
	//parametri:	nome dell'Object Layer su tiled
	//						id dell'oggetto (lo si trova nel file .json)
	//						nome dello spritesheet utilizzato
	//						numero del frame da utilizzare inizialmente
	//						booleano che ci indica se l'oggetto esiste oppure no (se è visibile?)
	//						booleano che ci indica se l'oggetto si distrugge quando esce dal campo di ripresa della camera
	//						nome del gruppo in cui inserire questi oggetti (checkpoints in questo caso)
	map.createFromObjects('Checkpoints',69,'flag',0,true,true,checkpoints);

	//forEach che modifica gli attributi di ogni oggetto presente nel gruppo checkpoints
	checkpoints.forEach(function(checkpoint){
		checkpoint.body.immovable = true;

		//gli aggiungiamo l'animazione della bandiera che sale,
		checkpoint.animations.add('save', [0,1,2,3,4], 5, false);

		//la gravità non influisce sulla bandiera (altrimenti cadrebbe nel vuoto!)
		checkpoint.body.allowGravity = false;

		//booleano per controllare che quel checkpoint sia già stato utilizzato (per evitare che l'animazione si resetti ogni volta che il nostro giocatore ci passa sopra)
		checkpoint.used = false;

	},this);

	game.physics.enable(checkpoints,Phaser.Physics.ARCADE);
<<<<<<< HEAD

	enemies = game.add.group();
	enemies.enableBody=true;

	map.createFromObjects('Enemies',75,'slime',1,true,false,enemies);


	enemies.forEach(function(enemy){	

		enemy.body.immovable = true;
		enemy.animations.add('enemyMovement',[0,1],4,true);
		enemy.animations.play('enemyMovement');

	},this);

	game.physics.enable(enemies,Phaser.Physics.ARCADE);
	
||||||| merged common ancestors
	
=======

>>>>>>> master
}

var no_key = false; //true => non ci sono cambi di animzione direzionale
var jumped = false; //true => è in corso l'animazione di salto
function update(){

	game.physics.arcade.collide(player, layer);

	player.body.velocity.x = 0;
	
	if(no_key && jumped && player.body.velocity.y == 0) {
		player.animations.stop();
		player.frame = 8;
		console.log("jump ended");
		player.animations.play('idle');
		facing = 'idle';  
	}
	
	if (cursors.left.isDown)
    	{
			player.body.velocity.x = -150;
		if (facing != 'left')
		{
		    player.animations.play('run');
		    facing = 'left';
            if(player.scale.x > 0){
		      player.scale.x *= -1;
            }
		}
	}
	else if (cursors.right.isDown)
	{
		player.body.velocity.x = 150;

		if (facing != 'right')
		{
		    player.animations.play('run');
		    facing = 'right';
		    if(player.scale.x < 0){
              player.scale.x *= -1;
            }
		}
	} else {
		no_key = true;
		if (facing != 'idle')
		{
		    player.animations.play('idle');

		    facing = 'idle';
		}
	}


	if (jumpButton.isDown && player.body.velocity.y == 0 && game.time.now > jumpTimer)
	{
		player.body.velocity.y = -208;
		jumpTimer = game.time.now + 750;
		player.animations.play('jump');
        	jumped = true;
	} else if(player.body.velocity.y ==0) jumped = false; //se non ho salto e non è in corso un salto

	//overlap ci permette di controllare quando il giocatore si trova sopra un checkpoints
	//il parametro saveGame è la funzione che viene svolta quando uno dei checkpoint viene attraversato dal giocatore
	game.physics.arcade.overlap(player,checkpoints,saveGame,null,this);

	//controllo nel caso il giocatore cade fuori dalla mappa. Useremo i checkpoints 
	if (player.y-(player.height*2)>game.world.height){

		//posizioniamo il giocatore nella posizione dell'ultimo checkpoint 
		player.x= saveX;
		player.y = saveY;

		//posizioniamo la camera nella posizione del giocatore (non serve?)
		game.camera.x = player.x;
	}
	game.physics.arcade.collide(enemies, layer);

	game.physics.arcade.collide(enemies,player,killPlayer);


}



//funzione che serve per salvare quando si attraversa un checkpoint
function saveGame(player,checkpoint){

	//controllo che il checkpint non sia già stato usato
	if(!checkpoint.used){
		
		//faccio partire l'animazione
		checkpoint.animations.play('save');

		//salvo le coordinate
		saveX = checkpoint.x;
		saveY = checkpoint.y;

		//dico che questo checkpoint è stato usato
		checkpoint.used = true;
	}

	
	
}

function killPlayer(player,enemy){


	player.x = saveX;
	player.y = saveY;
}

	


