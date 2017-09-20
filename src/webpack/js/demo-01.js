import FlowParticleHelper from './flowParticleHelper';

let flowParticleHelper;
window.onload = function() {
    // draw();

    alert(0);

    flowParticleHelper = new FlowParticleHelper('canvasWrap', 500, 100);
};
function draw() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    context.beginPath();
    context.fillStyle = '#3e96b9';
    context.fillRect(0, 0, 50, 50);

    context.beginPath();
    context.fillStyle = '#ff635e';
    context.fillRect(250, 250, 50, 50);

}
function stop() {
    // flowParticle && flowParticle.stop();
}