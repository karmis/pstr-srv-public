// import { Queue } from 'bullmq';
//
// export enum Queues {
//     DEFAULT = 'default',
// }
//
// export default class QueueService {
//     private queues: Record<string, Queue>;
//     private defaultQueue: Queue;
//
//     private static instance: QueueService;
//
//     private static QUEUE_OPTIONS = {
//         defaultJobOptions: {
//             removeOnComplete: false, // this indicates if the job should be removed from the queue once it's complete
//             removeOnFail: false, // this indicates if the job should be removed from the queue if it fails
//         },
//         connection: {
//             // redis server connection options
//             host: process.env.REDIS_HOST,
//             port: process.env.REDIS_PORT,
//         },
//     };
//
//     constructor() {
//         if (QueueService.instance instanceof QueueService) {
//             return QueueService.instance;
//         }
//
//         this.queues = {};
//         QueueService.instance = this;
//
//         this.instantiateQueues().then(r => r);
//     }
//
//     async instantiateQueues() {
//         this.defaultQueue = new Queue(Queues.DEFAULT, QueueService.QUEUE_OPTIONS);
//         this.queues[Queues.DEFAULT] = this.defaultQueue;
//     }
//
//     getQueue(name: Queues) {
//         return this.queues[name];
//     }
// }
