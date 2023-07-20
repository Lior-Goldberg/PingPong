const express = require('express');
const axios = require('axios');

const app = express();
const port = 5001;

app.use(express.urlencoded({ extended: true }));

let timeout = null

app.get('/sendPing', async (req, res) => {
    try {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(async () => {
            const response = await axios
                .get('http://localhost:5002/receivePing');

            console.log('msg from ping ==>', response.data);

        }, 5000);

        return res.status(200).send('Ping');

    } catch (error) {
        console.log(error);
        res.status(500).send('Error sending ping');
    }
});

app.listen(port, () => {
    console.log(`Server Ping is listening on port ${port}`);
});
