// vaata vene rühma projektist järele mis see tegema peaks
const {db} = require('../db.js');
const signUps = db.signUps
const Competition = db.competitions
const Team = db.teams

exports.getAll = async (req,res) => {
    const SignUps = await signUps.findAll({
        include: [Competition, Team],
        logging: console.log
    })
    console.log(SignUps);
    let result = []
    result = SignUps.map( (gp) => { 
        return {
          "id":gp.id,
            "teamName":gp.team.teamName,
            "competitionName": `${gp.competition.competitionName}`
        }
    }) 
    res.send(result)
}
exports.createNew = async(req, res)=>{
    let SignUps
  try {
    SignUps = await signUps.create(req.body)
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
    .location(`${getBaseUrl(req)}/signups/${SignUps.id}`)
    .json(SignUps)
}

exports.deleteById = async(req, res) =>{
  let result
  try {
    result = await signUps.destroy({where: {id:req.params.id}})
  } catch (error) {
    console.log("signUpsDelete: ",error)
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