import fs from "fs";
import {FbPuppetCrawler} from "./fb/puppet/crawler";
import path from "path";
import {Post} from "../db/models/Post";

export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export class CommonHelper {
    protected readonly cwd: string;

    constructor() {
        this.cwd = process.cwd();
    }

    // Recursive function to get files
    public static getFiles(dir: string, files: any[] = []) {
        // Get an array of all files and directories in the passed directory using fs.readdirSync
        const fileList = fs.readdirSync(dir)
        // Create the full path of the file/directory by concatenating the passed directory and file/directory name
        for (const file of fileList) {
            const name: string = `${dir}/${file}`
            // Check if the current file/directory is a directory using fs.statSync
            if (fs.statSync(name).isDirectory()) {
                // If it is a directory, recursively call the getFiles function with the directory path and the files array
                CommonHelper.getFiles(name, files)
            } else {
                // If it is a file, push the full path to the files array
                files.push(name);
            }
        }
        return files
    }

    public static randomIntFromInterval(min: number, max: number) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    async fetch(userId: number, postId: number): Promise<Post | any> {
        // dirs
        await this.prepareStructManual(userId, postId);

        // text
        const textPath = this.getPostPathManual(userId, postId, 'text.txt');
        let content = '';
        try {
            content = (fs.readFileSync(textPath, 'utf8')).replaceAll("\r\n", "\n");
            console.log('text.txt:exist: ' + textPath);
        } catch (e) {
            console.log('text.txt:new: ' + textPath);
            fs.writeFileSync(textPath, content, {encoding: 'utf8', flag: 'a+'});
        }

        // images
        const images: never[] = [];
        CommonHelper.getFiles(this.getPostPathManual(userId, postId, 'images'), images);

        // post
        return {
            id: postId, userId: userId, metadata: {
                images: images, content: content
            },
        };
    }

    public async getUrls(userId: number, postId: number, fName:string): Promise<string[]> {
        // urls.txt
        const urlsPath = this.getURLsFilePath(userId, postId, fName);
        let urls: string[] = [];
        try {
            urls = this.shuffle(fs.readFileSync(urlsPath, 'utf8').split('\r\n'));
        } catch (e) {
            fs.writeFileSync(urlsPath, '', {encoding: 'utf8', flag: 'a+'});
        }

        return this.shuffle(urls);
    }

    protected getURLsFilePath(userId: number, postId: number, fName:string) {
        const f = './files/' + userId + '/' + FbPuppetCrawler.CrawlerName + '/' + postId + '/urls.'+fName+'.txt';
        return path.relative(this.cwd, f);
    }


    protected getPostPathManual(userId: number, postId: number, fName: string): string {
        const f = './files/' + userId + '/' + FbPuppetCrawler.CrawlerName + '/' + postId + '/' + fName
        return path.relative(this.cwd, f);
    }

    protected shuffle = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    private async prepareStructManual(userId: number, postId: number) {
        const dirs: string[] = ['attachments', // 'cookies',
            'screenshots', 'images'];
        dirs.forEach((folderName: string) => {
            const f = this.getPostPathManual(userId, postId, folderName);
            if (!fs.existsSync(f)) {
                fs.mkdirSync(f, {recursive: true});
            }
        });
    }
}
