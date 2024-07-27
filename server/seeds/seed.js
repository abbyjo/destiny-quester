const connection = require('../config/connection');
const { Gear } = require('../models');

const gearData = require('./gearData.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let gearCheck = await connection.db.listCollections({ name: 'gear' }).toArray();
  if (gearCheck.length) {
    await connection.dropCollection('gear');
  }

  // Add comics to the collection and await the results
  await Gear.insertMany(gearData);

  // Log out the seed data to indicate what should appear in the database
  console.log('Seeding complete! 🌱');
  process.exit(0);
});