module.exports = (sequilize, Sequilize) => {
    const Team = sequilize.define('team', {
        id: {
            type: Sequilize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        teamName: {
            type: Sequilize.STRING,
            allowNull: false,
            unique: true,
            validate:{
                notEmpty: true
            }  
        },
        nrOfTeammates: {
            type: Sequilize.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            } 
        },
        teamLeader: {
            type: Sequilize.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            } 
        },
        country: {
            type: Sequilize.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            } 
        }
    })
return Team
}