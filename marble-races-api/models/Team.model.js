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
        }

    })
return Team
}