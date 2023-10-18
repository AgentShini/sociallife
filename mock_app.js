const express = require('express');
const app = express();
// Mock Twitter API
var mockTwitterApi = require('./mock_api/index');
var instaMockApi = require('./routes/insta_routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount mock Twitter API with a base path
app.use('/api/twitter', mockTwitterApi);
app.use('/api/instagram', instaMockApi);

app.listen(3001, () => {
  console.log('Express app is running on port 3001');
});
