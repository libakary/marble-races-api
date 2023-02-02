const {db} = require('../db.js');
const Team = db.teams

exports.getAll = async(req, res)=>{
    const teams = await Team.findAll({attributes:["teamName"]})
    res.send(teams)
}

exports.getById = async(req, res)=>{
    const teams = await Team.findByPk(req.params.id)
    if (teams === null) {
        res.status(404).send({"error":"Not found!"})
        return;
      }
    res.send(teams)
}

exports.createNew = async(req, res)=>{
    console.log(req.body)
    res.send(req.body)
}