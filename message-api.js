//message-api
const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const app = express()
app.use(jsonParser)
const port = process.env.PORT || 3000
let messageCount = 1

app.post('/messages', (req, res, next) => {
    console.log('req.body.text is: ', req.body.text)
    if(messageCount===6){
        res.status(429).send({
            "message": "too many requests"
        })
    }else{
        if(typeof req.body.text === "undefined" || req.body.text === ""){
            res.status(400).send({
                "message": "text body required"
            })
        }else{
            messageCount++
            console.log(`The next message sent will be number ${messageCount}`)
            res.status(201).send({
                "message": "Message received loud and clear"
            })
        }
    }   
})
app.listen(port, console.log(`listening on port: ${port}`))
