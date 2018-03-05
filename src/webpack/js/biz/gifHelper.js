/**
 * Created by zhijie.huang on 2017/8/2.
 */
var GifHelper = function() {
    var gh = this;

    gh.encoder = new GIFEncoder();

    gh.init = function() {
        console.log('encoder start');
        gh.encoder.setRepeat(0); //auto-loop
        gh.encoder.setDelay(50);
        gh.encoder.start();
    };

    gh.animate = function(ctx) {
        console.log('encoder addFrame');
        gh.encoder.addFrame(ctx);
    };

    gh.finish = function() {
        console.log('encoder finish');
        gh.encoder.finish();
//            var imageData = 'data:image/gif;base64,'+encode64(encoder.stream().getData());
//            return imageData
    };

    gh.getImage = function() {
        return 'data:image/gif;base64,'+encode64(gh.encoder.stream().getData())
    };

//        return gifHelper;
}