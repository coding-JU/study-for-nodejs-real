const express = require('express')
//express 모듈 가져옴
const app = express()
//function 활용 새로운 express 앱 만듬


const bodyParser = require('body-parser');
//bodyParser 활용
//bodyParser가 client 에서 오는 정보를 분석해서 server에 가져옴
const { User } = require("./models/User");
//User.js 가져와서 활용
const cookieParser = require('cookie-parser');
//쿠키파서
const{ auth } = require('./middleware/auth');
//auth.js를 가져옴

app.use(bodyParser.urlencoded({extended: true}));
//url type 가져옴
app.use(bodyParser.json());
//json type 가져옴
app.use(cookieParser());
//쿠키파서


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://wooseok:1q2w3e4r@boilerplate.6pj3p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! 하하하위 gdgdg 12312')
})
//출력 메세지

//회원가입 (register)
app.post("/api/users/register", (req, res) => {
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

//로그인 (login)
app.post("/api/users/login", (req,res) => {

  //요청된 이메일을 db에서 있는지 찾는다.
  User.findOne({email: req.body.email}, (err,user) => {
  //findOne : 몽고db 제공 메소드 
    if(!user) {
      //만약 없으면
      return res.json({
        //json데이터로 loginSuccess가 false가 되고 메세지를 준다
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }


    //요청한 이메일이 db에서 있다면 비밀번호가 맞는지 확인한다.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
      return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})

      //비밀번호가 맞다면 토큰을 생성한다.
      user.generateToken((err,user) => {
        if(err) return res.status(400).send(err);

        //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 
          //쿠키 설치 PS C:\Users\wndnt\Documents\boiler-plate> npm install cookie-parser --save
        res.cookie("x_auth",user.token)
        .status(200)
        //성공시 클라이언트에게 메세지 전달
        .json({loginSuccess: true, userId: user._id}) 


      })
    })

  })
})

//권한(Auth)
app.get('/api/users/auth', auth , (req, res) => {
///api/users/auth request 받은 후 response 하기 전에 중간에서 작동하는 미들웨어

  //여기까지 미들웨어를 통과해왔다는 말은 Authentication이 True 라는 말
  res.status(200).json({
     _id: req.user._id,
     isAdmin: req.user.role === 0 ? false : true,
     isAuth: true,
     email: req.user.email,
     name: req.user.name,
     lastname: req.user.lastname,
     role: req.user.role,
     image: req.user.image
  })
})


//로그아웃(logout)
app.get('/api/users/logout',auth,(req,res) => {
//로그인 된 상태라서 auth 넣음, 콜백함수(res,req) 활용
  User.findOneAndUpdate({_id: req.user._id},
  // auth.js에서 찾음
    { token:""}
    //토큰을 지움
    ,(err,user) => {
     //콜백 function 
      if(err) return res.json({success:false,err});
      //에러 발생시
      return res.status(200).send({
      //성공시
        success: true
      })
    })
})

//client 최초 요청 처리
app.get('/api/hello', (req,res) => {
  res.send("안녕하세용~_~")
})

const port = 5000
//활용 포트
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})