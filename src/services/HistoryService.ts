import {History, HistoryStatus} from '../db/models/History';
import {HistoryCreationDto, HistoryDto} from '../view/HistoryDto';

export class HistoryService {
    public static async create(dto: HistoryCreationDto): Promise<History> {
        return await History.create(dto);
    }

    public static async findByUserId(userId: number): Promise<HistoryDto[]> {
        const histories = await History.findAll({
            where: {
                UserId: userId
            }
        });
        return histories.map(HistoryService.modelToDto);
    }

    public static modelToDto(history: History): HistoryDto {
        const {id, status, crawlerId, goalId, postId} = history;
        return {
            id,
            status,
            crawlerId,
            postId,
            goalId
        } as HistoryDto
    }

    public newHistory: (data: HistoryCreationDto) => Promise<History> = async (data: HistoryCreationDto) => {
        // const {userId, crawlerId, goalId, postId, url} = data;
        // create history
        const newHistory: History = await HistoryService.create(data);

        await newHistory.save();
        return newHistory;

        // let historyCount = 5;
        // while (historyCount != 0) {
        //      historyCount--
        // }
    }
}
