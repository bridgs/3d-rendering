define([
	'global',
	'Game'
], function(
	global,
	Game
) {
	return function() {
		//create the game
		var game = new Game();

		//kick off the game loop
		var prevTime = performance.now();
		function loop() {
			var time = performance.now();
			var framesPerSecond = global.FRAMES_PER_SECOND === null ? 60 : global.FRAMES_PER_SECOND;
			var t = global.TIME_SCALE * Math.min(3 / framesPerSecond, (time - prevTime) / 1000);
			if(global.CONSTANT_TIME_PER_FRAME) {
				t = global.TIME_SCALE / framesPerSecond;
			}
			game.update(t);
			game.render();
			prevTime = time;
			scheduleLoop();
		}
		function scheduleLoop() {
			if(global.FRAMES_PER_SECOND === null) {
				requestAnimationFrame(loop);
			}
			else {
				setTimeout(loop, 1000 / global.FRAMES_PER_SECOND);
			}
		}
		scheduleLoop();
	};
});