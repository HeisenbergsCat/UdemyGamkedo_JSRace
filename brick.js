function Brick(posx, posy, type) {
    this.BRICK_SIDE = 50;
    this.pos = new Vector(posx, posy);
    this.hitpoints = 1;


    this.type = type;
    this.alive = true;

    switch (type) {
        case 0:
            this.col = "DimGray";
            this.hitpoints = 3;
            break;

        case 1:
            this.col = "Red";
            this.hitpoints = 4;
            break;


        case 2:
            this.col = "DarkTurquoise";
            this.hitpoints = 1;
            break;


        default:
            this.col = "White"
            this.hitpoints = 1;
    }

    this.takeDamage = function() {
        this.hitpoints -= 1;

        if (this.hitpoints <= 0) {
            this.alive = false;
        }
    }

    this.getSize = function() {
        return this.BRICK_SIDE;
    }

    this.render = function() {
        if (this.alive) {
            drawRectangle(this.pos.X, this.pos.Y, this.BRICK_SIDE - 5, this.BRICK_SIDE - 5, this.col);
        }

    }

    this.collisionY = function(collider) {
        if (collider.pos.Y + collider.radius > this.pos.Y &&
            collider.pos.Y - collider.radius < this.pos.Y + this.BRICK_SIDE) {
            return true;
        } else {
            return false;
        }
    }

    this.collisionX = function(collider) {
        if (collider.pos.X + collider.radius > this.pos.X &&
            collider.pos.X - collider.radius < this.pos.X + this.BRICK_SIDE) {
            return true;
        } else {
            return false;
        }
    }

    this.collisionCheck = function(collider) {
        if (this.alive) {
            if (this.collisionX(collider) && this.collisionY(collider)) {
                return true;
            } else {
                return false;
            }
        }

    }

}