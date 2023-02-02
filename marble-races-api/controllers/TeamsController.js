const {db} = require('../db.js');
const Team = db.teams

exports.getAll = async(req, res)=>{
    const teams = await Team.findAll({attributes:["teamName"]})
    res.send(teams)
}

exports.getById = async (req,res)=> {
    const teams = await Team.findAll({where:{id: req.params.id}})
    res.send(teams)
}