const { Sequelize } = require('sequelize')
const {db} = require('../db.js');
const Competition = db.competitions
const SignUps = db.signUps
const Team = db.teams

exports.getAll = async(req, res)=>{
    const competitions = await Competition.findAll({
      attributes:["id", "competitionName"]})
    res.send(competitions)
}

exports.getById = async (req,res)=> {
    const competitions = await Competition.findByPk(req.params.id, {
      include:{
        model: SignUps,
        attributes:["id"],
        include: {
          model: Team,
          attributes:["id", "teamName", "teamLeader"]
        }
      }
    })

    if (competitions === null) {
        res.status(404).send({error:"Competition not Found!"})
        return
    }
    
    res.send(competitions)
}

exports.createNew = async (req, res) => {
    let competition 
    try {
      competition = await Competition.create(req.body)
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError) {
            res.status(400).send({error: error.errors.map((item) => item.message)})
        } else {
            console.log("CompetitionsCreate: ",error)
            res.status(500).send({error:"Something went wrong on our side. Sorry :("})
        }
        return
    }
    res 
        .status(201)
        .location(`${getBaseUrl(req)}/competitions/${competition.id}`)
        .json(competition)
}

exports.updateById = async(req, res) =>{
    let result
    delete req.body.id
    try {
      result = await Competition.update(req.body,{where: {id:req.params.id}})
    } catch (error) {
        console.log("CompetitionsUpdate: ",error)
        res.status(500).send({error:"Something went wrong on our side, sorry :("})
      return
    }
    if (result === null) {
      res.status(404).send({error: "Competition not found"})
      return
    }
    const competition = await Competition.findByPk(req.params.id)
    if (competition === null) {
      res.status(404).send({error: "Competition not found"})
      return
    }
    res.status(200)
        .location(`${getBaseUrl(req)}/competitions/${competition.id}`)
        .json(competition)
  }
  
exports.deleteById = async(req, res) =>{
    let result
    try {
      result = await Competition.destroy({where: {id:req.params.id}})
    } catch (error) {
      console.log("CompetitionsDelete: ",error)
      res.status(500).send({error:"Something went wrong"})
      return
    }
    if (result === 0) {
      res.status(404).send({error: "Competition not found"})
      return
    }
    console.log(result)
    res.status(204).send({error:"no content"})
  }

getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encrypted ? "https" : "http") +
        `://${request.headers.host}`
    )
}

exports.getTrackTypes = async(req, res) => {
  const competitions = await Competition.findAll({
    attributes: ["trackType"],
    //[Sequelize.fn("distinct", Sequelize.col("trackType")),"trackType"]]})
    //"trackType"], distinct: true, col:"trackType"})
    order: [
      ["trackType"]
    ]
    })
    console.log(competitions.map(competition =>competition.trackType));
  res.send([... new Set(competitions.map(competition =>competition.trackType))])
}
