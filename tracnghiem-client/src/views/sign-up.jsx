import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../images/t.png'
import { inputBackground, primary, validColor } from '../constants/GlobalStyle'
import { signUp } from '../graphql/user.service'
import { useDispatch } from 'react-redux'
import { set_show_toast, set_toast } from '../actions/Toast'
import { useHistory } from 'react-router-dom'

const Container = styled.div`
     margin: 0 auto 0 auto;
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
          transform: translate(0.85rem, 0.6rem);
     }

     input {
          width: 300px;
          height: 3rem;
          padding-left: 0.8rem;
          padding-right: 0.8rem;
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 0.3rem solid gray;
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
               border-bottom: 0.3rem solid ${ validColor };
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

const LoginLink = styled.a`
     color: ${ primary };
     margin: 0.5rem;
`

const SignUpPage = () => {
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [passwordCon, setPasswordCon] = useState("");
     const dispatch = useDispatch();
     const history = useHistory();

     function onChangeUsername(e) {
          setUsername(e.target.value);
     }

     function onChangePassword(e) {
          setPassword(e.target.value);
          let validate = document.getElementById("password-confirm");
          if (password !== passwordCon) {
               validate.setCustomValidity("Password don't match");
          }
          else {
               validate.setCustomValidity("");
          }
     }

     function onChangePasswordCon(e) {
          setPasswordCon(e.target.value);
     }

     function onValidateKeyUp(e) {
          let validate = document.getElementById("password-confirm");
          if (password !== passwordCon) {
               validate.setCustomValidity("Password don't match");
          }
          else {
               validate.setCustomValidity("");
          }
     }

     async function onSubmitSignUp(e) {
          e.preventDefault();
          let user;
          signUp(username, password).then(response => response.text()).then(result => {
               let data = JSON.parse(result);
               if (data?.message === "Exist!") {
                    dispatch(set_toast("error", "Tài khoản đã tồn tại"));
                    dispatch(set_show_toast(true));
                    return;
               }
               dispatch(set_toast("success", "Tạo tài khoản thành công"));
               dispatch(set_show_toast(true));
               history.push("/login");
               
               console.log(data);
          });
     }

     return (
          <Container>
               <Logo>
                    <img src={ logo } alt="Logo"/>
               </Logo>
               <LoginForm onSubmit={onSubmitSignUp}>
                    <InputGroup>
                         <input type="text" id="username" name="username" placeholder="VD: viprono1, top1server,..." required minLength="3" value={username} onChange={onChangeUsername}/>
                         <label for="username">username</label>
                    </InputGroup>
                    <InputGroup>
                         <input type="password" id="password" name="password" placeholder="password"required minLength="6" value={password} onChange={onChangePassword}/>
                         <label for="password">password</label>
                    </InputGroup>
                    <InputGroup>
                         <input type="password" id="password-confirm" name="password-confirm" placeholder="confirm password"required minLength="6" value={passwordCon} onChange={onChangePasswordCon} onKeyUp={onValidateKeyUp}/>
                         <label for="confirm-password">confirm password</label>
                    </InputGroup>
                    <SubmitButton className="btn">SignIn</SubmitButton>
               </LoginForm>
               <SmallText>   
                    <LoginLink href="/login">Đăng nhập</LoginLink>
               </SmallText>
          </Container>
     )
}

export default SignUpPage