module.exports = (sequelize, Sequelize, Team, Competition) => {
    const Signups = sequelize.define("signups", {

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

    Team.hasMany(Signups)
    Signups.belongsTo(Team)
    Competition.hasMany(Signups)
    Signups.belongsTo(Competition)
    
    return Signups
}