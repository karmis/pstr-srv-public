
import {Browser, Page, Permission} from "puppeteer";
import {Post} from "../../../db/models/Post";
import {User} from "../../../db/models/User";
import fs from "fs";
import {DoneCallback, Job} from "bee-queue";
import {FB_SELECTORS} from "../selectors";
import {FbPuppetHelper} from "./helper";
import path from "path";
import {delay} from "../../common.helper";
// import {StealthPlugin} from "puppeteer-extra-plugin-stealth";

export type CrawlerSetups = {
    // name: string,
    user: User, post: Post
}

export type CrawlerOptions = CrawlerSetups & {}

export type FbCrawlerJobType = {
    post: Post, user: User, // crawler: FbPuppetCrawler
    url: string, credential: { u: string, p: string }
}


export type CrawlerResponseType = {
    status: boolean, msg?: string
}


import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import puppeteer from 'puppeteer-extra';

export class FbPuppetCrawler extends FbPuppetHelper {

    private pageTitle: string;

    constructor(crawlerSetups: CrawlerSetups) {
        super(crawlerSetups);
    }

    private _browser: Browser;

    get browser(): Browser {
        return this._browser;
    }

    public async launch(job: Job<FbCrawlerJobType>): Promise<Browser> {
        puppeteer.use(StealthPlugin())
        try {
            this._browser = await puppeteer.launch({
                headless: true,
                slowMo: 500,
                ignoreHTTPSErrors: true,
                args: [`--window-size=1920,1240`, `--disable-background-timer-throttling`, `--disable-backgrounding-occluded-windows`, `--disable-renderer-backgrounding`,],
                defaultViewport: {
                    width: 1920, height: 1240
                },
                timeout: 0,
                devtools: false,
            });

            this.cPage = (await this.browser.pages())[0];
            this.cPage = await this.setupPage(this.cPage, job);

            return this._browser;
        } catch (e) {
            console.error('Failed to connect to docker container, is it running?');
            throw e;
        }
    }

    public async existPostInput(job: Job<FbCrawlerJobType>): Promise<boolean> {
        let popupOpenEl: any /*boolean | puppeteer.ElementHandle<Element>*/;
        try {
            popupOpenEl = await this.cPage.waitForSelector(FB_SELECTORS.post_open, {timeout: 10000});
        } catch (e) {
            popupOpenEl = false;
        }
        return !!popupOpenEl;
    }

    // public async isOpenPostPopup(job: Job<FbCrawlerJobType>) {
    //     const el = this.cPage.waitForSelector('')
    // }

    public async login(job: Job<FbCrawlerJobType>): Promise<boolean> {
        let loggedIn: boolean;
        try {
            loggedIn = await this._login(job);
        } catch (e) {
            await this.screenshot(job, 'login_error');
            console.log('ERR: ', e);

        } finally {
            loggedIn = await this.isLoggedIn(job);
        }

        return loggedIn;
    }

    public async isLoggedIn(job: Job<FbCrawlerJobType>): Promise<boolean> {
        let isLoggedIn = false;
        try {
            const el = await this.cPage.waitForSelector(FB_SELECTORS.login_popup_form, {timeout: 3000});
            if (el) {
                isLoggedIn = false;
            } else {
                await this.screenshot(job, 'not_signed');
            }
        } catch (e) {
            isLoggedIn = true;
            // console.log('WWWW', e);
        }


        return isLoggedIn;
    }

    // public async clearHistory(job: Job<FbCrawlerJobType>, done: DoneCallback<any>): Promise<boolean> {
    //     await this.goto(job.data.url + 'my_pending_content?orderby=OLDEST_FIRST');
    //     const posts = this.cPage.waitForSelector(FB_SELECTORS.page_history_posts);
    //     // posts.
    //     // // click manage posts button
    //     // const manageBtnEl = await this.cPage.waitForSelector(FB_SELECTORS.page_manage_post, {timeout: 3000});
    //     if (manageBtnEl) {
    //         await manageBtnEl.click();
    //     }
    //     //
    //     // const han
    //
    //
    //     return true;
    // }

    public async post(job: Job<FbCrawlerJobType>, done: DoneCallback<any>): Promise<CrawlerResponseType> {
        let discusTab: any/*puppeteer.ElementHandle<Element>*/;
        // let buySellTab: puppeteer.ElementHandle<Element>;
        // let status;
        // select Discussion tab
        try {
            discusTab = await this.cPage.waitForSelector(FB_SELECTORS.page_discussion_tab, {timeout: 10000});
            await discusTab?.click();
            job.reportProgress('-- Discussion tab clicked');
        } catch (e) {
            discusTab = null;
            job.reportProgress('-- Discussion tab click failed: ' + e.toString());
            return {
                status: false, msg: e.toString()
            };
        }

        return await this.postProcess(job);

        // return {
        //     status: true
        // };

        // select Buy and Sell tab
        // try {
        //     buySellTab = await this.cPage.waitForSelector(FB_SELECTORS.page_buy_sell_tab, {timeout: 10000});
        //     await buySellTab?.click();
        //     job.reportProgress('-- Buy and Sell tab clicked');
        //     status = await this.postProcess(job);
        // } catch (e) {
        //     discusTab = null;
        //     job.reportProgress('-- Buy and Sell tab click failed: ' + e.toString());
        //     return {
        //         status: false, msg: e.toString()
        //     };
        // }

        // if (status?.status) {
        //     return {
        //         status: true, msg: 'ok'
        //     };
        // } else {
        //     return {
        //         status: false, msg: e.toString()
        //     };
        // }
    }

    private async postProcess(job: Job<FbCrawlerJobType>) {
        const post: Post = job.data.post;
        let popupOpenEl: any/*puppeteer.ElementHandle<Element>*/;
        // Check pending posts
        let manageBtnEl: any/*puppeteer.ElementHandle<Element>*/;
        try {
            manageBtnEl = await this.cPage.waitForSelector(FB_SELECTORS.page_manage_post, {timeout: 3000});
            job.reportProgress('>>> Page has pending posts; exit;');
            return {
                status: false,
                msg: 'Page has pending posts'
            };
        } catch (e) {
            manageBtnEl = null
            job.reportProgress('>>> Page has not pending posts;');
        }

        // click popup input
        try {
            popupOpenEl = await this.cPage.waitForSelector(FB_SELECTORS.page_post_start, {timeout: 10000})
            await popupOpenEl?.click();
            job.reportProgress('-- Post start clicked');
        } catch (e) {
            await this.screenshot(job, '_post_error');
            job.reportProgress('>>> error: ' + e.toString());
            return {
                status: false, msg: e.toString()
            };
        }

        // Write content
        if (post.metadata.content) {
            job.reportProgress('-- Writing content');
            await this.writePost(post.metadata.content || ''); // post.metadata.content
            job.reportProgress('-- Writing content finished');
        }

        // Attach images
        if (post.metadata.images) {
            let attached = false;
            job.reportProgress('-- Attaching files');
            try {
                await this.attachFilesToPost(post.metadata.images);
                job.reportProgress('-- Files attached (0)');
                attached = true;
            } catch (e) {
                job.reportProgress('>>> Files attach failed (0): ' + e.toString());
                job.reportProgress('>>> Files attach failed');
                attached = false;
            }

            if (!attached) {
                try {
                    const iconFileEl = await this.cPage.waitForSelector(FB_SELECTORS.post_icon_file, {timeout: 10000})
                    await iconFileEl?.click();
                    job.reportProgress('-- Upload icon clicked');
                } catch (e) {
                    await this.attachFilesToPost(post.metadata.images);
                    job.reportProgress('-- Files attached');
                }

                try {
                    await this.attachFilesToPost(post.metadata.images);
                    job.reportProgress('-- Files attached (0)');
                    attached = true;
                } catch (e) {
                    job.reportProgress('>>> Files attach failed (0): ' + e.toString());
                    job.reportProgress('>>> Files attach failed');
                    attached = false;
                }

            }

            job.reportProgress('-- Attached: ' + attached);
        }

        // Click Post button
        job.reportProgress('-- Post button ...');
        try {
            const postBtnHandler = await this.cPage.waitForSelector(FB_SELECTORS.post_send, {timeout: 10000});
            await postBtnHandler?.click();
            job.reportProgress('-- ... post button pressed!');
            await this.sleep(2500);
            await this.screenshot(job, 'posted');
        } catch (e) {
            job.reportProgress('>>> ... error on press Post button: ' + e.toString());
            await this.screenshot(job, '_error_post');
            return {
                status: false, msg: e.toString()
            };
        }

        // Check for modal closed;
        let ch = await this.existPostInput(job);
        if (ch) {
            job.reportProgress('-- ... post popup is open: ' + ch + ' waiting for delay..');
            await delay(3000);
            ch = await this.existPostInput(job);
        }
        job.reportProgress('-- ... post popup is open: ' + ch);

        return {
            status: true, msg: 'ok'
        };
    }

    public async sleep(ms: number) {
        await this.cPage.evaluate(async (ms) => {
            await new Promise(function (resolve) {
                setTimeout(resolve, ms)
            });
        }, ms);
    }

    public async screenshot(job: Job<FbCrawlerJobType>, status: string): Promise<string> {
        const ds = new Date().getTime();
        const n = ds + '_' + job.data.url.split('/').at(-2) + '_' + status + '_' + job.data.credential.u.substring(0, 2) + '.jpg';
        const p = this.getScreenshotsPath() + '\\' + n;
        job.reportProgress('-- Taking screenshot (' + status + ') name: ' + n);
        await this.cPage.screenshot({
            path: p, optimizeForSpeed: true, quality: 40
        });
        job.reportProgress('-- Screenshot taken (' + status + ') name: ' + n);
        return p;
    }

    public async goto(url: string) {
        await this.cPage.goto(url, {waitUntil: 'domcontentloaded'});
        this.pageTitle = await this.cPage.title();
    }

    public async permissions(url: string, permissions: Permission[]) {
        await this._browser.defaultBrowserContext().overridePermissions(url, permissions);
    }

    public close = async () => {
        await delay(2000);
        await this._browser.close();
    }

    public async writeLog(msg: string) {
        this.getPostPath(this.options.user, this.options.post, 'screenshots') + '/';
        await fs.writeFileSync(this.getURLsFilePath() + '/log.txt', msg + '\r\n', {encoding: 'utf8', flag: 'a+'});
    }


    //
    // public async getUrls(): Promise<string[]> {
    //
    //     try {
    //         await fs.readFileSync(cookiesPath, 'utf8').split('\r\n');
    //         console.log('cookiesPath.txt:exist: ' + cookiesPath);
    //     } catch (e) {
    //         console.log('cookiesPath.txt:new: ' + cookiesPath);
    //         await fs.writeFileSync(cookiesPath, '', {encoding: 'utf8', flag: 'a+'});
    //     }
    //
    //     return urls.txt;
    // }

    protected getCookiesFilePath(job: Job<FbCrawlerJobType>) {
        const name = FbPuppetCrawler.CrawlerName + '.' + job.data.credential.u.substring(0, 3) + '.cookies.json';
        const f = './files/' + name;
        const cookiesPath: string = path.relative(this.cwd, f);
        return cookiesPath
    }

    protected getScreenshotsPath() {
        return this.getPostPath(this.options.user, this.options.post, 'screenshots') + '/';
    }

    private async _login(job: Job<FbCrawlerJobType>): Promise<boolean> {
        const emailEl = await this.cPage.waitForSelector(FB_SELECTORS.login_popup_email);
        const passEl = await this.cPage.waitForSelector(FB_SELECTORS.login_popup_pass);
        const logInBtnEl = await this.cPage.waitForSelector(FB_SELECTORS.login_popup_post);
        if (emailEl && passEl && logInBtnEl) {
            await emailEl.type(job.data.credential.u, {delay: 0});
            await passEl.type(job.data.credential.p, {delay: 0});
            await logInBtnEl.click();
            await this.cPage.waitForSelector('svg[aria-label="Your profile"]', {timeout: 50000})
            const _cookies = await this.cPage.cookies();
            await this.cPage.setCookie(..._cookies);
            fs.writeFileSync(this.getCookiesFilePath(job), JSON.stringify(_cookies, null, 2), {
                encoding: 'utf8', flag: 'a+'
            });
        }

        return true
    }

    private async writePost(val: string) {
        // /images/composer/SATP_Aa_square-2x.png
        // aria-label="Solid red, background"
        val = val.replaceAll("\r\n", "\n");
        // await this.currentPage.evaluate(s => navigator.clipboard.writeText(s), val)
        await this.cPage.waitForSelector('div[data-contents="true"]');
        await this.cPage.click('div[data-contents="true"]');
        await this.cPage.waitForSelector('[data-text="true"]');
        await this.cPage.type('[data-text="true"]', val, {delay: 0});

        // color post
        // const colorPostHandler = await this.currentPage.waitForSelector('img[src="/images/composer/SATP_Aa_square-2x.png"]');
        // await colorPostHandler?.click();
        // const colorPostRed = await this.currentPage.waitForSelector('div[aria-label="Solid red, background"]')
        // await colorPostRed?.click()

        // Solid red, background
        //
        // const postInputEl = await this.currentPage.waitForSelector('[data-text="true"]');
        // postInputEl.
        // await postInputEl?.focus();
        // await this.currentPage.keyboard.down('Shift');
        // await this.currentPage.keyboard.press('Insert');
        // await this.currentPage.keyboard.up('Shift');


        //
        // await page.waitForSelector('div[data-contents="true"]');
        // await page.click('div[data-contents="true"]');
        // const postInputEl = await page.waitForSelector('[data-text="true"]');

    }

    private async findInputMultiple() {
        const els = await this.cPage.waitForSelector('div form input[type=file]', {timeout: 10000});
        await delay(1000);
        const fileEl = await this.cPage.waitForFunction(() => {
            let els = document.querySelectorAll('div form input[type=file]');
            return els[els.length - 1];
        });
        return fileEl;
    }

    private async attachFilesToPost(urls: string[]): Promise<void> {
        const refs = [];
        const uploadElementHandle: any = await this.findInputMultiple();
        for await (let imageUrl of urls) {
            const url = imageUrl.replaceAll('\\', '/');
            // const exist = await this.checkFileExists(url);
            // if (exist) {
            //
            // }
            refs.push(url);
        }
        return await uploadElementHandle.uploadFile(...refs);
    }

    private async checkFileExists(filepath) {
        return new Promise((resolve, reject) => {
            fs.access(filepath, fs.constants.F_OK, error => {
                resolve(!error);
            });
        });
    }

    private async setupPage(page: Page, job: Job<FbCrawlerJobType>): Promise<Page> {
        // const _page = await this.browser.newPage();
        // const page = (await this.browser.pages())[0];
        // request interceptor
        // await page.setRequestInterception(true)
        // page.on('request', (request) => {
        //     if (request.resourceType() === 'stylesheet') request.abort()
        //     else request.continue()
        // })

        // set timeouts
        page.setDefaultTimeout(120000);
        page.setDefaultNavigationTimeout(120000);
        const session = await page.target().createCDPSession();
        const permissions: Permission[] = ['clipboard-read', 'clipboard-write']
        await page.setViewport({width: 1280, height: 1024});
        await session.send('Page.enable');
        await session.send('Page.setWebLifecycleState', {state: 'active'});
        await this.permissions(this.url, permissions);

        try {
            const cookies = JSON.parse(await fs.readFileSync(this.getCookiesFilePath(job), {encoding: 'utf8'}));
            await this.cPage.setCookie(...cookies);
        } catch (e) {
            job.reportProgress('-- cookies not created');
        }

        // dialog handler
        try {
            page.off('dialog').once('dialog', async dialog => {
                console.log(dialog.message());
                await dialog.dismiss();
            });
        } catch (e) {
            console.error('Dialog handler error: ', e);
        }

        return page;
    }

    private async getActivePage(timeout) {
        var start = new Date().getTime();
        while (new Date().getTime() - start < timeout) {
            var pages = await this._browser.pages();
            var arr = [];
            for (const p of pages) {
                if (await p.evaluate(() => {
                    return document.visibilityState == 'visible'
                })) {
                    arr.push(p);
                }
            }
            if (arr.length == 1) return arr[0];
        }
        throw "Unable to get active page";
    }





















    // delete posts
    public async getLinks(job: Job<FbCrawlerJobType>, categories = [], years = []) {
        const currentYear = (new Date()).getFullYear();
        await this.cPage.goto("https://mbasic.facebook.com/allactivity", {
            waitUntil: "load",
            timeout: 0,
        });
        await this.followLinkByContent("Filter");

        for (let i in categories) {
            console.log("Deleting category " + categories[i]);
            await this.followLinkByContent(categories[i]);
            for (let j in years) {
                console.log("In year " + years[j]);
                try {
                    if (years[j] != currentYear) {
                        await this.followLinkByContent(years[j]);
                    }
                    await this.deleteYear(years[j]);
                } catch (e) {
                    console.log(`Year ${years[j]} not found.`, e);
                }
            }
            await this.followLinkByContent(categories[i]);
        }

        // await this.cPage.close();
        console.log("Done!");
        process.exit();
    }

    private async deletePosts() {
        // get all "allactivity/delete" and "allactivity/removecontent" links on page
        var deleteLinks = await this.cPage.evaluate(() => {
            var links = [];
            const deleteElements = document.querySelectorAll(
                'a[href*="allactivity/delete"]'
            );
            const removeElements = document.querySelectorAll(
                'a[href*="allactivity/removecontent"]'
            );
            for (const el of deleteElements) {
                links.push((el as any).href);
            }
            for (const el of removeElements) {
                links.push((el as any).href);
            }
            return links;
        });
        // visit them all to delete content
        for (let i = 0; i < deleteLinks.length; i++) {
            // wait between clicks
            await new Promise(r => setTimeout(r, 500));
            await this.cPage.goto(deleteLinks[i], { waitUntil: "load", timeout: 0 });
        }
    }

    private async deletePostsWithConfirm() {
        // get all "allactivity/delete" and "allactivity/removecontent" links on page
        var deleteLinks = await this.cPage.evaluate(() => {
            var links = [];
            const unfriendElements = document.querySelectorAll(
                'a[href*="activity_log/confirm_dialog"]'
            );
            for (const el of unfriendElements) {
                links.push((el as any).href);
            }
            return links;
        });
        // visit them all to delete content
        for (let i = 0; i < deleteLinks.length; i++) {
            // wait between clicks
            await new Promise(r => setTimeout(r, 500));
            await this.cPage.goto(deleteLinks[i], { waitUntil: "load", timeout: 0 });
            await this.deletePosts();
        }
    }

    private async getMonthLinks(year) {
        var monthLinks = await this.cPage.evaluate((year) => {
            var months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            var links = [];
            const elements = document.querySelectorAll("a");
            for (let el of elements) {
                if ("This Month" === el.innerText) {
                    links.push(el.href);
                }
                for (let i = 0; i < months.length; i++) {
                    if (months[i] + " " + year === el.innerText) {
                        links.push(el.href);
                    }
                }
            }
            return links;
        }, year);
        return monthLinks;
    }

    private async followLinkByContent(content) {
        var link = await this.cPage.evaluate((text) => {
            const aTags = document.querySelectorAll("a");
            for (let aTag of aTags) {
                if (aTag.innerText.toLowerCase() === text.toLowerCase()) {
                    return aTag.href;
                }
            }
        }, content);

        if (link != undefined) {
            await this.cPage.goto(link, { waitUntil: "load", timeout: 0 });
        }
    }

    private async deleteYear(year) {
        var monLinks = await this.getMonthLinks(year);
        for (let mon in monLinks) {
            // console.log("Deleting month: ", monLinks[mon]);
            await this.cPage.goto(monLinks[mon], { waitUntil: "load", timeout: 0 });
            // await this.deletePosts();
            // await this.deletePostsWithConfirm();
        }
    }











}
