class LivroDao {
    
    constructor(db) {
        this._db = db
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros', 
                (err, resp) => {
                if (err) return reject('Não foi possível listar os livros!')
                
                return resolve(resp)
            })
        })
    }

    adicionar(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `INSERT INTO livros (titulo, preco, descricao) VALUES (?, ?, ?)`, 
                [livro.titulo, livro.preco, livro.descricao],
                err => {
                    if (err) {
                        console.log(err)
                        return reject('Não foi possível adicionar o livro!')
                    }
    
                    resolve()
                }
            )
        })
    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `SELECT * FROM livros WHERE id = ?`, 
                [id],
                (err, resp) => {
                    if (err) {
                        console.log('if err', err)
                        return reject('Não foi possível adicionar o livro!')
                    }
                    
                    resolve(resp)
                }
            )
        })
    }

    remove(id) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    DELETE 
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro) => {
                    if (erro) {
                        return reject('Não foi possível remover o livro!');
                    }
                    return resolve();
                }
            );
        });
    }
}

module.exports = LivroDao