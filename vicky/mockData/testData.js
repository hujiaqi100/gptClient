const route = require('express').Router()
const create = require('../middleware/createFIle')
const choose = require('../middleware/chooseFile')
const chooseAll = require('../middleware/chooseAll')
const write = require('../middleware/write')
const del = require('../middleware/deleteFIle')

route.get('/aa/cc/mushroom', (req, res) => {
  res.send(`
    [
        {
          "name": "目录1",
          "id": "1-d",
          "parent": 0,
          "isRoot": true,
          "level": 1,
          "isOpen": true,
          "treeType": "vicky1",
          "isDir": true,
          "children": [
            {
              "name": "Netfix_clone_我很长长长长长长长长长长长长长长长",
              "id": "1-0",
              "isOpen": true,
              "parent": "1-d",
              "treeType": "vicky1",
              "onDelete": false,
              "isRoot": false,
              "level": 1,
              "isDir": false,
              "isActive": false
            }
          ]
        },
        {
          "name": "目录2",
          "id": "2-d",
          "parent": 0,
          "isOpen": true,
          "isRoot": true,
          "treeType": "vicky2",
          "isDir": true,
          "level": 1,
          "children": [
            {
              "name": "一级目录",
              "id": "2-d-0",
              "parent": "2-d",
              "isRoot": false,
              "isOpen": true,
              "isDir": true,
              "treeType": "vicky2",
              "level": 2,
              "children": [
                {
                  "name": "Vue_clone",
                  "id": "2-0-1",
                  "isOpen": true,
                  "parent": "2-d-0",
                  "treeType": "vicky2",
                  "onDelete": false,
                  "isRoot": false,
                  "level": 2,
                  "isDir": false,
                  "isActive": false
                },
                {
                  "name": "二级目录",
                  "id": "2-d-0-d-0",
                  "parent": "2-d-0",
                  "isRoot": false,
                  "isOpen": true,
                  "isDir": true,
                  "treeType": "vicky2",
                  "level": 3,
                  "children": [
                    {
                      "name": "Vue_clone",
                      "id": "2-0-0-0",
                      "isOpen": true,
                      "parent": "2-d-0-d-0",
                      "treeType": "vicky2",
                      "onDelete": false,
                      "isRoot": false,
                      "level": 3,
                      "isDir": false,
                      "isActive": false
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]`)
})
route.get('/aa/cc/clover', (req, res) => {
  res.send(`[
        {
          "name": "React_clone",
          "id": "1",
          "isOpen": true,
          "parent": "1",
          "treeType": "vicky3",
          "onDelete": false,
          "isRoot": false,
          "level": 1,
          "isDir": false,
          "isActive": false
        }
      ]`)
})
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
module.exports = route;