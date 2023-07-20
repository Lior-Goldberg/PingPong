const express = require('express');
const axios = require('axios');

const app = express();
const port = 5002;

let timeout = null;

app.get('/receivePing', async (req, res) => {
    try {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(async () => {
            const response = await axios
                .get('http://localhost:5001/sendPing');

            console.log('msg from pong ==>', response.data);
        }, 5000);

        return res.status(200).send('Pong');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error receiving ping');
    }
});

app.listen(port, () => {
    console.log(`Server Pong is listening on port ${port}`);
});