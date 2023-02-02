const teamsController = require('../controllers/TeamsController.js');
const competitionsController = require('../controllers/CompetitionsController.js');

module.exports = (app) => {
    app.route("/teams")
        .get(teamsController.getAll)
    //    .post(teamsController.createNew);       //create
    app.route("/teams/:id")
        .get(teamsController.getById)           //read
    //    .put(teamsController.updateById)        //update
    //    .delete(teamsController.deleteById);    //delete
    //app.route("/competitions")

    app.route("competitions")
        .get(competitionsController.getAll)
    app.route("/competitions/:id")
        .get(competitionsController.getById) //read
}