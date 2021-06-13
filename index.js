const cors = require('cors');
const express = require('express');
const got = require('got');
const app = express();
const port = process.env.PORT;

app.use(cors());

app.get('/', (req, res) => {
    res.json({
        "status": 200, 
        "message": "Success!"
    });
});

app.get('/api/:subreddit', (req, res) => {
    const subreddit = req.params.subreddit;
    
    got(`https://www.reddit.com/r/${subreddit}/random/.json`).then(response => {
        let meme = JSON.parse(response.body);

        if(meme[0] === undefined) {
            res.json({
                "success": false,
                "message": 'The requested resouce cannot be fetched or does not exist.'
            });
        }
        
        else {
            let title = meme[0].data.children[0].data.title;
            let linkIdentifier = meme[0].data.children[0].data.permalink;
            let url = 'https://www.reddit.com' + linkIdentifier;
            let image = meme[0].data.children[0].data.url;
            let upvotes = meme[0].data.children[0].data.ups;
            let downvotes = meme[0].data.children[0].data.downs;
            let comments = meme[0].data.children[0].data.num_comments;

            let memeData = {
                title:title, 
                url:url,
                image:image,
                upvotes:upvotes,
                downvotes:downvotes,
                comments:comments
            };

            let memeDataFormat = {
                success:true, 
                data:memeData
            };

            res.json(memeDataFormat); 
        }
    }).catch(error => {
        let errorHandler = new Promise((resolve, reject) => {
            reject(error);
            throw res.json({
                "success": false,
                "message": 'The requested resouce cannot be fetched or does not exist.'
            });
        });
        errorHandler.catch(error => {/* Error handled. */});
    });
}); 

app.get("*", (req, res) => {
    res.json({
        "status": 404,
        "message": 'Page not found.'
    });
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}.`);
});