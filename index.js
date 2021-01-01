const express = require('express');
const got = require('got');
const app = express();
let port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Success!");
});

app.get('/memes', (req, res) => {
    got('https://www.reddit.com/r/memes/random/.json').then(response => {
        let meme = JSON.parse(response.body);
        let title = meme[0].data.children[0].data.title;
        let linkIdentifier = meme[0].data.children[0].data.permalink;
        let url = 'https://www.reddit.com' + linkIdentifier;
        let image = meme[0].data.children[0].data.url;
        let upvotes = meme[0].data.children[0].data.ups;
        let downvotes = meme[0].data.children[0].data.downs;
        let comments = meme[0].data.children[0].data.num_comments;

        var memeData = {
            title:title, 
            url:url,
            image:image,
            upvotes:upvotes,
            downvotes:downvotes,
            comments:comments
        };

        var memeDataFormat = {
            success:true, 
            data:memeData
        };

        var string = JSON.stringify(memeDataFormat);
        var output = JSON.parse(string);

        res.send(output);
        
    }).catch(console.log);
});

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
});