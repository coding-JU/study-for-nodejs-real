import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action'
import  {withRouter} from 'react-router-dom';
function LoginPage(props) {
    const dispatch = useDispatch();

    //props와 state 중 내부에서 주고 받는 데이터는 state를 사용
    //서버에 보내고자 하는 값을 state가 가지고 있는 것
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
                            //function 구조
        setEmail(event.currentTarget.value)
        //setEmail 이용해서 state을 바꾸어줌
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    
    const onSubmitHandler = (event) => {
        //페이지 리프레시 방지 
        event.preventDefault();


        //서버에 값을 보내는 것
        let body = {
            email:Email,
            password:Password
        }

        dispatch(loginUser(body))
            //로그인 완료시 홈으로
            .then(response => {
                if (response.payload.loginSuccess){
                    props.history.push('/')
                }else{
                    alert('Error')
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
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>

                <br />
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
