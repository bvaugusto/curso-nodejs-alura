const uuid = require('uuid/v4')
const sessao = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const UsuarioDao = require('../app/infra/usuario-dao')
const db = require('./database')
const usuarioDao = new UsuarioDao(db)

module.exports = (app) => {

    //Configurando a sessão e autenticação
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordFiel: 'password'
        }, (email, senha, done) => {

            usuarioDao.buscaPorEmail(email)
                .then(usuario => {
                    if (!usuario || senha != usuario.senha) {
                        return done(null, false, {
                            message: 'Login e senha incorretos!'
                        })
                    }
                    return done(null, usuario)
                }).catch(error => done(error, false))
        }
    ))

    passport.serializeUser((usuario, done) => {
        const usuarioSessao = {
            nome: usuario.nome_completo,
            email: usuario.email
        }
        done(null, usuarioSessao)
    })

    passport.deserializeUser((usuarioSessao, done) => {
        done(null, usuarioSessao)
    })

    app.use(sessao({
        secret: 'node bruno',
        genid: (req) => {
            return uuid()
        },
        resave: false,
        saveUninitialized: false
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    app.use((req, resp, next) => {
        req.passport = passport
        next()
    })
}

