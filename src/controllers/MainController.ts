import {RequestHandler} from 'express';
import {User} from "../db/models/User";
import {UserService} from "../services/UserService";
import {Post} from "../db/models/Post";
import {PostService} from "../services/PostService";
import {Goal} from "../db/models/Goal";
import {GoalCategoryService} from "../services/GoalCategoryService";
import {Crawler} from "../db/models/Crawler";
import {CrawlerService} from "../services/CrawlerService";
import {HistoryService} from "../services/HistoryService";
import {History, HistoryStatus} from "../db/models/History";


export class MainController {

    public static sendFbPost: RequestHandler<void, any> = async (
        req,
        res,
        next
    ) => {
        // create history
        let historyCount = 5;
        while (historyCount != 0) {
            // const newHistory: History = await HistoryService.create({
            //     status: HistoryStatus.new,
            //     postId: newPost.id,
            //     crawlerId: newCrawler.id,
            //     goalId: newGoal.id,
            //     userId: newUser.id
            // });
            // await newHistory.setGoal(newGoal);
            // await newHistory.setPost(newPost);
            // await newHistory.setCrawler(newCrawler);
            // await newHistory.setUser(newUser);
            historyCount--
        }


        const data = {};
        //
        // // create user
        //  let newUser: User = await UserService.create({
        //      // id: -1,
        //      name: 'dev',
        //  });
        //
        //  // create post
        //  let newPost: Post = await PostService.create({
        //      // id: -1,
        //      userId: newUser.id,
        //      metadata: {
        //          title: 'title',
        //          content: 'zzzzzzzzzzzzzzzzzzz',
        //          images: []
        //      }
        //  });
        //
        //  // create goal
        //  let newGoal: Goal = await GoalCategoryService.create({
        //      userId: newUser.id,
        //      name: 'baraxolkas',
        //      url: 'https://www.facebook.com/groups/baraxolkas'
        //  });
        //
        //  // create crawler
        //  let newCrawler: Crawler = await CrawlerService.create({
        //      name: 'Goal1'
        //  });


        // // create history
        // let historyCount = 5;
        // while (historyCount != 0) {
        //     const newHistory: History = await HistoryService.create({
        //         status: HistoryStatus.new,
        //         postId: newPost.id,
        //         crawlerId: newCrawler.id,
        //         goalId: newGoal.id,
        //         userId: newUser.id
        //     });
        //     await newHistory.setGoal(newGoal);
        //     await newHistory.setPost(newPost);
        //     await newHistory.setCrawler(newCrawler);
        //     await newHistory.setUser(newUser);
        //     historyCount--
        // }
        // await newPost.setUser(newUser);
        // await newUser.setGoals([newGoal]);
        // await newUser.setPosts([newPost]);
        //
        //
        // newUser = await newUser.save();
        //
        //
        // let _user = await UserService.find(newUser.id - 1);
        // if (!_user) {
        //     _user = await UserService.find(newUser.id);
        // }
        //
        // if (!_user) {
        //     return res
        //         .status(404)
        //         .json({code: 'user 404'});
        // }
        //
        // let _posts = await PostService.findByUserId(_user.id);
        let _histories = await HistoryService.findByUserId(1);
        //
        // if (!_posts) {
        //     return res
        //         .status(404)
        //         .json({code: 'post 404'});
        // }
        //
        return res
            .status(200)
            .json({histories: _histories});
    }

    public static index: RequestHandler<void, any> = async (
        req,
        res,
        next
    ) => {
        // const { name, adress, phone, productIds } = req.body;

        // // create user
        // let newUser: User = await UserService.create({
        //     // id: -1,
        //     name: 'dev',
        // });
        //
        //
        // // create post
        // let newPost: Post = await PostService.create({
        //     // id: -1,
        //     userId: newUser.id,
        //     metadata: {
        //         title: 'title',
        //         content: 'zzzzzzzzzzzzzzzzzzz',
        //         images: []
        //     }
        // });
        //
        //
        // // create goal
        // let newGoal: Goal = await GoalCategoryService.create({
        //     userId: newUser.id,
        //     name: 'Goal1',
        //     url: 'url'
        // });
        //
        //
        // // create crawler
        // let newCrawler: Crawler = await CrawlerService.create({
        //     name: 'Goal1'
        // });
        //
        //
        // // create history
        // let historyCount = 5;
        // while (historyCount != 0) {
        //     const newHistory: History = await HistoryService.create({
        //         status: HistoryStatus.new,
        //         postId: newPost.id,
        //         crawlerId: newCrawler.id,
        //         goalId: newGoal.id,
        //         userId: newUser.id
        //     });
        //     await newHistory.setGoal(newGoal);
        //     await newHistory.setPost(newPost);
        //     await newHistory.setCrawler(newCrawler);
        //     await newHistory.setUser(newUser);
        //     historyCount--
        // }
        // await newPost.setUser(newUser);
        // await newUser.setGoals([newGoal]);
        // await newUser.setPosts([newPost]);
        //
        //
        // newUser = await newUser.save();
        //
        //
        // let _user = await UserService.find(newUser.id - 1);
        // if (!_user) {
        //     _user = await UserService.find(newUser.id);
        // }
        //
        // if (!_user) {
        //     return res
        //         .status(404)
        //         .json({code: 'user 404'});
        // }

        // let _posts = await PostService.findByUserId(_user.id);
        // let _histories = await HistoryService.findByUserId(_user.id);

        // if (!_posts) {
        //     return res
        //         .status(404)
        //         .json({code: 'post 404'});
        // }

        // return res
        //     .status(200)
        //     .json({user: _user, posts: _posts, histories: _histories});


        // helpers
        // const helper: FbPuppetHelper = new FbPuppetHelper({
        //     name: FbPuppetHelper.CrawlerName
        // });
        // const browser: Browser = await helper.init();
        // const page: Page = await helper.login(browser);
        // const src = await helper.screenshot(page);
        // await helper.close();
        // return res
        //     .status(200)
        //     .json({src: src});


        const u: User|null = await UserService.find(1);
        const _histories = u? await u.getHistories():[];
        //
        // if (!_posts) {
        //     return res
        //         .status(404)
        //         .json({code: 'post 404'});
        // }
        //
        return res
            .status(200)
            .json({histories: _histories});


        // await newUser.setPosts([newPost]);
        // // await newPost.setUser(newUser);
        // await newPost.setHistories([]);


        //
        // const browser: Browser = await Helper.browser.connect();
        // const page: Page = await Helper.browser.open(browser, 'http://google.com');
        // const src = await Helper.browser.screenshot(page);
        // res.status(200).json({"userId": newUser.id, "postId": newPost.id});
        // res.status(200).send()
        // try {
        //     const { name, adress, phone, productIds } = req.body;
        //
        //     const newOrder = await OrderService.create({
        //         name: name.trim(),
        //         adress,
        //         phone,
        //         productIds,
        //     });
        //
        //     res.status(200).send(newOrder);
        // } catch (error) {
        //     next(error);
        // }
    };

    public getData() {

    }
}
