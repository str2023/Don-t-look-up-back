const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const usersRouter = require('./src/routers/userRouter');
const weatherRouter = require('./src/routers/weatherRouter');
const outfitRouter = require('./src/routers/outfitRouter');
const kakaoRouter = require('./src/routers/kakaoRouter');
const locationRouter = require('./src/routers/locationRouter');
const activityRouter = require('./src/routers/activityRouter');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('돈룩업 백엔드 API');
});
app.use([usersRouter, weatherRouter, outfitRouter, activityRouter]);
app.use('/oauth', kakaoRouter);
app.use('/location', locationRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
