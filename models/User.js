const mongoose = require('mongoose');
//몽구스 가져옴

const UserSchema = mongoose.Schema({
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
        maxlength: 50
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

const User = mongoose.model('User', userSchema)
//스키마를 모델로 감싸줌
module.exports = { User }
//다른 파일에서도 사용 가능하게 export