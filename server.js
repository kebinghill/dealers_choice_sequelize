const {
  syncAndSeed,
  models: { Artist, Venue, Performance },
} = require('./db/syncModel');
const express = require('express');
const path = require('path');

const app = express();

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/artist', async (req, res) => {
  try {
    res.send(await Artist.findAll());
  } catch (err) {
    console.log(err);
  }
});

app.get('/artist/performance/:id', async (req, res) => {
  try {
    res.send(await Performance.findAll({ include: [Venue] }));
  } catch (err) {
    console.log(err);
  }
});

const init = async () => {
  try {
    syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

init();
