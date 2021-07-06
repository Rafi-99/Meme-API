# Meme API

## About
A simple Node.js Web API I created for fetching memes off [Reddit.](Reddit.com/r/memes) Each GET request to my API returns a new random meme in JSON format.

## How It Works
1. My API uses the [GOT](https://www.npmjs.com/package/got) HTTP request library to parse the following URL: https://www.reddit.com/r/{insert_a_subreddit_name_here}/random.json

2. Relevant information is retrieved from the URL such as the meme's title, image URL, upvotes, downvotes, and comments.

3. My API then uses that relevant information to construct a JSON object that is returned to the user in an easy-to-read format.

Note: My API will work for most subreddits. Obviously it will return an error if you try to access a subreddit that doesn't exist.
Banned and NSFW subreddits will not work either since Reddit returns an error code if you try to access them. 

## Example Endpoints
* [/api/memes](https://meme-api-node-js.herokuapp.com/api/memes)
* [/api/dankmemes](https://meme-api-node-js.herokuapp.com/api/dankmemes)
* [/api/prequelmemes](https://meme-api-node-js.herokuapp.com/api/prequelmemes)
* [/api/terriblefacebookmemes](https://meme-api-node-js.herokuapp.com/api/terriblefacebookmemes)
* [/api/wholesomememes](https://meme-api-node-js.herokuapp.com/api/wholesomememes)
* [/api/deepfriedmemes](https://meme-api-node-js.herokuapp.com/api/deepfriedmemes)
* [/api/surrealmemes](https://meme-api-node-js.herokuapp.com/api/surrealmemes)
* [/api/funny](https://meme-api-node-js.herokuapp.com/api/funny)
* [/api/lastimages](https://meme-api-node-js.herokuapp.com/api/lastimages)
* [/api/memeeconomy](https://meme-api-node-js.herokuapp.com/api/memeeconomy)
