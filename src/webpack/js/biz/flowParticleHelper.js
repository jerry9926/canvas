import FlowParticle from './flowParticle';

class FlowParticleHelper {
    constructor(id, width, height) {
        this.id = id;
        this.width = width;
        this.height = height;

        this.create();
    }
    create() {
        console.log('FlowParticleHelper create called');
        let wrap = document.getElementById(this.id);
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.style.backgroundColor = '#dddddd';
        wrap.appendChild(canvas);
        console.info('canvas', canvas);
        console.info('wrap', wrap);

        const flow = new FlowParticle(canvas, this.width, this.height);

        flow.draw();

        this.flow = flow;
    }
    stop() {
        this.flow && this.flow.stop();
    }
    run() {
        this.flow && this.flow.draw();
    }
}

export default FlowParticleHelper;
