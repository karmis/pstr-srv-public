import express, {ErrorRequestHandler} from 'express';
import cors from 'cors';
import {connect} from './db/connect';
import {MainController} from "./controllers/MainController";
import {FillerController} from "./controllers/FillerController";

const app = express();
app.use(
    cors({
        credentials: true,
        origin: true,
    })
);
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', MainController.index)

// app.get('/fill', FillerController.fill);
// app.get('/post', FillerController.post);
// app.get('/test', FillerController.test);
app.get('/test2', FillerController.test2);

// app.get('/api/products?', ProductController.getAll);
//
// app.get('/api/products?', ProductController.getAll);
//
// app.get('/api/categories', GoalCategoryController.getAll);
//
// app.post('/api/products', ProductController.add);
//
// app.post('/api/categories', GoalCategoryController.add);

app.use((req, res) => {
    res.status(404).send({message: 'Not found'});
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({message: err.message});
};

app.use(errorMiddleware);

app.listen(port, async () => {
    await connect();
});

/*

async () => {
  console.log(
    await fetch('http://localhost:3000/api/categories').then((r) => r.json())
  );
};

async () => {
  console.log(
    await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(product),
    }).then((r) => r.json())
  );
}; */

// const categories = ['Бутылки', 'Посуда', 'Разное'];

// const addGoalCategoryInDb = async (GoalCategory) => {
//   console.log(
//     await fetch('http://localhost:3000/api/categories', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//       },
//       body: JSON.stringify({ title: GoalCategory }),
//     }).then((r) => r.json())
//   );
// };

// const addDb = async (item) => {
//   console.log(
//     await fetch('http://localhost:3000/api/products', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//       },
//       body: JSON.stringify({
//         title: item.title,
//         description: item.description,
//         imageUrl: item.thumbnail,
//         price: item.price,
//         GoalCategoryId: Math.floor(Math.random() * 3 + 1),
//       }),
//     }).then((r) => r.json())
//   );
// };
