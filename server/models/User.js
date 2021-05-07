const mongoose = require('mongoose');
//몽구스 가져옴
const jwt =require('jsonwebtoken');
//jsonwebtoken 가져옴

const bcrypt = require('bcrypt');
const saltRounds = 10
const userSchema = mongoose.Schema({
//몽구스 활용 스키마 생성
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        //빈칸 없앰
        unique: 1
    },
    password: {
        type: String,
        maxlength: 100
    },
    lastname: {
        type: String,
        maxlength:50
    },
    role: {
        type:Number,
        default: 0
        //기본값
    },
    Image: String,
    token: {
        //유효성 관리
        type: String
    },
    tokenExp: {
        //유효기간
        type: Number
    }

})

//index.js 에서 user.save 전에 비밀번호 암호화하기
userSchema.pre('save', function( next ){
    //userSchema의 password 정보 사용위한 선언
    var user = this;

    //비밀번호가 변경 될 때만 실행
    if(user.isModified('password')){
        //비밀번호 암호화
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err)
            //에러 발생시 next로
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err)
                user.password = hash
                //성공시 hash 비밀번호로 변경
                next()
            })
        })
    } else {
        next()
        //패스워드 외 수정하면 next 로 넘어가서 작동
    }
})

//로그인할 때 입력과 암호화된 비밀번호와 비교 
userSchema.methods.comparePassword = function(plainPassword, cb){
    //plainPassword 1234567 암호화된 비밀번호 
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
    //입력 비밀번호와 암호화된 비밀번호 비교
        if(err) return cb(err);
        //비밀번호가 같지 않다면 에러 발생
        cb(null,isMatch)
        //비밀번호가 같다면 index.js로 이동
    })
}

//token 활용
userSchema.methods.generateToken = function(cb) {
    var user = this;
    //id 등 정보 사용 위함

    //jsonwebtoken을 이용해서 token을 생성
    var token = jwt.sign(user._id.toHexString(),'secretToken')
    // user._id + 'secretToken' = token
    user.token = token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null,user)
    })
}

//token 연결
userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err,decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음
        //클라이언트에 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token}, function(err,user){
            
            if(err) return cb(err);
            cb(null,user)

        })

    })
}



const User = mongoose.model('User', userSchema)
//스키마를 모델로 감싸줌
module.exports = { User }
//다른 파일에서도 사용 가능하게 export