const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Define the CSV writer for analytics data
const analyticsCsvWriter = createCsvWriter({
  path: 'analytics.csv', // Output file path
  header: [
    { id: 'id', title: 'ID' },
    { id: 'username', title: 'Username' },
    // Add more fields as needed
  ],
});

// Define the CSV writer for scheduled post data
const scheduledPostCsvWriter = createCsvWriter({
  path: 'scheduled_posts.csv', // Output file path
  header: [
    { id: 'id', title: 'ID' },
    { id: 'username', title: 'Username' },
    // Add more fields as needed
  ],
});


// Write analytics data to CSV file
analyticsCsvWriter
  .writeRecords(analyticsData)
  .then(() => console.log('Analytics CSV file written.'));

// Write scheduled post data to CSV file
scheduledPostCsvWriter
  .writeRecords(scheduledPostsData)
  .then(() => console.log('Scheduled Posts CSV file written.'));
