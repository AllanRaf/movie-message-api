const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const app = express()
app.use(jsonParser)
const port = 3000
let messageCount = 1
app.post('/messages', (req, res) => {
    if(messageCount===6){
        res.status(429).end()
    }else{
        if(typeof req.body.text === "undefined" || req.body.text === ""){
            res.status(400).end()
        }else{
            messageCount++
            res.status(201).send({
                "message": "Message received loud and clear"
            })
        }
    }   
})
app.listen(port)
