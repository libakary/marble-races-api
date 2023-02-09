const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect:'mariadb',
        dialectOptions: {
            connectTimeout: 1000
        },
        define: {
            timestamps: false
        }
    }
)
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.teams = require('./models/Team.model')(sequelize, Sequelize)
db.competitions = require('./models/Competition.model')(sequelize, Sequelize)

async function Sync() {
    await sequelize.sync({alter: true}) //alter tabel
    //                   {force: true}  //erase and recreate
}
module.exports = {db, Sync}