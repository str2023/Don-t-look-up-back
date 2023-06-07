// import { rest } from 'msw';

// const users = [
//     { id: 1, nickname: '철수', gender: 'Male', birthdate: '1999-01-01' },
//     { id: 2, nickname: '영희', gender: 'Female', birthdate: '1990-02-14' },
// ];

// const posts = [
//     { id: 1, userId: 1, content: 'Hello, world!' },
//     { id: 2, userId: 2, content: 'This is a mock post.' },
// ];

// export const handlers = [
//     rest.get('/api/users', (req, res, ctx) => {
//         return res(ctx.status(200), ctx.json(users));
//     }),

//     rest.get('/api/posts', (req, res, ctx) => {
//         return res(ctx.status(200), ctx.json(posts));
//     }),

//     rest.post('/api/posts', (req, res, ctx) => {
//     const newPost = { id: Date.now(), ...req.body };
//     posts.push(newPost);
//     return res(ctx.status(201), ctx.json(newPost));
//     }),
// ];