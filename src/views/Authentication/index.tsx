import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import './style.css';
import InputBox from 'components/InputBox';
import { SignInRequestDto } from 'apis/request/auth';
import { signInRequest } from 'apis';
import { SignInResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';

//          component: Authentication Component          //
export default function Authentication() {
  
  
  //          state: State          //
  const[view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
  
  //          state: Cookie State          //
  const [cookies, setCookie] = useCookies();
  
  
  //          function: Sign In Response Function          //
  const navigator = useNavigate();
  
  
  //          component: Sign In Card Component          //
  const SignInCard = () => {
    
    //          state: Email Reference State          //
    const emailRef = useRef<HTMLInputElement | null >(null);
    //          state: Password Reference State          //
    const passwordRef = useRef<HTMLInputElement | null >(null);
    //          state: Email State          //
    const [email, setEmail] = useState<string>('');
    //          state: Password State          //
    const [password, setPassword] = useState<string>('');
    //          state: Password Type State          //
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
    //          state: Password Button Icon State          //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
    //          state: Error State          //
    const [error, setError] = useState<boolean>(false);
    
    
    //          function: Sign In Response Function          //
    const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
      if (!responseBody){
        alert('네트워크 이상입니다.');
        return;
      };
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code === 'SF' || code === 'VF') setError(true);
      if (code !== 'SU') return;
      
      const { token, expirationTime } = responseBody as SignInResponseDto;
      const now = new Date().getTime();
      const expires = new Date(now + expirationTime * 1000);
      
      setCookie('accessToken', token, { expires, path: MAIN_PATH() });
      navigator(MAIN_PATH());      
    };
    
    
    //          event handler: Email Change Event          //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = event.target;
      setEmail(value);
    };
    
    //          event handler: Password Change Event          //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const { value } = event.target;
      setPassword(value);
    }
    
    
    //          event handler: Sign In Button Click Event          //
    const onSignInButtonClickHandler = () => {
      const requestBody: SignInRequestDto = { email, password };
      signInRequest(requestBody).then(signInResponse);
    };
    
    //          event handler: Sign Up Button Click Event          //
    const onSignUpButtonClickHandler = () => {
      setView('sign-up')
    };
    
    //          event handler: Password Button Up Event          //
    const onPasswordButtonUpHandler = () => {
      setPasswordType('password');
      setPasswordButtonIcon('eye-light-off-icon');
    };
    
    //          event handler: Password Button Down Event          //
    const onPasswordButtonDownHandler = () => {
      setPasswordType('text');
      setPasswordButtonIcon('eye-light-on-icon');
    };
    
    //          event handler: Email Input Key Down Click Event          //
    const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    };
    
    //          event handler: Password Input Key Down Click Event          //
    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      onSignInButtonClickHandler();
    };
    
    
    //          render: Authentication Component rendering         //
    return(
      <div className='auth-card'>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'Log In'}</div>
            </div>
            <InputBox ref={emailRef} label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요' error={error} value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler} />
            <InputBox ref={passwordRef} label='패스워드' type={passwordType} placeholder='비밀번호를 입력해주세요' error={error} value={password} onChange={onPasswordChangeHandler} 
            icon={passwordButtonIcon} onKeyDown={onPasswordKeyDownHandler} onButtonDown={onPasswordButtonDownHandler} onButtonUp={onPasswordButtonUpHandler}/>
          </div>
          <div className='auth-card-bottom'>
            {error &&
             <div className='auth-sign-in-error-box'>
              <div className='auth-sign-in-error-message'>
               {'이메일 주소 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.'}
             </div>
           </div>
           }
            <div className='black-large-full-button' onClick={onSignInButtonClickHandler}>{'Sign In'}</div>
            <div className='auth-description-box'>
              <div className='auth-description'>{'신규 사용자이신가요? '}<span className='auth-description-link' onClick={onSignUpButtonClickHandler}>{'Sign Up'}</span> </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  //          component: Sign Up Card Component          //
  const SignUpCard = () => {
    
    
    //          render: Authentication Component rendering         //
    return(
      <div className='auth-card'></div>
    )
  }
  
  //          render: Authentication Component rendering         //
  return (
    <div id='auth-wrapper'>
      <div className='auth-container'>
        <div className='auth-jumbotron-box'>
          <div className='auth-jumbotron-contents'>
            <div className='auth-logo-icon'></div>
            <div className='auth-jumbotron-text-box'>
              <div className='auth-jumbotron-text'>{'NK IDOL'}</div>
              <div className='auth-jumbotron-text'>{'New Jeans'}</div>
            </div>
          </div>
        </div>
        {view === 'sign-in' && <SignInCard />}
        {view === 'sign-up' && <SignUpCard />}
      </div>
    </div>
  )
}
