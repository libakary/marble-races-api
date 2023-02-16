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
            notEmpty: true
        },
        nrOfTeammates: {
            type: Sequilize.INTEGER,
            allowNull: false,
            notEmpty: true
        },
        teamLeader: {
            type: Sequilize.STRING,
            allowNull: false,
            notEmpty: true
        },
        country: {
            type: Sequilize.STRING,
            allowNull: false,
            notEmpty: true
        }
    })
return Team
}