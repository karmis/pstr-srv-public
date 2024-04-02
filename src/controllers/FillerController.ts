import {User} from "../db/models/User";
import {FbCrawlerJobType, FbPuppetCrawler} from "../crawlers/fb/puppet/crawler";
import BeeQueue, {Job} from "bee-queue";
import {CommonHelper} from "../crawlers/common.helper";
import {NextFunction} from "express";
import {randomInt} from "node:crypto";
// const BeeQueue = require('bee-queue');

// const globby = require('globby');
// import * as globby from "globby";
// const  = require('globby');


export type JobSuccessResponseType = {
    job: Job<FbCrawlerJobType>
}

// https://www.facebook.com/groups/1397374790579544/my_pending_content - reviewing
// https://www.facebook.com/groups/1853734291570407 - cant attach photos
// https://www.facebook.com/groups/arenda.kvartir.batumi/ - has not pending posts (they are there)

export class FillerController {

    public static test2 = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        // user
        const user: User = (await User.findOrCreate({
            where: {
                id: 1, name: 'test_name'
            }
        }))[0];

        const queue = new BeeQueue('posterer-2-' + randomInt(0, 99) + CommonHelper.randomIntFromInterval(0, 9999), {
            // activateDelayedJobs: true,
            // delayedDebounce: 15000,
            removeOnSuccess: true, removeOnFailure: true, // sendEvents: true,
        });
        // queue.on('job progress', (jobId, progress) => {
        //     console.log('%c [id: ' + jobId + ']: ' + progress, CONSOLE_STYLES.progress_body);
        // });
        const helper = new CommonHelper();

        // estate
        const p1 = await helper.fetch(user.id, 314);
        const urls1 = await helper.getUrls(user.id, 314, 'all');

        // investor hotel
        // const p2 = await helper.fetch(user.id, 312);
        // const urls2 = await helper.getUrls(user.id, 312, 'all');


        // const p3 = await helper.fetch(user.id, 313);
        // const p4 = await helper.fetch(user.id, 315);
        // const urls4 = await helper.getUrls(user.id, 315, 'auto');

        // investor china
        const p5 = await helper.fetch(user.id, 316);
        const urls5 = await helper.getUrls(user.id, 316, 'all');

        // const urls = ['https://www.facebook.com/groups/1853734291570407']; // is dead group
        const posts = [
            p1, // rooms
            // p5, // investor to China
            // p2, // investor to hotel
            // p3, // chemical
            // p4, // auto
            p5
        ];
        const urls = [
            urls1,
            urls5,
            // urls1,
            // urls2,
        ]
        const credU0 = process.env.FB_U_0!
        const credU1 = process.env.FB_U_1!
        const credU2 = process.env.FB_U_2!
        const credP0 = process.env.FB_P_0!
        const credP1 = process.env.FB_P_1!
        const credP2 = process.env.FB_P_2!

        const credentials = [
            {u: credU0, p: credP0},
            {u: credU1, p: credP1},
            {u: credU2, p: credP2},
        ];

        const jobs = [];
        for (const i of (new Array<number>(10))) {
            console.log('---- + ' + i + ' + ----');
            posts.forEach((post, postIndex) => {
                for (const url of urls[postIndex]) {
                    if (url?.trim()) {
                        const job = queue.createJob({
                            post: post,
                            user: user,
                            url: url,
                            credential: credentials[randomInt(0, Object.keys(credentials).length-1)],
                            // goal: goal,
                        }).retries(2)
                        job.on('succeeded', (result) => {
                            var d = new Date().toISOString().replace(/T/, ' ').      // replace T with a space
                                replace(/\..+/, '');
                            console.log('SUCCESS: [date: ' + d + ' url:' + job.data.url + ' user: ' + job.data.credential.u + ' post: ' + job.data.post.id + ' job: ' + job.id + ']: successful!', result);
                        });
                        job.on('retrying', (err) => {
                            var d = new Date().toISOString().replace(/T/, ' ').      // replace T with a space
                                replace(/\..+/, '');
                            console.log('retrying: [date: ' + d + ' url:' + job.data.url + ' user: ' + job.data.credential.u + ' post: ' + job.data.post.id + ']: failed with error "' + err.message + '" but is being retried!', err);
                        });
                        job.on('failed', (err) => {
                            var d = new Date().toISOString().replace(/T/, ' ').      // replace T with a space
                                replace(/\..+/, '');
                            console.log('failed: [date: ' + d + ' url:' + job.data.url + ' user: ' + job.data.credential.u + ' post: ' + job.data.post.id + ']: failed with error "' + err.message + '"', err);
                        });
                        job.on('progress', (progress) => {
                            var d = new Date().toISOString().replace(/T/, ' ').      // replace T with a space
                                replace(/\..+/, '');
                            console.log('[date: ' + d + ' url:' + job.data.url + ' user: ' + job.data.credential.u + ' post: ' + job.data.post.id + ']: ' + progress);
                        });

                        // process.on('uncaughtException', async () => {
                        //     // Queue#close is idempotent - no need to guard against duplicate calls.
                        //     try {
                        //         console.log('%c Uncaught Exception!', CONSOLE_STYLES.failed);
                        //         await queue.close(10000);
                        //     } catch (err) {
                        //         console.log('%c bee-queue failed to shut down gracefully ((' + err.message, CONSOLE_STYLES.failed);
                        //     }
                        //     process.exit(1);
                        // });

                        jobs.push(job);
                    }
                }
            })
        }


        // queue.on('job succeeded', (jobId, result) => {
        //     // const job = queue.getJob(jobId);
        //     console.log(`Job ${jobId} succeeded finished`); // ${result}
        // });
        await queue.saveAll(jobs);
        queue.setMaxListeners(10);
        queue.process(2, async (job: Job<FbCrawlerJobType>, done: BeeQueue.DoneCallback<any>) => {
            const crawler: FbPuppetCrawler = (new FbPuppetCrawler({user: job.data.user, post: job.data.post}));
            // const crawler = job.data.crawler;
            // job.reportProgress('Crawler initiated');
            await crawler.launch(job);
            // job.reportProgress('Browser started');
            // await crawler.goto('https://www.facebook.com/groups/895288600951587/');
            await crawler.goto(job.data.url);
            job.reportProgress('Page ' + job.data.url + ' opened');
            let isLoggedIn = await crawler.isLoggedIn(job);
            job.reportProgress('Check is loggedIn: ' + isLoggedIn);
            if (!isLoggedIn) {
                isLoggedIn = await crawler.login(job);
                job.reportProgress('Check is loggedIn after login: ' + isLoggedIn);
            }
            if (!isLoggedIn) {
                await crawler.close();
                return done({
                    name: 'Unauthorized!', message: 'Unauthorized!', stack: 'context'
                }, {job: job});
            }
            job.reportProgress('Posting started');
            const res = await crawler.post(job, done);

            /*            job.reportProgress('Get links started');
                        const links = await crawler.getLinks(job);*/

            if (!res.status) {
                // job.reportProgress('>>> Stopped: ' + res.msg);
                await crawler.close();
                job.reportProgress('Browser has been closed prematurely!');
                return done({name: 'excp', stack: 'end', message: res.msg, cause: 'hz'}, {job: job});
            } else {
                await crawler.log(job, job.data.url, 'good_urls.log');

                // await crawler.clearHistory(job, done);
                job.reportProgress('Posting finished');

                await crawler.sleep(2500);
                await crawler.close();
                job.reportProgress('Browser closed');
                return done(null, {job: job});
            }
        });

        // @ts-ignore
        await res.status(200).send({
            posts: posts, user: user
        });
    }

}
