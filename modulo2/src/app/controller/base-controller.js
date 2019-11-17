const templates = require('../views/template')
const LivroController = require('./livro-controller')

class BaseController {

    static routes() {
        return {
            home: '/',
            login: '/login'
        }
    }

    home() {
        return (req, resp) => {
            resp.marko(templates.base.home)
        }
    }

    login() {
        return (req, resp) => {
            resp.marko(templates.base.login)
        }
    }

    efetuaLogin() {
        return (req, resp, next) => {
            const passport = req.passport
            passport.authenticate('local', (error, ususario, info) => {
                if (info) {
                    return resp.marko(templates.base.login)
                }

                if (error) {
                    return next(error)
                }

                req.login(usuario, (error) => {
                    if (error) {
                        return next(error)
                    }

                    return resp.redirect(LivroController.routes().lista)
                })
            })(req, resp, next)
        }
    }
}

module.exports = BaseController