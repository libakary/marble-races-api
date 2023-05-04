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
exports.createNew = async(req, res)=>{
    let signUps
  try {
    signUps = await SignUps.create(req.body)
  } catch (error) {
    if (error instanceof db.Sequelize.ValidationError) {
        res.status(400).send({error:error.errors.map((item)=> item.message)})
    } else if (error instanceof db.Sequelize.ForeignKeyConstraintError) {
      res.status(400).send({"error": `Table:${error.table} does not contain row with`})
    } else {
      console.log("SignUpsCreate: ",error)
      res
      .status(500)
      .send({error:"Something went wrong on our side. Sorry :("})
    }
    return
  }

    res
    .status(201)
    .location(`${getBaseUrl(req)}/signups/${signups.id}`)
    .json(signUps)
}

exports.deleteById = async(req, res) =>{
  let result
  try {
    result = await Signups.destroy({where: {id:req.params.id}})
  } catch (error) {
    console.log("SignUpsDelete: ",error)
    res.status(500).send({error:"Something went wrong"})
    return
  }
  if (result === 0) {
    res.status(404).send({error: "SignUp not found"})
    return
  }
  console.log(result)
  res.status(204).send({error:"no content"})
}