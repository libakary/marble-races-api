module.exports = (sequilize, Sequilize) => {
    const Competition = sequilize.define("competition", {
        id: {
            type: Sequilize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        competitionName: {
            type: Sequilize.STRING,
            allowNull: false,
            unique: true,
            validate:{
                notEmpty: true
            } 
        },
        date: {
            type: Sequilize.DATE,
            allowNull: false,
            validate:{
                notEmpty: true
            } 
        },
        trackType: {
            type: Sequilize.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            } 
        },
        numberOfTeams: {
            type: Sequilize.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true
            } 
        },
        registeredTeams: {
            type: Sequilize.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            } 
        },
        location: {
            type: Sequilize.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            } 
        },
        organizer: {
            type: Sequilize.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            } 
        }
    })
    return Competition
}