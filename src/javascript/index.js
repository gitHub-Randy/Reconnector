
    async function  stopNginx() {
        console.log("HEEEE");
           let nginxStopped = await fetch('http://10.249.154.18:8080/api/nginx/stop');
           let resp = await nginxStopped.json();
           console.log(resp.result);
           // return resp.result;
       }
export{stopNginx}




//    async function startNginx() {
//     console.log("HEEEE");
//        let nginxStopped = await fetch('http://10.249.154.18:8080/api/nginx/start');
//        let resp = await nginxStopped.json();
//        console.log(resp.result);
//        // return resp.result;
//    }

//    async function startFFmpeg() {
//     console.log("HEEEE");
//        let nginxStopped = await fetch('http://10.249.154.18:8080/api/nginx/ffmpeg');
//        let resp = await nginxStopped.json();
//        console.log(resp.result);
//        // return resp.result;
//    }
