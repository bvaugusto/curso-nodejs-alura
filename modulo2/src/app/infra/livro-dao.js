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
                    if (err) return reject('Não foi possível adicionar o livro!')
                    return resolve()
                }
            )
        })
    }

    atualizar(livro) {
        console.log('livro', livro);
        return new Promise((resolve, reject) => {
            this._db.run(
                `UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?`,
                [livro.titulo, livro.preco, livro.descricao, livro.id],
                (err, resp) => {
                    if (err) return reject('Não foi possível adicionar o livro!')
                    return resolve(resp)
                }
            )
        })
    }

    buscaPorId(id) {
        let sql = `SELECT * FROM livros WHERE id = ${id}`;
        return new Promise((resolve, reject) => {
            this._db.all(`SELECT * FROM livros WHERE id = ?`,[id],
                (err, resp) => {
                    if (err) return reject('Não foi possível adicionar o livro!')
                    resolve(resp[0])
                }
            )
        })
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `DELETE FROM livros WHERE id = ?`, [id],
                (erro) => {
                    if (erro) return reject('Não foi possível remover o livro!');
                    return resolve();
                }
            );
        });
    }
}

module.exports = LivroDao