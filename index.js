import cors from 'cors';
import express from 'express';
import got from 'got';

const app = express();
const port = process.env.PORT;

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Success!'
    });
});

app.get('/api/:subreddit', (req, res) => {
    const subreddit = req.params.subreddit;

    got(`https://www.reddit.com/r/${subreddit}/random/.json`).then(response => {
        const meme = JSON.parse(response.body);

        if(meme[0] === undefined) {
            res.status(404).json({
                success: false,
                message: 'The requested resouce cannot be fetched or does not exist.'
            });
        }

        else {
            const { title, permalink, url: image, ups: upvotes, downs: downvotes, num_comments: comments } = meme[0].data.children[0].data;

            const memeData = {
                title: title,
                url: `https://www.reddit.com${permalink}`,
                image: image,
                upvotes: upvotes,
                downvotes: downvotes,
                comments: comments
            };

            const memeDataFormat = {
                success: true,
                data: memeData
            };

            res.status(200).json(memeDataFormat);
        }
    }).catch(error => {
        const errorHandler = new Promise((resolve, reject) => {
            reject(error);
            throw res.status(404).json({
                success: false,
                message: 'The requested resouce cannot be fetched or does not exist.'
            });
        });
        errorHandler.catch(error => {/* Error handled. */});
    });
});

app.get("*", (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}.`);
});