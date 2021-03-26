const express = require('express');
const port = 3001;
const app = express();

require('./config/express')(app);

app.listen(port, () => console.log(`Listening on port ${port}`));