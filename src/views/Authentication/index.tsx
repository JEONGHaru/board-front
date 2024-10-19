import React, { KeyboardEvent, useRef, useState } from 'react';
import './style.css';
import InputBox from 'components/InputBox';

//          component: Authentication Component          //
export default function Authentication() {
  
  
  //          state: State          //
  const[view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
  
  
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
    
    
    //          event handler: Sign In Button Click Event          //
    const onSignInButtonClickHandler = () => {
      
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
            <InputBox ref={emailRef} label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요' error={error} value={email} setValue={setEmail} onKeyDown={onEmailKeyDownHandler} />
            <InputBox ref={passwordRef} label='패스워드' type={passwordType} placeholder='비밀번호를 입력해주세요' error={error} value={password} setValue={setPassword} 
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
