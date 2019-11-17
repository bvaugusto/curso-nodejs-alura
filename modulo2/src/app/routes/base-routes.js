const BaseController = require('../controller/base-controller')
const baseController = new BaseController();

const routesBase = BaseController.routes()

module.exports = (app) => {

    //Home
    app.get(routesBase.home, baseController.home())

    app.route(routesBase.login)
        .get(baseController.login())
        .post(baseController.efetuaLogin())
}

