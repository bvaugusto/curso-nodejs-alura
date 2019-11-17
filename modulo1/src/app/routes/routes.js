const LivroDao = require('../infra/livro-dao')
const db = require('../../config/database')

module.exports = (app) => {
    
    app.get('/', (req, resp) => {
        resp.json({msg: 'Home'})
    })
    
    app.get('/livros', (req, resp) => {
        const livroDao = new LivroDao(db)
        livroDao.lista()
        .then(livros => resp.marko(
            require('../views/livros/lista/lista.marko'), {livros})
        ).catch(error => console.log(error))
    })

    app.get('/livros/form', (req, resp) => {
        //console.log('req', req, 'resp', resp);return;
        resp.marko(require('../views/livros/form/form.marko'), { livro: {} })
        //resp.marko(require('../views/livros/form/404.marko'), { livro: {} })
    })

    app.get('/livros/form/:id', function(req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);
 
        livroDao.buscaPorId(id)
                .then(livro => resp.marko(
                    require('../views/livros/form/form.marko'), {livro:livro})
                ).catch(error => console.log(error));
    });

    app.post('/livros', (req, resp) => {
        const livroDao = new LivroDao(db)

        livroDao.adicionar(req.body)
            .then(resp.redirect('/livros'))
            .catch(error => console.log(error))
    })

    app.put('/livros', (req, resp) => {
        const livroDao = new LivroDao(db)

        livroDao.atualizar(req.body)
            .then(resp.redirect('/livros'))
            .catch(error => console.log(error))
    })

    app.delete('/livros/:id', (req, resp) => {
        const id = req.params.id;
    
        const livroDao = new LivroDao(db);
        livroDao.remove(id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro));
    
    });
}
