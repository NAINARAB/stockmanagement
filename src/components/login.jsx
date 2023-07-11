import './main.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Login = () => {
    const navigate = useNavigate();
    const mail = () => {
        emailjs.send('service_81bzvyx','template_4apvkde',{name:'Raj Nainaar',message:'Using Stock Management'},'JHrIm2aWoKh6sLS4b' )
        .then(res => {
            //console.log(res)
        })
        .catch(e => {
            console.log(e)
        })
    }
    return(
        <React.Fragment>
            <div className='login'>
                <div className='cntr'>
                    <h2 style={{color:'white',textAlign:'center'}}>Welcome To Stock Management</h2><br />
                    <center><button onClick={()=> {mail();navigate('/employee')}}>Let's Start</button></center>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Login