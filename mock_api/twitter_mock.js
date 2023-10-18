const mockUsers = [
    {
      id: 'user1',
      username: 'user1',
      followers_count: 1000,
      tweets_count: 500,
      location: 'New York',
      description: 'A passionate Twitter user.',
    },
    {
      id: 'user2',
      username: 'user2',
      followers_count: 1500,
      tweets_count: 600,
      location: 'Los Angeles',
      description: 'Twitter enthusiast and marketer.',
    },
  ];
  
  const mockTweets = [
    {
      id: 'tweet1',
      user_id: 'user1',
      text: 'Mock Tweet 1',
      likes_count: 50,
      retweets_count: 20,
      created_at: '2023-10-12T12:00:00Z',
      hashtags: ['mock', 'testing', 'tweet'],
      mentions: ['user2'],
      media: [
        { type: 'image', url: 'https://example.com/image1.jpg' },
        { type: 'video', url: 'https://example.com/video1.mp4' },
      ],
    },
    {
      id: 'tweet2',
      user_id: 'user2',
      text: 'Mock Tweet 2',
      likes_count: 70,
      retweets_count: 30,
      created_at: '2023-10-12T13:00:00Z',
      hashtags: ['mock', 'data', 'tweet'],
      mentions: ['user1'],
      media: [],
    },
  ];
  
  const mockFollowers = [
    { id: 'follower1', user_id: 'user1', follower_id: 'user2' },
    { id: 'follower2', user_id: 'user2', follower_id: 'user1' },
  ];
  
  const mockAnalytics = [
    {
      id: 'analytics1',
      user_id: 'user1',
      tweet_id: 'tweet1',
      impressions: 10000,
      engagements: 500,
      clicks: 200,
      comments: 30,
    },
    {
      id: 'analytics2',
      user_id: 'user2',
      tweet_id: 'tweet2',
      impressions: 12000,
      engagements: 600,
      clicks: 250,
      comments: 40,
    },
  ];
  
  module.exports = { mockUsers, mockTweets, mockFollowers, mockAnalytics };
  