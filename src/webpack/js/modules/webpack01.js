import FlowParticleHelper from '../biz/flowParticleHelper';

let flowParticleHelper;
window.onload = function() {
    // draw();
    flowParticleHelper = new FlowParticleHelper('canvasWrap', 500, 100);

    window.stop = function() {
        flowParticleHelper && flowParticleHelper.stop();
    }

    window.run = function() {
        flowParticleHelper && flowParticleHelper.run();
    }
};