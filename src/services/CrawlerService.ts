import {Post} from '../db/models/Post';
import {PostDto} from '../view/PostDto';
import {GoalCreationDto, GoalDto} from "../view/GoalDto";
import {Goal} from "../db/models/Goal";
import {Crawler} from "../db/models/Crawler";
import {CrawlerCreationDto, CrawlerDto} from "../view/CrawlerDto";

export class CrawlerService {
    // public static async getAll(): Promise<PostDto[]> {
    //     const posts = await Post.findAll();
    //     return posts.map(PostService.modelToDto);
    // }

    public static modelToDto(crawler: Crawler): CrawlerDto {
        const {id, name} = crawler;
        return {id, name};
    }

    public static async create(dto: CrawlerCreationDto): Promise<Crawler> {
        return await Crawler.create(dto);
    }
}
