var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', 
	{ 
		preload: preload, 
		create: create, 
		update: update 
	});

function preload(){
	game.load.atlasJSONArray('idle','Assets/atlas_idle.png','Assets/atlas_idle.json');
	game.load.atlasJSONArray('run','Assets/atlas_run.png','Assets/atlas_run.json');
	game.load.atlasJSONArray('jump','Assets/atlas_jump.png','Assets/atlas_jump.json');
	game.load.atlasJSONArray('dead','Assets/atlas_dead.png','Assets/atlas_dead.json');
}

function create(){
	robot = game.add.sprite(150,20,'run','Run (1).png');
	robot.scale.setTo(0.1,0.1);

	game.physics.enable(robot,Phaser.Physics.ARCADE);

	//adding animations using frames obtained from the atlases
	//the generateFrameNames produces the names for the single frames; 
	//es: generateNames(Run(,1,7,)) produces Run(1),Run(2),Run(3), .... ; look into the docs for more details
	robot.animations.add('idle',Phaser.Animation.generateFrameNames('Idle \(',1,7,'\).png',0),20,true);
	robot.animations.add('run',Phaser.Animation.generateFrameNames('Run \(',1,7,'\).png',0),20,true);

	robot.body.bounce.y = 0.2;
	robot.body.setSize(10,10,5,16);
}

function update(){
	robot.body.velocity.x = 0;
	
	if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
		robot.animations.play('run');
		robot.body.velocity.x = 100;
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
		robot.body.velocity.x = -100;
	}
}