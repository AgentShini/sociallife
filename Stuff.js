User
router.post("/Create",async(req,res)=>{
    try{
    const { username,content,platform,engagement} = req.body
    const user = await User.findOne({username})
    if(user){
        const userID = user._id
        await Post.create({user_id:userID,
        content:content, scheduled_time:Date.now(),
       social_media_platform:platform,
    });

    const post = await Post.findOne({user_id:userID})
    if(post){
        const ID = post.user_id
        await Analytics.create({
            post_id: ID,
            engagement_type:engagement,
            engagement_timestamp:Date.now(),
            user_id:userID
        });

    }else{
        res.status(401).json({message:"ERROR FINDING POST"})
    }
    }else{
        res.status(401).json({message:"User not found"})
    }
}catch(error){
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
}



})