

const rr = (win) => {
  const route = require('express').Router()
  const create = require('../middleware/createFIle')
  const choose = require('../middleware/chooseFile')
  const chooseAll = require('../middleware/chooseAll')
  const write = require('../middleware/write')
  const del = require('../middleware/deleteFIle')
  const path = require('path')
  const fs = require('fs')
  route.get('/create/chat', (req, res) => {
    const isTrue = create(req.query)
    if (isTrue) {
      res.send(`{
            "msg": "done",
            "name": "${req.query.name}",
            "id": "${req.query.id}"
        }`)
    }
  })
  const { app } = require('electron')
  const akPath = path.join(app.getPath('exe'), `../ak`)
  // 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
  route.get('/reboot', (req, res) => {
    const { execSync } = require('child_process')
    execSync(`rm -rf ${path.join(akPath, 'ak.txt')}`)
    // win.quit()
    res.send("1")
  })
  route.get('/checkAk', (req, res) => {
    const a = fs.existsSync(path.join(akPath, 'ak.txt'))
    if (a && fs.readFileSync(path.join(akPath, 'ak.txt'), 'utf-8').length > 0) {
      res.send("1")
    } else {
      res.send("2")
    }
  })
  route.get('/setAk', (req, res) => {
    fs.writeFileSync(path.join(akPath, 'ak.txt'), req.query?.id)
    // win.quit()
    res.send("1")
  })
  route.get('/choose/chat', (req, res) => {
    const data = choose(req.query)
    if (data) {
      res.send(data)
    }
  })
  route.get('/chooseall/chat', (req, res) => {
    const list = chooseAll()
    res.send(list);
  })
  route.post('/write', (req, res) => {
    write(req.body)
    res.send(`{
        "msg" : "good"
    }`)
  })

  route.delete('/delete/chat', (req, res) => {
    const a = del(req.body)
    if (a) {
      res.send("aa")
    }
  })






  route.get('/loginData', (req, res) => {
    res.send(`
      {
          "msg" : "Vicky_Test For hujiaqi"
        }
      `)
  })
  return route
}
module.exports = rr;