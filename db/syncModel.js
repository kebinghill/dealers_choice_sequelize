const { Sequelize, DataTypes, Model, UUID, UUIDV4 } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/dealers_choice'
);

class Artist extends Model {}
Artist.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
  },
  { sequelize, modelName: 'artist' }
);

class Venue extends Model {}
Venue.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: 'venue' }
);

class Performance extends Model {}
Performance.init({}, { sequelize, modelName: 'performance' });

Performance.belongsTo(Artist);
Performance.belongsTo(Venue);

const syncAndSeed = async () => {
  try {
    await sequelize.sync({ force: true });

    const [jimi, amy, jim, janis] = await Promise.all([
      Artist.create({ first_name: 'Jimi', last_name: 'Hendrix' }),
      Artist.create({ first_name: 'Amy', last_name: 'Winehouse' }),
      Artist.create({ first_name: 'Jim', last_name: 'Morrison' }),
      Artist.create({ first_name: 'Janis', last_name: 'Joplin' }),
    ]);

    const [turkey, hawley, marquee, capitol] = await Promise.all([
      Venue.create({
        name: 'The Turkey Joint West',
        location: 'Santa Monica, California',
      }),
      Venue.create({
        name: 'The Hawley Arms',
        location: 'Camden, London',
      }),
      Venue.create({
        name: 'Marquee Club',
        location: 'City of Westminster, London',
      }),
      Venue.create({
        name: 'The Capitol Theatre',
        location: 'Port Chester, New York',
      }),
    ]);

    const performances = await Promise.all([
      Performance.create({ artistId: jimi.id, venueId: marquee.id }),
      Performance.create({ artistId: amy.id, venueId: hawley.id }),
      Performance.create({ artistId: janis.id, venueId: capitol.id }),
      Performance.create({ artistId: jim.id, venueId: turkey.id }),
    ]);
  } catch (error) {
    console.log(error);
  }
};

syncAndSeed();

module.exports = {
  syncAndSeed,
  sequelize,
  models: {
    Artist,
    Venue,
    Performance,
  },
};
