const { path: folders } = require('./package.json');
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(folders.dist));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, folders.dist, 'index.html'));
});

console.log('server started on port:', PORT);
app.listen(PORT);