const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(request, response){
    try{
    // Populate the user of each post
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        },
        options: {
            sort: '-createdAt'
        }
    });
    let users = await User.find({});

    return response.render('home', {
        title: "Codeial | Home",
        posts: posts,
        all_users: users
    });
    }catch(error){
        console.log(`Error: ${error}`);
        return;
    }
}