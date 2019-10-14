
import fetch from 'isomorphic-fetch';

const puppeteer = require('puppeteer');
// stream should be running to run this test
describe("Error Image ", () => {
    test("Error Image  visible", async () => {
        let browser = await puppeteer.launch({
            headless: false,
            executablePath: 'C://Program Files (x86)//Google//Chrome//Application//chrome.exe'
        });
        let page = await browser.newPage();
        await page.goto('file:///C:/Users/Randy.Anft/Desktop/Repos/Reconnector/index.html'); //  TODO: file naar html page aanapassen
        let nginxStopped = await fetch('http://10.249.154.18:8080/api/nginx/stop');
        let resp = await nginxStopped.json();
        await page.waitForSelector('img', {
            visible: true,
        });
        browser.close()
    },16000);
  

        test("Error Image  not visible then visible", async () => {
            let browser = await puppeteer.launch({
                headless: false,

                executablePath: 'C://Program Files (x86)//Google//Chrome//Application//chrome.exe'
            });
            let page = await browser.newPage();
            await page.goto('file:///C:/Users/Randy.Anft/Desktop/Repos/Reconnector/index.html'); //  TODO: file naar html page aanapassen
            //nginx starten TODO

            await page.waitForSelector('video', {
                visible: true,
            });
            await page.waitForSelector('img', {
                visible: false,
            });

            let nginxStopped = await fetch('http://10.249.154.18:8080/api/nginx/stop');
            let resp = await nginxStopped.json();
            await page.waitForSelector('video', {
                visible: false,
            });
            await page.waitForSelector('img', {
                visible: true,
            });
            browser.close()
        }, 16000);


    test("Error Image  not visible then visible after that not", async (done) => {
        try {
            console.log("init")
            let browser = await puppeteer.launch({
                headless: false,
                executablePath: 'C://Program Files (x86)//Google//Chrome//Application//chrome.exe'
            });
            let page = await browser.newPage();
            await page.goto('file:///C:/Users/Randy.Anft/Desktop/Repos/Reconnector/index.html'); //  TODO: file naar html page aanapassen
            console.log("WENT TO PAGE AWAITING VID/IMG")
            // player visible / image not
            await page.waitForSelector('video', {
                visible: true,
            });
            await page.waitForSelector('img', {
                visible: false,
            });
            // stopping nginx
            await fetch('http://10.249.154.18:8080/api/nginx/stop');
            // image visible video not
            await page.waitForSelector('video', {
                visible: false,
            });
            await page.waitForSelector('img', {
                visible: true,
            });
            setTimeout( async () =>{await fetch('http://10.249.154.18:8080/api/nginx/start');},3000);
            setTimeout( async () =>{try{
                await fetch('http://10.249.154.18:8080/api/ffmpeg/start');
            }catch(err){
                
            }
            },3000);
            // video visible image not
            await page.waitForSelector('#stream', {
                visible: true,
            });
            await page.waitForSelector('#errorImage', {
                visible: false,
            });
            browser.close();
            console.log("cleaning up");
            await fetch('http://10.249.154.18:8080/api/nginx/stop');
            setTimeout( async () =>{await fetch('http://10.249.154.18:8080/api/nginx/start');},3000);


            done();
        } catch (err) {
            console.log(err);
        }
    },20000);
    ;
});
