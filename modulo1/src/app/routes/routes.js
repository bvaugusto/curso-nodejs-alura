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
        resp.marko(require('../views/livros/form/form.marko'), { livro: {} })
    })

    app.post('/livros', (req, resp) => {
        console.log(req.body)
        const livroDao = new LivroDao(db)

        livroDao.adicionar(req.body)
            .then(resp.redirect('/livros'))
            .catch(error => console.log(error))
    })

    app.put('/livros', (req, resp) => {
        console.log(req.body)
        const livroDao = new LivroDao(db)

        livroDao.atualiza(req.body)
            .then(resp.redirect('/livros'))
            .catch(error => console.log(error))
    })

    app.get('/livros/form/:id', function(req, resp) {
        const { id } = req.params;
        const livroDao = new LivroDao(db);
 
        livroDao.buscaPorId(id)
                .then(livro => resp.marko(require('../views/livros/form/form.marko'), { livro }))
                .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', (req, resp) => {
        const id = req.params.id;
    
        const livroDao = new LivroDao(db);
        livroDao.remove(id)
            .then(() => resp.status(200).end())
            .catch(erro => console.log(erro));
    
    });
}
