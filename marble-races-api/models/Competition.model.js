module.exports = (sequilize, Sequilize) => {
    const Competition = sequilize.define('competition', {
        id: {
            type: Sequilize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        competitionName: {
            type: Sequilize.STRING,
            allowNull: false
        },
        date: {
            type: Sequilize.DATE,
            allowNull: false
        },
        trackType: {
            type: Sequilize.STRING,
            allowNull: false,
        },
        numberOfTeams: {
            type: Sequilize.INTEGER,
            allowNull: false,
        },
        registeredTeams: {
            type: Sequilize.STRING,
            allowNull: false
        },
        location: {
            type: Sequilize.STRING,
            allowNull: false
        },
        organizer: {
            type: Sequilize.STRING,
            allowNull: false
        }
    })
return Competition
}