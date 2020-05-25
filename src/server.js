import express from 'express';
import bodyParser from 'body-parser';

// fake in-memory db
const articlesInfo = {
    'learn-react': { upvotes: 0, comments:[] },
    'learn-node': { upvotes: 0, comments:[] },
    'my-thoughts-on-resumes': { upvotes: 0, comments:[] },
};

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

app.post('/api/articles/:name/upvote', (req,res) => {
    const articleName = req.params.name;
    articlesInfo[articleName].upvotes += 1;

    res.status(200).send(`Success! ${articleName} now has ${articlesInfo[articleName].upvotes} upvotes`);
});

app.post('/api/articles/:name/add-comment', (req, res) => {
    const articleName = req.params.name;
    // { xyz } gets the req.body property value without property name
    const { comment } = req.body;

    articlesInfo[articleName].comments.push(comment);
    
    res.status(200).send(articlesInfo[articleName]);
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});