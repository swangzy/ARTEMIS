let monsters = [];

function createMonster(x, y) {
    let monster = {
        sprite: createSprite({
            image: loadImage("assets/monster.png"),

            frameWidth: 128,
            frameHeight: 128,

            anims: {
                idle: {
                    startFrame: 0,
                    length: 1,
                    frameTime: 1
                }
            }
        }),

        dx: 0,
        dy: 0
    };

    monster.sprite.x = x;
    monster.sprite.y = y;

    monsters.push(monster);

    return monster;
}

function removeMonster(monster) {
    let i = monsters.indexOf(monster);

    if(i < 0) {
        return;
    }

    removeSprite(monster.sprite);

    monsters.splice(i, 1);
}

const MONSTER_MOVE_ACCEL = 0.3;
const MONSTER_CHASE_RADIUS = 300;
const MONSTER_DRAG_FACTOR = 0.94;
const MONSTER_RADIUS = 64;
const MONSTER_REPLUSION_ACCEL = 5;

// ax, ay = center of first circle
// ar = radius of first circle
// bx, by = center of second circle
// br = radius of second circle
function collideCircles(ax, ay, ar, bx, by, br) {
    const distX = bx - ax;
    const distY = by - ay;

    // Use the same trick as above to avoid square root: compare
    // squared distances  
    return distX * distX + distY * distY < (ar + br) * (ar + br);
}

function updateMonsters() {
    for(let i = 0; i < monsters.length; ++i) {
        let monster = monsters[i];

        const distX = player.sprite.x - monster.sprite.x;
        const distY = player.sprite.y - monster.sprite.y;

        if(monster.sprite.x > player.sprite.x) {
            monster.sprite.flip = true;
        } else {
            monster.sprite.flip = false;
        }

        monster.sprite.x += monster.dx;
        monster.sprite.y += monster.dy;

        monster.dx *= MONSTER_DRAG_FACTOR;
        monster.dy *= MONSTER_DRAG_FACTOR;

        for(let j = 0; j < monsters.length; ++j) {
            if(i == j) {
                continue;
            }

            let otherMonster = monsters[j];

            if(collideCircles(monster.sprite.x, monster.sprite.y, MONSTER_RADIUS,
                              otherMonster.sprite.x, otherMonster.sprite.y, MONSTER_RADIUS)) {
                const distX = monster.sprite.x - otherMonster.sprite.x;
                const distY = monster.sprite.y - otherMonster.sprite.y;
                
                const angle = Math.atan2(distY, distX);

                const ddx = Math.cos(angle) * MONSTER_REPLUSION_ACCEL;
                const ddy = Math.sin(angle) * MONSTER_REPLUSION_ACCEL;

                monster.dx += ddx;
                monster.dy += ddy;

                otherMonster.dx -= ddx;
                otherMonster.dy -= ddy;
            }
        }

        if((distX * distX + distY * distY) > MONSTER_CHASE_RADIUS * MONSTER_CHASE_RADIUS) {
            const angle = Math.atan2(distY, distX);

            monster.dx += Math.cos(angle) * MONSTER_MOVE_ACCEL;
            monster.dy += Math.sin(angle) * MONSTER_MOVE_ACCEL;
        }
    }
}







