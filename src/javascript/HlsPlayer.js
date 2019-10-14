'use strict'

import Hls from'../../node_modules/hls.js'
let video;
let streamUrl;
export default class HlsPlayer {
    constructor(url) {
        video = document.getElementById('video');
        streamUrl = url;
        console.log("construct")
        this.main();
    }

    main() {
        console.log("main")

        if (this.checkHlsSupport) {
            this.hls = new Hls();
            this.InsertSource(streamUrl);
            // this.hls.addEventListener(Hls.Events.ERROR, eventManager());
            this.hls.addEventListener(Hls.Events.MANIFEST_PARSED, function (event, data) {
                console.log('test')
                console.log("manifest loaded, found " + data.levels.length + " quality level");
                video.play();
            });


        } else {
            if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = streamUrl;
                video.
                    video.addEventListener('loadedmetadata', function () {
                        video.play();
                    });
            }
        }
    }
    test(){
        this.hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            console.log("manifest loaded, found " + data.levels.length + " quality level");
            video.play();
        });
    }

    eventManager() {
        
        
        this.hls.on(Hls.Events.ERROR, function (event, data) {
            console.log("AM NOW HERE")
            console.log(data);
            switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                    // try to recover network error
                    console.log("fatal network error encountered, try to recover");
                    this.hls.startLoad();
                    break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                    console.log("fatal media error encountered, try to recover");
                    hls.recoverMediaError();
                    console.log("fatal media error encountered, try to recover");
                    break;
                default:
                    // cannot recover
                    console.log("Destroying ");
                    this.hls.destroy();
                    break;
            }
        });
    }

    checkHlsSupport() {
        if (Hls.isSupported()) {
            return true;
        }
        return false;
    }

    InsertSource(url) {
        this.hls.loadSource(url);
        this.hls.attachMedia(video);
    }




}
