const instagramUsers = [
    {
      id: 1,
      username: 'user1',
      followers_count: 1000,
      following_count: 500,
      bio: 'Instagram enthusiast',
      website: 'https://www.instagram.com/user1',
      custom_field_engagement_duration: '2 minutes', // Custom field: Engagement Duration
      custom_field_behavior_after_engagement: 'Visited website', // Custom field: User Behavior After Engagement
    },
    {
      id: 2,
      username: 'user2',
      followers_count: 1500,
      following_count: 700,
      bio: 'Photographer and traveler',
      website: 'https://www.instagram.com/user2',
      custom_field_engagement_duration: '3 minutes', // Custom field: Engagement Duration
      custom_field_behavior_after_engagement: 'Made a purchase', // Custom field: User Behavior After Engagement
    },
  ];
  
  const instagramPosts = [
    {
      id: 1,
      username: 'user1',
      image_url: 'https://www.example.com/post1.jpg',
      caption: 'Beautiful sunset view 🌅',
      likes_count: 250,
      comments_count: 30,
      timestamp: '2023-10-01T15:00:00Z',
    },
    {
      id: 2,
      username: 'user2',
      image_url: 'https://www.example.com/post2.jpg',
      caption: 'Exploring the great outdoors ⛰️',
      likes_count: 320,
      comments_count: 45,
      timestamp: '2023-10-02T10:30:00Z',
    },
  ];
  
  const instagramAnalytics = [
    {
      id: 1,
      username: 'user1',
      engagement_type: 'like',
      engagement_count: 15,
      engagement_timestamp: '2023-10-01T16:00:00Z',
    },
    {
      id: 2,
      username: 'user1',
      engagement_type: 'comment',
      engagement_count: 3,
      engagement_timestamp: '2023-10-01T16:30:00Z',
    },
    {
      id: 3,
      username: 'user2',
      engagement_type: 'like',
      engagement_count: 12,
      engagement_timestamp: '2023-10-02T11:00:00Z',
    },
  ];
  
  module.exports = {
    instagramUsers,
    instagramPosts,
    instagramAnalytics,
  };
  