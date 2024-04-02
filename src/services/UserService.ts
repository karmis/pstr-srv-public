import {User} from '../db/models/User';
import {UserCreationDto, UserDto} from '../view/UserDto';

export class UserService {
    public static async getAll(): Promise<UserDto[]> {
        const users = await User.findAll();
        const usersDta = [];
        users.forEach((user: User) => {
            usersDta.push(UserService.modelToDto(user));
        });

        return usersDta;
    }

    public static async find(id): Promise<User | null> {
        const user = await User.findByPk(id);
        return user;
    }

    // public static async getAll(): Promise<UserDto[]> {
    //     const users = await User.findAll();
    //     return users.map(UserService.modelToDto);
    // }

    public static async modelToDto(user: User): Promise<UserDto> {
        const {id, name, goals, posts} = user;
        user.goals = user.goals ?? (await user.getGoals());
        user.posts = user.posts ?? (await user.getPosts());

        return {id, name, goals, posts};
    }

    public static async create(dto: UserCreationDto): Promise<User> {
        return await User.create(dto)
    }
}
