const teamsController = require('../controllers/TeamsController.js');

module.exports = (app) => {
    app.route("/teams")
        .get(teamsController.getAll)
        /* .post(teamsController.createNew);       //create
    app.route("/teams/:id")
        .get(teamsController.getById)           //read
        .put(teamsController.updateById)        //update
        .delete(teamsController.deleteById);    //delete
    app.route("/competitions") */

}