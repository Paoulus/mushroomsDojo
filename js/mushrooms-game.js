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
	robot = game.add.sprite(40,40,'idle','Idle (1).png');
	robot.scale.setTo(0.3,0.3);
	robot.animations.add('idle',Phaser.Animation.generateFrameNames('Idle \(',0,8,'\).png',0),20,true);

	robot.animations.play('idle');
}

function update(){

}