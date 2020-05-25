import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// use bodyparser middleware for Post requests
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
    res.send('Hello!');
});

app.get('/hello/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}`);
});

app.post('/hello', (req, res) => {
    const name = req.body.name;
    res.send(`Hello ${name}!!!!`);
});

app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});