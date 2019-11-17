class UsuarioDao {
    constructor(db) {
        this._db = db
    }

    buscaPorEmail(email) {
        return new Promise((resolve, reject) => {
            this._db.get(
                'SELECT id, nome_completo, email, senha FROM usuarios WHERE email = ?',[email],
                (err, resp) => {
                    if (err) return reject('Usuário não encontrado!')
                    return resolve(resp)
                })
        })
    }
}

module.exports = UsuarioDao