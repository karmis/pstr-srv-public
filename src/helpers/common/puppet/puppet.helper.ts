// import * as puppeteer from "puppeteer";
// import {Browser, Page, Permission} from "puppeteer";
// import * as fs from 'fs';
// import * as path from 'path';
// import {User} from "../../../db/models/User";
// import {Post} from "../../../db/models/Post";
//
// export type CrawlerSetups = {
//     // name: string,
//     user: User,
//     post: Post
// }
//
// export type CrawlerOptions = CrawlerSetups & {
//     // dirs: {
//     //     screenshots: string,
//     //     attachments: string,
//     //     cookies: string
//     // }
// }
//
// export class PuppetHelper {
//     static CrawlerName: string = 'empty-puppet-crawler'
//     protected browser: Browser
//     protected options: CrawlerOptions;
//     // private _defaultOptions: CrawlerOptions = {
//     //     name: '',
//     //     // dirs: {
//     //     //     cookies: 'cookies',
//     //     //     attachments: 'attachments',
//     //     //     screenshots: 'screenshots'
//     //     // }
//     // }
//
//     constructor(setups: CrawlerSetups) {
//         this.options =
//     }
//
//     public open = async (url: string, permissions: Permission[] = ['clipboard-read', 'clipboard-write']) => {
//         const _page = await this.browser.newPage();
//         // request interceptor
//         // await _page.setRequestInterception(true)
//         // page.on('request', (request) => {
//         //     if (request.resourceType() === 'image') request.abort()
//         //     else request.continue()
//         // })
//
//         _page.setDefaultTimeout(60000);
//         _page.setDefaultNavigationTimeout(60000);
//         try {
//             _page.once('dialog', async dialog => {
//                 console.log(dialog.message());
//                 await dialog.dismiss();
//             });
//         } catch (e) {
//             console.error('Dialog handler error: ', e);
//         }
//
//         // await this.permissions(url);
//         await _page.setViewport({width: 1280, height: 1024});
//         await _page.goto(url, {waitUntil: 'domcontentloaded'});
//         const session = await _page.target().createCDPSession();
//         await session.send('Page.enable');
//         await session.send('Page.setWebLifecycleState', {state: 'active'});
//         const context = this.browser.defaultBrowserContext();
//         await context.overridePermissions(url, ["geolocation", "notifications"]);
//
//         return _page;
//     }
//
//     public connect = async (): Promise<Browser> => {
//         try {
//             this.browser =  await puppeteer.launch({
//                 headless: true,
//                 channel: 'chrome-beta',
//                 slowMo: 0,
//                 ignoreHTTPSErrors: true,
//                 args: [
//                     `--window-size=1920,1240`,
//                     `--disable-background-timer-throttling`,
//                     `--disable-backgrounding-occluded-windows`,
//                     `--disable-renderer-backgrounding`,
//
//                 ],
//                 defaultViewport: {
//                     width: 1920,
//                     height: 1240
//                 },
//                 timeout: 0,
//                 devtools: false
//             });
//
//             return this.browser;
//         } catch (e) {
//             console.error('Failed to connect to docker container, is it running?');
//             throw e;
//         }
//     }
//
//     public permissions = async (
//         url: string,
//         permissions: Permission[] = ['clipboard-read', 'clipboard-write']
//     ) => {
//         await this.browser.defaultBrowserContext().overridePermissions(url, permissions);
//     }
//
//     public screenshot = async (page: Page) => {
//         await page.screenshot({
//             path: this.getScreenshotsPath() + '/' + 'userid.crawlerid.screenshot.png',
//         });
//
//         return this.getScreenshotsPath() + '/' + 'userid.crawlerid.screenshot.png'
//     }
//
//     public close = async () => {
//         await this.browser.close();
//     }
//
//     public init = async (): Promise<Browser> => {
//         const dir = path.relative(cwd, './files/'+ user.id +'/'+ crawler.name +'/' + post.id + '/');
//         // create paths/folders
//         if (this.options.dirs) {
//             Object.values(this.options.dirs).forEach((fName: string) => {
//                 const f = this.getFilesPath(this.options.dirs?.[fName]);
//                 if (!fs.existsSync(f)) {
//                     fs.mkdirSync(f, {recursive: true});
//                 }
//             });
//         }
//
//         return await this.connect();
//     }
//
//     protected getFilesPath(fName: string): string {
//         const cwd: string = process.cwd();
//         return path.relative(cwd, './files/' + this.options.name + '/' + fName + '/')
//     }
//
//     protected getCookiesFilePath() {
//         return this.getFilesPath(this.options.dirs?.cookies??'cookies') + '/userid.crawlerid.orange.cookies.json'
//     }
//
//     protected getScreenshotsPath() {
//         return this.getFilesPath(this.options.dirs?.screenshots??'screenshots');
//     }
//
//     // Recursive function to get files
//     public static getFiles(dir, files = []) {
//         // Get an array of all files and directories in the passed directory using fs.readdirSync
//         const fileList = fs.readdirSync(dir)
//         // Create the full path of the file/directory by concatenating the passed directory and file/directory name
//         for (const file of fileList) {
//             const name = `${dir}/${file}`
//             // Check if the current file/directory is a directory using fs.statSync
//             if (fs.statSync(name).isDirectory()) {
//                 // If it is a directory, recursively call the getFiles function with the directory path and the files array
//                 PuppetHelper.getFiles(name, files)
//             } else {
//                 // If it is a file, push the full path to the files array
//                 files.push(name)
//             }
//         }
//         return files
//     }
// }



// import {Post} from "../../../db/models/Post";
// import {Crawler} from "../../../db/models/Crawler";
// import {User} from "../../../db/models/User";
// import path from "path";
// import fs from "fs";
// import BeeQueue from "bee-queue";

// public async makePosts(post: Post, crawler: Crawler, user: User, userId: number): Promise<void> {
//     // const name = 'auto';
//     const name = 'investor';
//     const cwd: string = process.cwd();
// const dir = path.relative(cwd, './files/' + crawler.name + '/' + name + '/');
// const urls.txt = this.shuffle(await fs.readFileSync(cwd + '/' + dir + '/urls.txt.txt', 'utf8').split('\r\n'));
// post.metadata.images = urls.txt;
// await this.init();
// const q = new Queue('posts');
// let f: number = 0;

// const queue = new BeeQueue(name);
// queue.
// const job = queue.createJob({
//     post: post,
//     crawler: crawler,
//     user: user,
//     userId: userId
// });
// job
//     .timeout(3000)
//     // .retries(2)
//     .save()
//     .then((job) => {
//         console.log('Job enqueued. JobId: ', job.id)
//         // job enqueued, job.id populated
//     });


// const jobs = [];
//
// for (let goalUrl of urls.txt) {
//     if (goalUrl) {
        // const job = await queue.createJob({
        //     post: post,
        //     crawler: crawler,
        //     user: user,
        //     userId: userId,
        //     goalUrl: goalUrl
        // });
        // job
        // // job.on('succeeded', (result) => {
        // //     console.log(`Job ${job.id} succeeded with result: ${result}`);
        // // });
        //
        // job
        //
        // job
        //
        // job
        // // job.timeout(3000);
        // jobs.push(job);
//     }
// }
//
// await queue.saveAll(jobs);
//
// queue.process(1, async (job, done) => {
//     console.log('------------STARTED------------');
//     console.log(job.data.goalUrl);
//     // job.reportProgress(0);
//     // await this.helper.postByGoalUrl(job, post, job.data.goalUrl);
//     // job.reportProgress(100);
//     // job.reportProgress('FINISHED');
//     console.log(`------------ FINISHED FOR ${job.data.goalUrl} ------------`);
//     return done(null, {job: job});
//
// });
// }
