import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb'; 

// fake in-memory db
// const articlesInfo = {
//     'learn-react': { upvotes: 0, comments:[] },
//     'learn-node': { upvotes: 0, comments:[] },
//     'my-thoughts-on-resumes': { upvotes: 0, comments:[] },
// };

const app = express();

// use bodyparser middleware for Post requests
app.use(bodyParser.json());

// placeholder start
app.get('/hello', (req, res) => {
    res.send('Hello there!');
});

app.get('/hello/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}`);
});

app.post('/hello', (req, res) => {
    const name = req.body.name;
    res.send(`Hello ${name}!!!!`);
});
// placeholder end

app.post('/api/articles/:name/upvote', async (req,res) => {
    const articleName = req.params.name;
    try {
        const client = await MongoClient.connect(
            'mongodb://localhost:27017',
            { useNewUrlParser: true, useUnifiedTopology: true}    
        );
    
        const db = client.db('react-blog-db');
    
        const articleInfo = await db.collection('articles').findOne({ name: articleName });

        const currentUpvotes = articleInfo.upvotes;

        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                upvotes: currentUpvotes+1,
            }
        });

        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });

        client.close();
        if(!updatedArticleInfo) {
            return res.status(404).send(`Article with the name ${articleName} not found!`);
        }
    
        return res.status(200).json(updatedArticleInfo);
    }
    catch (e) {
        res.status(500).send('Something went wrong :(');
    }
});

app.post('/api/articles/:name/add-comment', async (req, res) => {
    // const articleName = req.params.name;
    // // { xyz } gets the req.body property value without property name
    

    // articlesInfo[articleName].comments.push(comment);
    
    // res.status(200).send(articlesInfo[articleName]);
    const articleName = req.params.name;
    const { comment } = req.body;
    try {
        const client = await MongoClient.connect(
            'mongodb://localhost:27017',
            { useNewUrlParser: true, useUnifiedTopology: true}    
        );
    
        const db = client.db('react-blog-db');
    
        const articleInfo = await db.collection('articles').findOne({ name: articleName });

        const currentUpvotes = articleInfo.upvotes;

        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                comments: articleInfo.comments.concat(comment),
            }
        });

        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });

        client.close();
        if(!updatedArticleInfo) {
            return res.status(404).send(`Article with the name ${articleName} not found!`);
        }
    
        return res.status(200).json(updatedArticleInfo);
    }
    catch (e) {
        res.status(500).send('Something went wrong :(');
    }
});

app.get('/api/article/:name', async (req,res) => {
    const articleName = req.params.name;
    try {
        const client = await MongoClient.connect(
            'mongodb://localhost:27017',
            { useNewUrlParser: true, useUnifiedTopology: true}    
        );
    
        const db = client.db('react-blog-db');
    
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        client.close();
        if(!articleInfo) {
            return res.status(404).send(`Article with the name ${articleName} not found!`);
        }
    
        return res.status(200).json(articleInfo);
    }
    catch (e) {
        res.status(500).send('Something went wrong :(');
    }
    
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});