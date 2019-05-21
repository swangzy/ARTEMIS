// LASERS!
let lasers = [];

// dir is direction (1 when firing to the right and -1 for left)
function createLaser(x, y, dir, color) {
	let laser = {
		x: x,
		y: y,
		dir: dir,
		color: color,

		length: 0,
		// once laser achieves a certain length, it has to fade out
		fadeTimer: 0
	};

	lasers.push(laser);

	return laser;
}

function removeLaser(laser) {
	let i = lasers.indexOf(laser);

	if(i < 0) {
		return;
	}

	// remove it 
	lasers.splice(i, 1);
}

const LASER_GROW_RATE = 2700;
const LASER_MAX_LENGTH = 300;
const LASER_FADE_TIME = 0.5;

function updateLasers() {
	for(let i = 0; i < lasers.length; ++i) {
		let laser = lasers[i]; // pulls out a laser we want from the array

		if(laser.fadeTimer > 0) {
			laser.fadeTimer -= SEC_PER_FRAME;
			if(laser.fadeTimer <= 0) {
				removeLaser(laser);
			}
			continue; // starts the next part of the for loop (restart from top)
		} 

		// SEC_PER_FRAME = 1 / 60
		// Recall the frame updates sixty times per second

		laser.length += LASER_GROW_RATE * SEC_PER_FRAME; // makes laser grow at 300 px per second

		if(laser.length >= LASER_MAX_LENGTH) {
			laser.fadeTimer += LASER_FADE_TIME;
		}
	}
}

const LASER_IMAGES = {
	red: loadImage("assets/redwave.png"),
	blue: loadImage("assets/bluewave.png"),
	yellow: loadImage("assets/yellowwave.png")
};

function drawLasers(camera) {
	for(let i = 0; i < lasers.length; ++i) {
		let laser = lasers[i];

		// colour has to be "red", "blue", or "yellow"
		const image = LASER_IMAGES[laser.color];

		let prevAlpha = ctx.globalAlpha;

		// globalAlpha is to set transparency, where 1 is completely opaque and 0 is clear
		if(laser.fadeTimer > 0) {
			// starts opaque and gradually gets more transparent
			ctx.globalAlpha = laser.fadeTimer / LASER_FADE_TIME;
		}
		
		if(laser.dir < 0) {
			ctx.drawImage(image, laser.x - laser.length  - camera.x, laser.y - camera.y,
						  laser.length, image.height);
		} else {
			ctx.drawImage(image, laser.x - camera.x, laser.y - camera.y, laser.length, image.height);
		}

		ctx.globalAlpha = prevAlpha;
	}
}