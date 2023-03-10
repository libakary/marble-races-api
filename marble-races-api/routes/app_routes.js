const teamsController = require('../controllers/TeamsController.js');
const competitionsController = require('../controllers/CompetitionsController.js');
const signUpsController = require('../controllers/Signups.Controller.js');

module.exports = (app) => {
    app.route("/teams")
        .get(teamsController.getAll)
        .post(teamsController.createNew);       //create
    app.route("/teams/:id")
        .get(teamsController.getById)           //read
        .put(teamsController.updateById)        //update
        .delete(teamsController.deleteById);    //delete

    app.route("/competitions")
        .get(competitionsController.getAll)
        .post(competitionsController.createNew);
    app.route("/competitions/:id")
        .get(competitionsController.getById) //read
        .put(competitionsController.updateById)
        .delete(competitionsController.deleteById);

    app.route("/signUps")
        .get(signUpsController.getAll)
}