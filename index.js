const express = require('express')
//express 모듈 가져옴
const app = express()
//function 활용 새로운 express 앱 만듬
const port = 3000
//활용 포트

const bodyParser = require('body-parser');
//bodyParser 활용
//bodyParser가 client 에서 오는 정보를 분석해서 server에 가져옴
const { User } = require("./models/User");
//User.js 가져와서 활용


app.use(bodyParser.urlencoded({extended: true}));
//url type 가져옴
app.use(bodyParser.json());
//json type 가져옴

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://wooseok:1q2w3e4r@boilerplate.6pj3p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 하하하위 gdgdg 12312')
})
//출력 메세지

app.post('/register', (req, res) => {
    //회원 가입 할 때 필요한 정보들을 client에서 가져오면 DB에 넣어주는 기능
    
    const user = new User(req.body)
    //bodyParser 활용해서 req.body에 정보 저장

    user.save((err, userInfo) => {
    //save : mongoDB 메소드
        if(err) return res.json({ success: false, err})
        //저장시 에러발생하면 client에 json 형식으로 false 및 err 전달
        return res.status(200).json({
        //성공시 status200(성공)을 json 형식으로 true 전달
            success: true
        })
    })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})