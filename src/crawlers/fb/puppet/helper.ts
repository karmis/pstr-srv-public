import {User} from "../../../db/models/User";
import {Post} from "../../../db/models/Post";
import fs from "fs";
import {CrawlerSetups, FbCrawlerJobType, FbPuppetCrawler} from "./crawler";
import path from "path";
import {Page} from "puppeteer";
import {Job} from "bee-queue";

export class FbPuppetHelper {
    static CrawlerName: string = 'fb-puppet-posterer-v0.1'
    protected options: CrawlerSetups;
    protected url: string = 'https://www.facebook.com/';
    protected cPage: Page;
    protected readonly cwd: string;
    constructor(crawlerSetups: CrawlerSetups) {
        this.options = crawlerSetups;
        this.cwd = process.cwd();
        const currentYear = (new Date()).getFullYear();

    }

    private _urls = [];

    get urls(): any[] {
        return this._urls;
    }

    // Recursive function to get files
    public static getFiles(dir, files = []) {
        // Get an array of all files and directories in the passed directory using fs.readdirSync
        const fileList = fs.readdirSync(dir)
        // Create the full path of the file/directory by concatenating the passed directory and file/directory name
        for (const file of fileList) {
            const name = `${dir}/${file}`
            // Check if the current file/directory is a directory using fs.statSync
            if (fs.statSync(name).isDirectory()) {
                // If it is a directory, recursively call the getFiles function with the directory path and the files array
                FbPuppetCrawler.getFiles(name, files)
            } else {
                // If it is a file, push the full path to the files array
                files.push(name)
            }
        }
        return files
    }

    public async log(job: Job<FbCrawlerJobType>, msg: string, logFile: string = 'logs.log') {
        const f = this.getPostPath(job.data.user, job.data.post, logFile);
        fs.writeFileSync(f, msg + '\r\n', {encoding: 'utf8', flag: 'a+'});
        return;
    }

    public getPostPath(user: User, post: Post, fName: string): string {
        const f = './files/' + user.id + '/' + FbPuppetCrawler.CrawlerName + '/' + post.id + '/' + fName
        return path.relative(this.cwd, f);
    }


    // protected getPostPath(fName: string): string {
    //     const f = './files/' + this.options.user.id + '/' + FbPuppetCrawler.CrawlerName + '/' + this.options.post.id + '/' + fName
    //     return path.relative(this.cwd, f);
    // }


    protected shuffle = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    protected getURLsFilePath() {
        const name = 'urls.txt';
        const f = './files/' + name;
        return path.relative(this.cwd, f);
    }

    private async prepareStruct(user: User, post: Post) {
        const dirs: string[] = ['attachments', 'cookies', 'screenshots', 'images'];
        dirs.forEach((folderName: string) => {
            const f = this.getPostPath(user, post, folderName);
            if (!fs.existsSync(f)) {
                fs.mkdirSync(f, {recursive: true});
            }
        });
    }
}
