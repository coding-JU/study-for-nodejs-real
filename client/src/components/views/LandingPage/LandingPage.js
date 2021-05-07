import React,{useEffect} from 'react'
import axios from 'axios';

function LandingPage() {

    useEffect(() => {
        axios.get('/api/hello')
        //get request 를 서버로 api/hello endpoint를 통해 보냄
        .then(response => console.log(response.data))
        //response를 콘솔창에서 보여주게 함
    }, [])
    return (
        <div style={{
            display:'flex', justifyContent: 'center', alignItems: 'center'
            , width:'100%', height:'100vh'
        }}>
            <h2>LandingPage | 랜딩페이지 </h2>
        </div>
    )
}

export default LandingPage
