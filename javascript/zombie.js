class Zombie extends Human {
    constructor(x, y,direction) {
        super(x, y);
        this.direction = direction || 'right';
        this.width = 140;
        this.height = 170;
        this.life = 100;
        this.nearPlayer = false;
        this.spriteSheetJSON = [
            {elem: 'zombie-3', state: 'Attack', len: 6,},
            {elem: 'zombie-3', state: 'Dead', len: 8,},
            {elem: 'zombie-3', state: 'Hurt', len: 5,},
            {elem: 'zombie-3', state: 'Idle', len: 4,},
            {elem: 'zombie-3', state: 'Jump', len: 7,},
            {elem: 'zombie-3', state: 'Run', len: 10,},
//
            {elem: 'zombie-2', state: 'Attack', len: 6,},
            {elem: 'zombie-2', state: 'Dead', len: 8,},
            {elem: 'zombie-2', state: 'Hurt', len: 5,},
            {elem: 'zombie-2', state: 'Idle', len: 4,},
            {elem: 'zombie-2', state: 'Jump', len: 7,},
            {elem: 'zombie-2', state: 'Run', len: 10,},
            {elem: 'zombie-2', state: 'Walk', len: 6},
//
            {elem: 'zombie-1', state: 'Attack', len: 6,},
            {elem: 'zombie-1', state: 'Dead', len: 8,},
            {elem: 'zombie-1', state: 'Hurt', len: 5,},
            {elem: 'zombie-1', state: 'Idle', len: 4,},
            {elem: 'zombie-1', state: 'Jump', len: 7,},
            {elem: 'zombie-1', state: 'Run', len: 10,},
            {elem: 'zombie-1', state: 'Walk', len: 6},

        ];
        this.speed = 5;
        this.jumpFactor = 25;
        this.stateName = 'Walk';
        this.elem= 'zombie-1';
        this.xMovementSpeed = 0.1;
        this.jumpSpeed = this.jumpFactor;
        this.update('Walk','zombie-1');
    }


}