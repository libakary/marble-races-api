module.exports = (sequelize, Sequelize, Team, Competition) => {
    const Signups = sequelize.define("Signups", {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        teamId: {
            type: Sequelize.INTEGER,
            references: {
                model: Team,
                key: "id",
            },
        },
        competitionId: {
            type: Sequelize.INTEGER,
            references: {
                model: Competition,
                key: "id",
            },
        },
    })
    Team.belongsToMany(Competition, { through: Signups })
    Competition.belongsToMany(Team, { through: Signups })
    return Signups
}