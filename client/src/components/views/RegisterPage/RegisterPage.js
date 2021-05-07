import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action'
import  {withRouter} from 'react-router-dom';

function RegisterPage(props) {
    const dispatch = useDispatch();

    //props와 state 중 내부에서 주고 받는 데이터는 state를 사용
    //서버에 보내고자 하는 값을 state가 가지고 있는 것
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
                            //function 구조
        setEmail(event.currentTarget.value)
        //setEmail 이용해서 state을 바꾸어줌
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    
    const onSubmitHandler = (event) => {
        //페이지 리프레시 방지 
        event.preventDefault();

        //비밀번호, 비밀번호 확인 
        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }


        //서버에 값을 보내는 것
        let body = {
            email: Email,
            name: Name,
            password: Password
        }

        //redux 사용하지 않으면 axios 활용해서 구현-
        //axios.post('/api/users/register', body) 

        dispatch(registerUser(body))
            //회원가입 완료시 로그인 페이지로 이동
            .then(response => {
                if(response.payload.success){
                    props.history.push("/login")
                } else{
                    alert("Failed to sign up")
                }
            })
    }

    return (
        <div style={{
            display:'flex', justifyContent: 'center', alignItems: 'center'
            , width:'100%', height:'100vh'
        }}>
            <form style={{display:'flex',flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>

                <br />
                <button>
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
