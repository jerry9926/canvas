/**
 * Created by zhijie.huang on 2017/7/19.
 */
// const COLOR = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
const COLOR = [
    '#c21b0e',
    '#2f4554',
    '#9d9d9d'
];

class FlowParticle {
    constructor(id, width = 100, height = 100, count = 1000, arc = 0) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');

        this.canvasWidth = width;
        this.canvasHeight = height;

        // this.canvasWidth = width * Math.sqrt(1 / 8) * 2;
        // this.canvasHeight = height * Math.sqrt(1 / 8) * 2;

        this.canvasOriginX = - this.canvasWidth / 2;
        this.canvasOriginY = - this.canvasHeight / 2;

        this.ctx.translate(this.canvasWidth / 2,this.canvasHeight / 2);
        this.ctx.rotate(arc * Math.PI / 180);

        this.timer = null;
        this.ballCountMax = count;
        this.ballCount = count / 10;
        this.ballRadiusMin = 2;
        this.ballRadiusMax = 5;
        this.balls = [];
    }
    
    static getRandom(min, max) {
        return min + (Math.floor(Math.random() * 10 * max)) % (max - min + 1);
    }

    static getRandomFloat(min, max, figure) {
        const decimal = Math.floor(Math.random() * Math.pow(10, figure)) / Math.pow(10, figure);
        return min + (Math.floor(Math.random() * 10 * max)) % (max - min + 1) + decimal;
    }
    
    draw() {
        this.timer = setInterval(() => {
            this._update();
            this._render(this.ctx);
        }, 50);
    }
    
    _getBallCount() {
        if (this.ballCount !== this.ballCountMax) {
            setTimeout(() => {
                this.ballCount = Math.min(this.ballCountMax, this.ballCount + (this.ballCountMax / 100));
            }, 1500);
        }
        return this.ballCount;
    }

    _getBalls() {
        const count = Math.max(this._getBallCount() - this.balls.length, 0);
    //            console.log('-------');
    //            console.log('count = ' + count);
    
        for (let i = 0; i < count; i++) {
            let aBall = {
                x: this.canvasOriginX * 1.7,
                y: FlowParticle.getRandom(this.canvasOriginY + this.ballRadiusMax, this.canvasOriginY + this.canvasHeight - this.ballRadiusMax),
                vx: FlowParticle.getRandomFloat(3, 10, 2),
                vy: 0,
                radius: FlowParticle.getRandom(this.ballRadiusMin, this.ballRadiusMax),
                color: COLOR[FlowParticle.getRandom(0, 2)]
            };
            this.balls.push(aBall);
        }
    }

    _update() {
        this._getBalls();
        this._updateBall();
    }

    _updateBall() {
        let cnt = 0;
        this.balls.map((ball) => {
            ball.x += ball.vx;
            ball.y += ball.vy;
    
    //                if( ball.x + ball.radius > 0 && ball.x - ball.radius < canvasWidth ) {
            if( ball.x - ball.radius < this.canvasWidth ) {
                this.balls[cnt++] = ball
            }
        });
        while( this.balls.length > cnt ){
            this.balls.pop();
        }
    }

    _render(ctx) {
        // ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.clearRect(this.canvasOriginX * 1.5, this.canvasOriginY * 1.5,ctx.canvas.width  * 1.5, ctx.canvas.height * 1.5);
        this._renderBall(ctx);
    }

    _renderBall(ctx) {
        this.balls.map(function(ball) {
            ctx.fillStyle = ball.color;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        });
    }

    stop() {
        const that = this;
        console.log('stop called', that);
        clearInterval(that.timer);
        that.timer = null;
    }
    
}

