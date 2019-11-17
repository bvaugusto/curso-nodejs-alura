const { validationResult } = require('express-validator/check');

const LivroDao = require('../infra/livro-dao')
const db = require('../../config/database')

const livroDao = new LivroDao(db)

const templates = require('../views/template')

class LivroController {

    static routes() {
        return {
            autenticadas: '/livros*',
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id',
        }
    }

    lista() {
        return (req, resp) => {
            livroDao.lista()
                .then(livros => resp.marko(templates.livros.lista, {livros})
                ).catch(error => console.log(error))
        }
    }

    form() {
        return (req, resp) => {
            resp.marko(templates.livros.form, { livro: {'titulo':'', 'preco':'', 'descricao': ''} })
        }
    }

     formEdit() {
        return (req, resp) => {
            const id = req.params.id;
            livroDao.buscaPorId(id)
                .then(livro => resp.marko(templates.livros.form, {livro:livro})
                ).catch(error => console.log(error));
        }
    }

    formCreate() {
        return (req, resp) => {
            const erros = validationResult(req)

            if (!erros.isEmpty()) {
                return resp.marko(templates.livros.form, {
                    livro: {},
                    errosValidacao: erros.array()
                })
            }

            livroDao.adicionar(req.body)
                .then(resp.redirect(LivroController.routes().lista))
                .catch(error => console.log(error))
        }
    }

    formUpdate() {
        return (req, resp) => {
            const erros = validationResult(req)

            if (!erros.isEmpty()) {
                return resp.marko(templates.livros.form, {
                    livro: {},
                    errosValidacao: erros.array()
                })
            }

            livroDao.atualizar(req.body)
                .then(resp.redirect(LivroController.routes().lista))
                .catch(error => console.log(error))
        }
    }

    formDelete() {
        return (req, resp) => {
            const id = req.params.id;
            livroDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));

        }
    }
}

module.exports = LivroController
