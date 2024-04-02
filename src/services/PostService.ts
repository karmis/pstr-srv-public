import {Post} from '../db/models/Post';
import {PostCreationDto, PostDto} from '../view/PostDto';
import {User} from "../db/models/User";
import {UserCreationDto, UserDto} from "../view/UserDto";
import {GoalCategoryCreationDto, GoalCategoryDto} from "../view/GoalCategoryDto";
import {GoalCategory} from "../db/models/GoalCategory";
import {GoalCategoryService} from "./GoalCategoryService";
import {GoalCreationDto} from "../view/GoalDto";
import {Goal} from "../db/models/Goal";
import {GoalService} from "./GoalService";
import {CrawlerCreationDto} from "../view/CrawlerDto";
import {Crawler} from "../db/models/Crawler";
import {CrawlerService} from "./CrawlerService";
import {HistoryCreationDto} from "../view/HistoryDto";
import {History, HistoryStatus} from "../db/models/History";
import {HistoryService} from "./HistoryService";
import {UserService} from "./UserService";
import {Helper} from "../helpers/common/helper";

export class PostService {
    public static async getAll(): Promise<PostDto[]> {
        const posts = await Post.findAll();
        return posts.map(PostService.modelToDto);
    }

    public createPost: (data: PostCreationDto) => Promise<Post> = async (data: PostCreationDto) => {
        // create post
        const {userId, metadata} = data;
        const newPost: Post = await PostService.create({
            userId: userId,
            metadata: metadata
        });
        await newPost.save();
        return newPost;
    }

    public createGoalCategory: (data: GoalCategoryCreationDto) => Promise<GoalCategory> = async (data: GoalCategoryDto) => {
        // create post
        // const {title} = data;
        const newGoalCategory: GoalCategory = await GoalCategoryService.create(data);
        await newGoalCategory.save();
        return newGoalCategory;
    }

    public createGoal: (data: GoalCreationDto) => Promise<Goal> = async (data: GoalCreationDto) => {
        const {userId, name, url, goalCategoryId} = data;
        // create goal
        const newGoal: Goal = await GoalService.create({
            userId: userId,
            name: name,
            url: url,
            goalCategoryId: goalCategoryId
        });

        await newGoal.save();
        return newGoal;

        // const goalsCount = 10;
        // const goals = [];
        // while (goalsCount != 0) {
        //     const newHistory: Goal = await GoalCategoryService.create({
        //         userId: newUser.id,
        //         name: 'baraxolkas',
        //         url: 'https://www.facebook.com/groups/baraxolkas'
        //     });
        //     await newHistory.setGoal(newGoal);
        //     await newHistory.setPost(newPost);
        //     await newHistory.setCrawler(newCrawler);
        //     await newHistory.setUser(newUser);
        //     historyCount--
        // }
    }

    public createCrawler: (data: CrawlerCreationDto) => Promise<Crawler> = async (data: CrawlerCreationDto) => {
        const {name, metadata} = data;
        // create goal
        const newCrawler: Crawler = await CrawlerService.create({
            name: name,
            metadata: metadata,
        });

        await newCrawler.save();
        return newCrawler;

        // const goalsCount = 10;
        // const goals = [];
        // while (goalsCount != 0) {
        //     const newHistory: Goal = await GoalCategoryService.create({
        //         userId: newUser.id,
        //         name: 'baraxolkas',
        //         url: 'https://www.facebook.com/groups/baraxolkas'
        //     });
        //     await newHistory.setGoal(newGoal);
        //     await newHistory.setPost(newPost);
        //     await newHistory.setCrawler(newCrawler);
        //     await newHistory.setUser(newUser);
        //     historyCount--
        // }
    }

    public createHistory: (data: HistoryCreationDto) => Promise<History> = async (data: HistoryCreationDto) => {
        const {userId, crawlerId, goalId, postId, url} = data;
        // create history
        const newHistory: History = await HistoryService.create({
            status: HistoryStatus.new,
            postId: userId,
            crawlerId: crawlerId,
            goalId: goalId,
            userId: postId,
            url: url
        });

        await newHistory.save();
        return newHistory;

        // let historyCount = 5;
        // while (historyCount != 0) {
        //      historyCount--
        // }
    }

    public createUser: (data: UserCreationDto) => Promise<User> = async (data: UserCreationDto) => {
        const {name} = data;
        const newUser: User = await UserService.create({
            // id: -1,
            name: name,
        });
        await newUser.save();

        return newUser
    };

    public example = async () => {
        // users
        const user1: User = await this.createUser({name: 'User 1'});
        const user2: User = await this.createUser({name: 'User 2'});
        const user3: User = await this.createUser({name: 'User 3'});

        // posts
        const post1Dto: PostCreationDto = {
            userId: user1.id,
            metadata: {
                images: [
                    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
                    'https://slp-statics.astockcdn.net/static_assets/staging/24winter/home/curated-collections/card-2.jpg?width=580',
                    'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                ],
                content: 'TEXT!!!',
                title: 'test'
            }
        };
        const post2Dto: PostCreationDto = {
            userId: user2.id,
            metadata: {
                images: [
                    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
                    'https://slp-statics.astockcdn.net/static_assets/staging/24winter/home/curated-collections/card-2.jpg?width=580',
                    'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                ],
                content: 'TEXT!!!',
                title: 'test2'
            }
        };
        const post3Dto: PostCreationDto = {
            userId: user3.id,
            metadata: {
                images: [
                    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
                    'https://slp-statics.astockcdn.net/static_assets/staging/24winter/home/curated-collections/card-2.jpg?width=580',
                    'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                ],
                content: 'TEXT!!!',
                title: 'test2'
            }
        };

        const post1: Post = await this.createPost(post1Dto);
        const post2: Post = await this.createPost(post2Dto);
        const post3: Post = await this.createPost(post3Dto);
        await post1.setUser(user1);
        await post2.setUser(user1);
        await post3.setUser(user2);

        // goals categories
        const goalCatEstate: GoalCategory = await this.createGoalCategory({title: 'Estate'});
        const goalCatJob: GoalCategory = await this.createGoalCategory({title: 'Job'});

        // goals
        const goal1Dto: GoalCreationDto = {
            goalCategoryId: goalCatEstate.id,
            url: 'https://www.facebook.com/groups/924957391281740/',
            userId: user1.id,
            name: '924957391281740'
        }
        const goal2Dto: GoalCreationDto = {
            goalCategoryId: goalCatEstate.id,
            url: 'https://www.facebook.com/groups/103849576893928/',
            userId: user1.id,
            name: '924957391281740'
        }
        const goal3Dto: GoalCreationDto = {
            goalCategoryId: goalCatEstate.id,
            url: 'https://www.facebook.com/groups/145446856302566/',
            userId: user1.id,
            name: '924957391281740'
        }
        const goal4Dto: GoalCreationDto = {
            goalCategoryId: goalCatEstate.id,
            url: 'https://www.facebook.com/groups/behappybatumi/',
            userId: user1.id,
            name: '924957391281740'
        }
        const goal5Dto: GoalCreationDto = {
            goalCategoryId: goalCatEstate.id,
            url: 'https://www.facebook.com/groups/arenda.kvartir.batumi/',
            userId: user1.id,
            name: '924957391281740'
        }
        const goal6Dto: GoalCreationDto = {
            goalCategoryId: goalCatJob.id,
            url: 'https://www.facebook.com/groups/783938325776403/',
            userId: user2.id,
            name: 'arenda.kvartir.batumi'
        }
        const goal7Dto: GoalCreationDto = {
            goalCategoryId: goalCatJob.id,
            url: 'https://www.facebook.com/groups/163600784253465/',
            userId: user2.id,
            name: '147229409018119'
        }
        const goal8Dto: GoalCreationDto = {
            goalCategoryId: goalCatJob.id,
            url: 'https://www.facebook.com/groups/2359020657592447/',
            userId: user3.id,
            name: '2359020657592447'
        }

        const goal1: Goal = await this.createGoal(goal1Dto);
        await goal1.setUser(user1);
        await goal1.setGoalCategory(goalCatEstate);
        // await goalCatEstate.setGoals([goal1]);

        //
        // sdsds
        // asdasdasd
        const goal2 = await this.createGoal(goal2Dto);
        await goal2.setUser(user2);
        await goal2.setGoalCategory(goalCatEstate);

        const goal3 = await this.createGoal(goal3Dto);
        await goal3.setUser(user3);
        await goal3.setGoalCategory(goalCatEstate);

        const goal4 = await this.createGoal(goal4Dto);
        await goal4.setUser(user1);
        await goal4.setGoalCategory(goalCatEstate);

        const goal5 = await this.createGoal(goal5Dto);
        await goal5.setUser(user2);
        await goal5.setGoalCategory(goalCatJob);

        const goal6 = await this.createGoal(goal6Dto);
        await goal6.setUser(user3);
        await goal6.setGoalCategory(goalCatJob);

        const goal7 = await this.createGoal(goal7Dto);
        await goal7.setUser(user1);
        await goal7.setGoalCategory(goalCatJob);

        const goal8 = await this.createGoal(goal8Dto);
        await goal8.setUser(user2);
        await goal8.setGoalCategory(goalCatJob);

        await goalCatEstate.setGoals([goal1, goal2, goal3, goal4]);
        await goalCatJob.setGoals([goal5, goal6, goal7, goal8]);

        // crawler
        const crawler1 = await this.createCrawler({name: 'FB PUP CRAWLER'});

        // create history
        let historyCount = 5;
        while (historyCount != 0) {
            const goalId = Helper.randInterval(goal1.id, goal8.id);
            const userId = Helper.randInterval(user1.id, user3.id);
            const postId = Helper.randInterval(post1.id, post3.id);
            const newHistory: History = await HistoryService.create({
                status: HistoryStatus.new,
                postId: postId,
                crawlerId: crawler1.id,
                goalId: goalId,
                userId: userId,
            });
            await newHistory.setGoal(goalId);
            await newHistory.setPost(postId);
            await newHistory.setCrawler(crawler1);
            await newHistory.setUser(userId);
            await newHistory.save();
            historyCount--;
        }

        await user1.save();
        await user2.save();
        await user3.save();

        const hists1 = await user1.getHistories();
        const goals1 = await user1.getGoals();
        const posts1 = await user1.getPosts();

        return {
            user1: user1,
            hists1: hists1,
            goals1: goals1,
            posts1: posts1,
            // histories3: hists3,
            // hist1: hist,
            // user1: user1,
            // goal: goal
            // user3: user3,
            // crawler1: crawler1
        }
        // await us.setUser(newUser);
        // await newUser.setGoals([newGoal]);
        // await newUser.setPosts([newPost]);
    }


    public static async findOneByUserId(userId: number): Promise<Post> {
        return await Post.findOne({
            rejectOnEmpty: false,
            where: {
                UserId: userId
            }
        });
    }

    public static async findByUserId(userId: number): Promise<PostDto[]> {
        const posts = await Post.findAll({
            where: {
                UserId: userId
            }
        });
        return posts.map(PostService.modelToDto);
    }

    public static modelToDto(post: Post): PostDto {
        const {id, metadata, userId} = post;
        return {id, metadata, userId};
    }

    public static async create(dto: PostCreationDto): Promise<Post> {
        return await Post.create(dto);
    }
}
