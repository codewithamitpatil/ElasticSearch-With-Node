import express from 'express';
import cors from 'cors';
import httpErrors from 'http-errors';
import helmet from 'helmet';

import elasticClient from './db/elkConnection.js';
import {
    AddPost,
    DeleteByQuery,
    UpdateDocument,
    searchDocuments1,
    searchDocuments2
} from './service/elastic.js';


const port = 7000;
const app = express();


// enabel cors
app.use(cors('*'));

// enable helmet security rules
app.use(helmet());



// add post
app.post('/post', async (req, res, next) => {
    const temp = await AddPost({
        title: 'hello sumit',
        pid: 2,
        likes: 10
    })
    res.send('Post is added');
})

// delete post
app.delete('/post/:id', async (req, res, next) => {
    const id = req.params.id;
    const temp = await DeleteByQuery(id)
    res.send('Post is added');
})

// update post
app.put('/post/:id', async (req, res, next) => {
    const id = req.params.id;
    const dataObj = {
        title: "update title"
    }
    const temp = await UpdateDocument(id, dataObj);
    res.send('Post is updated');
})


// fetch all post
app.get('/post', async (req, res, next) => {
    const temp = await searchDocuments2()
    res.send(temp);
})

// search post
app.get('/post/:search', async (req, res, next) => {
    const query = req.params.search;
    const temp = await searchDocuments1(query)
    res.send(temp);
})

// centrilize error handler
app.use((err, req, res, next) => {
    res.status(err.status).send({
        message: err.message,
        status: err.status
    })
});


// main express server
const server = () => {
    app.listen(port, () => {
        console.log(`Server is listening on port :: ${port}`)
    });
}

server();