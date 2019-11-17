const LivroController = require('../controller/livro-controller')
const livroController = new LivroController();

const routesLivro = LivroController.routes()

const Livro = require('../model/livro')

const BaseController = require('../controller/base-controller')

module.exports = (app) => {

    app.use(routesLivro.autenticadas, (req, resp, next) => {
        if (req.isAuthenticated()) {
            next()
        } else {
            resp.redirect(BaseController.routes().login)
        }
    })

    //Livro
    app.get(routesLivro.lista, livroController.lista())

    app.route(routesLivro.cadastro)
        .get(livroController.form())
        .post(Livro.validate(), livroController.formCreate())
        .put(Livro.validate(), livroController.formUpdate())

    app.get(routesLivro.edicao, livroController.formEdit());

    app.delete(routesLivro.delecao, livroController.formDelete());
}
