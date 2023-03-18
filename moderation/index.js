const express = require('express');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');
// const axios = require('axios');
const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body

    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved'
        await axios.post('http://localhost:4005/events', {
            type,
            data: {
               id:data.id,
               postId: data.postId,
               status,
               content:data.content
            }
        })
    }
})

app.listen(4003, () => {
    console.log('Moderation is running on 4003')
})