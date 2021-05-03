const express = require('express')
//express 모듈 가져옴
const app = express()
//function 활용 새로운 express 앱 만듬
const port = 3000
//활용 포트

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://wooseok:1q2w3e4r@boilerplate.6pj3p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 하하하위')
})
//출력 메세지

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})