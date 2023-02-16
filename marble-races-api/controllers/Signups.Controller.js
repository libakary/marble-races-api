// vaata vene rühma projektist järele mis see tegema peaks
const {db} = require('../db.js');
const SignUps = db.signUps
const Competition = db.competitions
const Team = db.teams

exports.getAll = async (req,res) => {
    const signUps = await SignUps.findAll({
        include: { all: true },
        logging: console.log
    })
    console.log(signUps);
    let result = []
    result = signUps.map( (gp) => { 
        return {
            "teamName":gp.team.teamName,
            "competitionName": `${gp.competition.competitionName}`
        }
    }) 
    res.send(result)
}