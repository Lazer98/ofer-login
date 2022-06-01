const mongoose = require('mongoose');
const {config} = require("../config/secret");

main().catch(err => console.log(err));

async function main() {
  //await mongoose.connect('mongodb://localhost:27017/basmah_may_22');
  
  await mongoose.connect(`mongodb+srv://${config.mongoUser}:${config.mongoPass}@cluster0.alrk9.mongodb.net/basmah_may_22`);
  //await mongoose.connect('mongodb+srv://Lazer:1234@cluster0.alrk9.mongodb.net/basmah_may_22');


  console.log("mongo connect feb22 atlas...")
}