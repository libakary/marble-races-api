const db = require('../db.js');
const Team = db.teams

exports.getAll = async(req, res)=>{
    const teams = await Team.findAll()
    res.send(teams)
}