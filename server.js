const {
  syncAndSeed,
  sequelize,
  models: { Artist, Venue, Performance },
} = require('./db/syncModel');
const express = require('express');
const path = require('path');

const app = express();

app.get('/', async (req, res) => {
  res.send(await Performance.findAll({ include: [Artist] }));
});

const init = async () => {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

init();
