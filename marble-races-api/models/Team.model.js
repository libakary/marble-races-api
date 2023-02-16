module.exports = (sequilize, Sequilize) => {
    const Team = sequilize.define('team', {
        id: {
            type: Sequilize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        teamName: {
            type: Sequilize.STRING,
            allowNull: false
        },
        nrOfTeammates: {
            type: Sequilize.INTEGER,
            allowNull: false
        },
        teamLeader: {
            type: Sequilize.STRING,
            allowNull: false,
        },
        country: {
            type: Sequilize.STRING,
            allowNull: false
        }
    })
return Team
}