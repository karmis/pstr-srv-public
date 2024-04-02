import { sequelize } from './sequelize';
// import { Product } from './models/Product';
// import { GoalCategory } from './models/GoalCategory';
import { Order } from './models/Order';
import { Relations } from './Relations';
import {Crawler} from "./models/Crawler";
import {History} from "./models/History";
import {Post} from "./models/Post";
import {User} from "./models/User";
import {Goal} from "./models/Goal";
import {GoalCategory} from "./models/GoalCategory";

export const connect = async () => {
  try {
    // Relations.oneIn(GoalCategory, Product);
    // Relations.manyToMany(Order, Product, '_OrderProduct');
    Relations.oneIn(User, Post);
    Relations.oneIn(GoalCategory, Goal);
    Relations.oneIn(User, Goal);
    Relations.oneIn(User, History);
    Relations.oneIn(Crawler, History);
    Relations.oneIn(Post, History);
    Relations.oneIn(Goal, History);


    // Relations.oneIn(Post, History);
    // Relations.manyToMany(History, Post, '_HistoryPost');
    // Relations.manyToMany(Goal, User);
    // Relations.oneIn(User, Post);

    // Relations.oneIn(Crawler, History);
    // Relations.manyToMany(History, Crawler, '_HistoryCrawler');
    // Relations.oneIn(Post, History);
    // Relations.manyToMany(History, Post, '_HistoryPost');
    // Relations.oneIn(Post, User);
    // Relations.manyToMany(User, Post, '_UserPost');
    // Relations.oneIn(User, Post);
    // Relations.manyToMany(Post, User, '_UserPost');
    // Relations.oneIn(User, Goal);
    // Relations.manyToMany(Goal, User, '_GoalUser');


    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true, alter: true });
    // await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
