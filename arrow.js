let arrows = [];

const ARROW_MOVE_SPEED = 5;

const ARROW_RECT = {
    x: -20,
    y: -20,
    w: 20,
    h: 20
};

function createArrow(x, y, angle) {
    let arrow = {
        x: x,
        y: y,
        angle: angle,

        dx: Math.cos(angle) * ARROW_MOVE_SPEED,
        dy: Math.sin(angle) * ARROW_MOVE_SPEED
    };

    arrows.push(arrow);

    return arrow;
}

function removeArrow(arrow) {
    let i = arrows.indexOf(arrow);

    if(i < 0) {
        return;
    }

    arrows.splice(i, 1);
}

function updateArrows() {
    for(let i = 0; i < arrows.length; ++i) {
        let arrow = arrows[i];

        arrow.x += arrow.dx;
        arrow.y += arrow.dy;

        if(collideTileMap(arrow.x + ARROW_RECT.x, arrow.y + ARROW_RECT.y,
                          ARROW_RECT.w, ARROW_RECT.h)) {
            removeArrow(arrow);
        }
    }
}

const ARROW_IMAGE = loadImage("assets/arrow.png");

function drawArrows(camera) {
    for(let i = 0; i < arrows.length; ++i) {
        let arrow = arrows[i];

        ctx.save();

        ctx.translate(arrow.x - camera.x, arrow.y - camera.y);
        ctx.rotate(arrow.angle);    

        ctx.drawImage(ARROW_IMAGE, -ARROW_IMAGE.width / 2, -ARROW_IMAGE.height / 2);

        ctx.restore();
    }
}





