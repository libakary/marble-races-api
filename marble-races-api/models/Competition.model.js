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
            notEmpty: true
        },
        date: {
            type: Sequilize.DATE,
            allowNull: false,
            notEmpty: true
        },
        trackType: {
            type: Sequilize.STRING,
            allowNull: false,
            notEmpty: true
        },
        numberOfTeams: {
            type: Sequilize.INTEGER,
            allowNull: false,
            notEmpty: true
        },
        registeredTeams: {
            type: Sequilize.STRING,
            allowNull: false,
            notEmpty: true
        },
        location: {
            type: Sequilize.STRING,
            allowNull: false,
            notEmpty: true
        },
        organizer: {
            type: Sequilize.STRING,
            allowNull: false,
            notEmpty: true
        }
    })
return Competition
}