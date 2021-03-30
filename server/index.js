const express = require('express');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const { PORT } = require('./config/config');
const app = express();

require('./config/express')(app);
require('./config/mongoose');

app.use(errorHandlerMiddleware);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));