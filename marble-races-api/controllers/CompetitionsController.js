const {db} = require('../db.js');
const Competition = db.competitions

exports.getAll = async(req, res)=>{
    const competitions = await Competition.findAll({attributes:["competitionName"]})
    res.send(competitions)
}

exports.getById = async (req,res)=> {
    const competitions = await Competition.findByPk(req.params.id)

    if (competitions == null) {
        res.status(404).send({"error":"Competition not Found"})
        return;
    }
    
    res.send(competitions)
}

exports.createNew = async (req, res) => {
    let competition 
    try {
        competition = await Competition.create(req.body)
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError) {
            res.status(400).send({"error": error.errors.map((item) => item.message)})
        } else {
            console.log("CompetitionsCreate: ",error)
            res.status(500).send({"error":"Something went wrong on our side. Sorry :("})
        }
        return
    }
    res 
        .status(201)
        .location(`${getBaseUrl(req)}/competitions/${competition.id}`)
        .json(competition)
}

getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encrypted ? "https" : "http") +
        `://${request.headers.host}`
    )
}
