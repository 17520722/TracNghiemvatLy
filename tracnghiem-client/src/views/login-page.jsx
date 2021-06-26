import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../images/t.png'
import { inputBackground, primary, validColor } from '../constants/GlobalStyle'
import { signIn } from '../graphql/user.service'
import { useDispatch } from 'react-redux'
import { set_show_toast, set_toast } from '../actions/Toast'
import { useHistory } from 'react-router-dom'

const Container = styled.div`
     margin: 5% auto 0 auto;
     padding: 2rem;
     width: 600px;
     border-radius: 5px;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;

`

const Logo = styled.div`
     margin-bottom: 3rem;

     img {
          max-width: 108px;
          max-height: 108px;
     }
`

const LoginForm = styled.form`
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
`

const InputGroup = styled.div`
     display: flex;
     flex-direction: column;
     margin-bottom: 2rem;
     position: relative;

     label {
          position: absolute;
          color: gray;
          transition: 0.2s;
          transform: translate(1rem, 0.6rem);
     }

     input {
          width: 300px;
          height: 3rem;
          padding-left: 1rem;
          padding-right: 1rem;
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: none;
          /* border-bottom: 0.3rem solid gray; */
          border-radius: 8px;
          background-color: ${ inputBackground };
          outline: none;
          
          :placeholder-shown + label {

          }

          :not(:placeholder-shown) + label,
          :focus + label {
               opacity: 1;
               transform: translate(0.5rem, -0.8rem);
               font-size: 0.8rem;
          }

          :not(:focus)::placeholder{
               opacity: 0;
          }

          :valid {
               /* border-bottom: 0.3rem solid ${ validColor }; */
               background-color: #def8ce;
          }
     }

`
const SubmitButton = styled.button`
     background-color: ${ primary };
     padding: 0.5rem 1.5rem;
     margin: 1rem;
     color: white;
     cursor: pointer;
`

const SmallText = styled.div`
     font-size: 0.8rem;
     color: gray;
`

const ForgotLink = styled.a`
     margin: 0.5rem;
`

const RegisterLink = styled.a`
     color: ${ primary };
     margin: 0.5rem;
`

const LoginPage = () => {
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const dispatch = useDispatch();
     const history = useHistory();

     function onChangeUsername(e) {
          setUsername(e.target.value);
     }

     function onChangePassword(e) {
          setPassword(e.target.value);
     }

     async function onSubmitSignIn(e) {
          e.preventDefault();
          signIn(username, password).then(response => response.text()).then(result => {
               let data = JSON.parse(result);
               console.log(data);

               if (data?.message === "Authentication failed. User not found.") {
                    dispatch(set_toast("error", "Thông tin tài khoản hoặc mật khẩu không chính xác."));
                    dispatch(set_show_toast(true));
                    return;
               }
               sessionStorage.setItem("user", result);
               window.location.href = '/';
          });
     }

     return (
          <Container>
               <Logo>
                    <img src={ logo } alt="Logo"/>
               </Logo>
               <LoginForm onSubmit={onSubmitSignIn}>
                    <InputGroup>
                         <input type="text" id="username" name="username" placeholder="VD: viprono1, top1server,..." required minLength="3" onChange={onChangeUsername} value={username}/>
                         <label for="username">username</label>
                    </InputGroup>
                    <InputGroup>
                         <input type="password" id="password" name="password" placeholder="password"required minLength="6" onChange={onChangePassword} value={password}/>
                         <label for="password">password</label>
                    </InputGroup>
                    <SubmitButton className="btn">Login</SubmitButton>
               </LoginForm>
               <SmallText>
                    <ForgotLink href="#">Quên tài khoản?</ForgotLink>
                    <RegisterLink href="sign-up">Đăng ký</RegisterLink>
               </SmallText>
          </Container>
     )
}

export default LoginPage;
