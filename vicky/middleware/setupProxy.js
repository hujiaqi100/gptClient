const request = require('request')
const proxyJSON = require('./proxy.json')
const config = require('../config.js')
const _ = require('lodash')
const superagent = require('superagent')
const findBackEndAddr = (path) => {
    let host;
    const instance = config().backend
    const tmp = path.split('\/').filter(Boolean)
    Object.keys(instance).forEach((val, idx) => {
        if (tmp.length > 0 && tmp[0] === val) {
            host = instance[val]
        }
    })
    return host
}
const findRequestPath = (path) => {
    const tmp = path.split('\/').filter(Boolean)
    if (tmp.length > 1) {
        return _.get(proxyJSON, `${tmp[0]}.${tmp[1]}`, void 0)
    }
    return void 0
}
const fs = require('fs')
const $path = require('path')
module.exports = function (app) {
    app.use(async (req, res, next) => {
        if (req.path === '/favicon.ico') next()
        const host = findBackEndAddr(req.path)
        const path = findRequestPath(req.path)
        if (req.method == 'GET') {
            if (host && path) {
                const url = `${host}${path}?id=${req.query.id}&name=${req.query.name}`
                request.get(url, (err, data) => {
                    res.send(data?.body ?? null)
                })
            } else {
                next()
            }
        } else if (req.method == 'POST') {
            if (host && path) {
                if (path == '/write') {
                    superagent
                        .post(host + path)
                        .send(req.body)
                        .end((err, ress) => {
                            res.send("aa")
                        });
                } else {
                    const { app } = require('electron')
                    const akPath = $path.join(app.getPath('exe'), `../ak`)
                    let ak;
                    if (fs.existsSync($path.join(akPath, 'ak.txt'))) {
                        ak = fs.readFileSync($path.join(akPath, 'ak.txt'), 'utf-8')
                    } else {
                        ak = ""
                    }
                    const { Configuration, OpenAIApi } = require("openai");
                    const configuration = new Configuration({
                        apiKey: ak,
                    });
                    const openai = new OpenAIApi(configuration);
                    openai.createChatCompletion(req.body).then(data => {
                        res.send(data?.data?.choices[0])
                    }).catch(e => {
                        res.send(new Error(e).message)
                    })
                }

            } else {
                next()
            }
        } else if (req.method == 'DELETE') {
            if (host && path) {
                superagent
                    .delete(host + path)
                    .send(req.body) // 请求体 (request payload)
                    .end((err, ress) => {
                        res.send("aa")
                    });
            } else {
                next()
            }
        }
        else {
            next()
        }
    })
}