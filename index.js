const express = require('express'); // express.js 
const app = express();
const port = 8000;  //Port number where server localy hosts

// Hosting the server and handling rhe error in case of any problem occurs while hosting

app.listen(port, (err) => {
    if(err) {
        console.log('Error while hosting the server', err);
        return;
    }

    console.log(`Server is successfully up and running on port:${port}`);
})