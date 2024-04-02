// // these enums should be in a separate file and exported
// import QueueService from "../services/QueueService";
// import {Job} from "bullmq";
//
// enum Queues {
//     DEFAULT = 'default',
// }
//
// enum JobType {
//     PROCESS_POST = 'process-payment',
// }
//
// export default class DefaultProcessor {
//     static async processPayment(job: Job) {
//         const queue = new QueueService().getQueue(Queues.DEFAULT);
//         if (!queue) return;
//
//         console.log(`Process job with id ${job.id} from the ${Queues.DEFAULT} queue`);
//     }
// }
