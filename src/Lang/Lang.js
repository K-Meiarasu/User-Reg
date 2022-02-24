import React, { useState } from 'react'
import axios from 'axios'

const Lang = () => {

    const [db, setdb] = useState('')
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const newUser=JSON.stringify({
            "user": user,
            "email": email
        }, null, 2)

    const editUser=JSON.stringify({
        "email":"default@gmail.com"
    }, null, 2)

    React.useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:3001/home',
          }).then((response)=>{
             setdb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });  
    },[])

    function register(){
        axios({
            method: 'post',
            url: 'http://localhost:3001/adduser',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            data: JSON.stringify({
                user:user,
                email:email
            })
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    function editEmail(){
        axios({
            method: 'post',
            url: 'http://localhost:3001/edit',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            data: JSON.stringify({
                "email":"default@gmail.com"
            })
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    function removeUser(){
        axios({
            method: 'get',
            url: 'http://localhost:3001/remove',
          }).then((response)=>{
            setdb(JSON.stringify(response.data, null, 2))
            console.log(response.data)
          });
    }

    return (
        <div>
            <div className="body"><br/>
                <div id='box'>
                    <h2>Enroll for the council</h2>
                    <form onSubmit={register}>
                        <input type="text" placeholder="Name..." value={user} onChange={(e) => setUser(e.target.value)}/><br/>
                        <input type="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
                        <button>Enroll</button>
                    </form>
                    <button onClick={editEmail}>Edit</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={removeUser}>Clear</button>
                </div><br/><hr/><br/>
                <div id="box">
                    <pre>{db}</pre>
                </div>
            </div>
        </div>
    )
}

export default Lang;