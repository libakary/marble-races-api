const {db} = require('../db.js');
const Competition = db.competitions

exports.getAll = async(req, res)=>{
    const competitions = await Competition.findAll({attributes:["competitionName"]})
    res.send(competitions)
}

exports.getById = async (req,res)=> {
    const competitions = await Competition.findByPk(req.params.id)

    if (competitions == null) {
        res.status(404).send({"error":"Not Found"})
        return;
    }
    
    res.send(competitions)
}