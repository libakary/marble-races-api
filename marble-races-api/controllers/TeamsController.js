const {db} = require('../db.js')
const Team = db.teams

exports.getAll = async(req, res)=>{
    const teams = await Team.findAll({attributes:["teamName"]})
    res.send(teams)
}

exports.getById = async(req, res)=>{
    const teams = await Team.findByPk(req.params.id)
    if (teams === null) {
        res.status(404).send({error:"Team Not found!"})
        return
      }
    res.send(teams)
}

exports.createNew = async(req, res)=>{
    const teams = await Team.create(req.body)
    let team
  try {
    team = await Team.create(req.body)
  } catch (error) {
    if (error instanceof db.Sequelize.ValidationError) {
        res.status(400).send({"error":error.errors.map((item)=> item.message)})
    } else {
      console.log("TeamsCreate: ",error)
      res.status(500).send({"error":"Something went wrong on our side. Sorry :("})
    }
    return
  }

    res
    .status(201)
    .location(`${getBaseUrl(req)}/teams/${team.id}`)
    .json(team)
}

exports.deleteById = async(req, res) =>{
  let result
  try {
    const result = await Team.destroy({where: {id:req.params.id}})
  } catch (error) {
    console.log("TeamsDelete: ",error)
    res.status(500).send({"error":"Something went wrong"})
    return
  }
  if (result === 0) {
    res.status(404).send({error: "Game not found"})
    return
  }
  console.log(result)
  res.status(204).send({error:"no content"})
}

exports.updateById = async(req, res) =>{
  let result
  delete req.body.id
  try {
    const result = await Team.update(req.body,{where: {id:req.params.id}})
  } catch (error) {
    console.log("TeamsUpdate: ",error)
    res.status(500).send({"error":"Something went wrong"})
    return
  }
  if (result === 0) {
    res.status(404).send({error: "Game not found"})
    return
  }
  const teams = await Team.findByPk(req.params.id)
  res.status(200)
    .location(`${getBaseUrl(req)}/teams/${team.id}`)//.send({error:"no content"})
    .json(team)
}

getBaseUrl = (request) => {
  return (
    (/*request.connection &&*/ request?.connection?.encrypted ? "https" : "http") +
    `://${request.headers.host}`
  )
}