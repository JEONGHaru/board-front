import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import InputBox from 'components/InputBox';
import { SignInRequestDto, SignUpRequestDto } from 'apis/request/auth';
import { signInRequest, signUpRequest } from 'apis';
import { SignInResponseDto, SignUpResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';

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
    
    //          state: Email Reference State         //
    const emailRef = useRef<HTMLInputElement | null>(null);
    //          state: Password Reference State         //
    const passwordRef = useRef<HTMLInputElement | null>(null);
    //          state: Password Check Reference State         //
    const passwordCheckRef = useRef<HTMLInputElement | null>(null);
    //          state: Nickname Reference State         //
    const nickNameRef = useRef<HTMLInputElement | null>(null);
    //          state: TelNumber Reference State         //
    const telNumberRef = useRef<HTMLInputElement | null>(null);
    //          state: Address Reference State         //
    const addressRef = useRef<HTMLInputElement | null>(null);
    //          state: Address Detail Reference State         //
    const addressDetailRef = useRef<HTMLInputElement | null>(null);
    //          state: AgreedPersonal Reference State         //
    const [agreedPersonal, setAgreedPersonal] = useState<boolean>(false);
    
    
    //          state: Page Number State         //
    const [page,setPage] = useState< 1 | 2 >(1);
    
    //          state: Email State         //
    const [email, setEmail] = useState<string>('');
    
    //          state: Password State         //
    const [password, setPassword] = useState<string>('');
    
    //          state: Password Check State         //
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    
    //          state: Nickname State         //
    const [nickname, setNickname] = useState<string>('');
    //          state: TelNumber State         //
    const [telNumber, setTelNumber] = useState<string>('');
    //          state: Address State         //
    const [address, setAddress] = useState<string>('');
    //          state: Address Detail State         //
    const [addressDetail, setAddressDetail] = useState<string>('');
    
    
    //          state: Password Type State         //
    const [passwordType,setPasswordType] = useState<'text' | 'password'>('password');
    
    //          state: Password Type State         //
    const [passwordCheckType,setPasswordCheckType] = useState<'text' | 'password'>('password');
    
    //          state: Email Error State         //
    const [isEmailError, setEmailError] =useState<boolean>(false);
    //          state: Password Error State         //
    const [isPasswordError, setPasswordError] =useState<boolean>(false);
    //          state: Password Check Error State         //
    const [isPasswordCheckError, setPasswordCheckError] =useState<boolean>(false);
    
    //          state: Nickname Error State         //
    const [isNicknameError, setNicknameError] =useState<boolean>(false);
    //          state: TelNumber Error State         //
    const [isTelNumberError, setTelNumberError] =useState<boolean>(false);
    //          state: Address Error State         //
    const [isAddressError, setAddressError] =useState<boolean>(false);
    //          state: AgreedPersonal Error State         //
    const [isAgreedPersonalError, setAgreedPersonalError] =useState<boolean>(false);
    
    //          state: Email Error Message State         //
    const [emailErrorMessage, setEmailErrorMessage] =useState<string>('');
    //          state: Password Error Message State         //
    const [passwordErrorMessage, setPasswordErrorMessage] =useState<string>('');
    //          state: Password Check Error Message State         //
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] =useState<string>('');
    
    //          state: Nickname Error Message State         //
    const [nicknameErrorMessage, setNicknameErrorMessage] =useState<string>('');
    //          state: TelNumber Error Message State         //
    const [telNumberErrorMessage, setTelNumberErrorMessage] =useState<string>('');
    //          state: Address Error Message State         //
    const [addressErrorMessage, setAddressErrorMessage] =useState<string>('');
    
    
    //          state: Password Button Icon State         //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
    
    //          state: Password Check Button Icon State         //
    const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
    
    
    //          function: Address Search PopUp         //
    const open = useDaumPostcodePopup();
    //          function: Sign Up Response Function         //
    const signUpResponse = (responseBody: SignUpResponseDto | ResponseDto | null) => {
      if (!responseBody){
        alert('네트워크 이상입니다.');
        return;
      }
      
      const { code } = responseBody;
      if (code === 'DE'){
        setEmailError(true);
        setEmailErrorMessage('중복되는 이메일 주소입니다.');
      }
      if (code === 'DN'){
        setNicknameError(true);
        setNicknameErrorMessage('중복되는 닉네임입니다.');
      }
      if (code === 'DT'){
        setTelNumberError(true);
        setTelNumberErrorMessage('중복되는 핸드폰번호입니다.');
      }
      if (code === 'VF') alert('모든 값을 입력하세요.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      
      if (code !== 'SU') return;
      
      setView('sign-in');
    }
    
    //          event handler: Email Change Event         //
    const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setEmail(value);
      setEmailError(false);
      setEmailErrorMessage('');
    };
    
    //          event handler: Password Change Event         //
    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setPassword(value);
      setPasswordError(false);
      setPasswordErrorMessage('');
    };
    
    //          event handler: Password Check Change Event         //
    const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setPasswordCheck(value);
      setPasswordCheckError(false);
      setPasswordCheckErrorMessage('');
    };
    
    
    //          event handler: Nickname Change Event         //
    const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setNickname(value);
      setNicknameError(false);
      setNicknameErrorMessage('');
    };
    //          event handler: TelNumber Change Event         //
    const onTelNumberChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setTelNumber(value);
      setTelNumberError(false);
      setTelNumberErrorMessage('');
    };
    //          event handler: Address Change Event         //
    const onAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setAddress(value);
      setAddressError(false);
      setAddressErrorMessage('');
    };
    //          event handler: Address Detail Change Event         //
    const onAddressDetailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setAddressDetail(value);
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
    
    //          event handler: Password Check Button Up Event          //
    const onPasswordCheckButtonUpHandler = () => {
      setPasswordCheckType('password');
      setPasswordCheckButtonIcon('eye-light-off-icon');
    };
    
    //          event handler: Password Check Button Down Event          //
    const onPasswordButtonCheckDownHandler = () => {
      setPasswordCheckType('text');
      setPasswordCheckButtonIcon('eye-light-on-icon');
    };
    
    //          event handler: Address Button Click Event          //
    const onAddressButtonClickHandler = () => {
      open({ onComplete });
    } 
    
     //          event handler: AgreedPersonal Click Event         //
     const onAgreedPersonalClickHandler = () => {
      setAgreedPersonal(!agreedPersonal);
      setAgreedPersonalError(false);
     }
    
    //          event handler: Next Button Click Event          //
    const onNextButtonClickHandler = () => {
      const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
      const isEmailPattern = emailPattern.test(email);
      if (!isEmailPattern){
        setEmailError(true);
        setEmailErrorMessage('Email을 압력해주세요.')
      }
      const isCheckedPassword = password.trim().length >= 8;
      if (!isCheckedPassword){
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호는 8글자 이상 입력해주세요.')
      }
      
      const isEqualPassword = password == passwordCheck;
      if (!isEqualPassword){
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.')
      }
      if (!isEmailPattern || !isCheckedPassword || !isEqualPassword) return;
      setPage(2);
      
    };
    
    //          event handler: Sign Up Button Click Event          //
    const onSignUpButtonClickHandler = () => {
      console.log('작동')
      const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
      const isEmailPattern = emailPattern.test(email);
      if (!isEmailPattern){
        setEmailError(true);
        setEmailErrorMessage('Email을 압력해주세요.')
      }
      const isCheckedPassword = password.trim().length >= 8;
      if (!isCheckedPassword){
        setPasswordError(true);
        setPasswordErrorMessage('비밀번호는 8글자 이상 입력해주세요.')
      }
      
      const isEqualPassword = password == passwordCheck;
      if (!isEqualPassword){
        setPasswordCheckError(true);
        setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.')
      }
      
      if (!isEmailPattern || !isCheckedPassword || !isEqualPassword) {
        setPage(1);
        return;
      }
      
      const hasNickname = nickname.trim().length > 0;
      if (!hasNickname){
        setNicknameError(true);
        setNicknameErrorMessage('닉네임을 입력해주세요.');
      }
      
      const telNumberPattern = /^[0-9]{11,13}$/;
      const isTelNumberPattern = telNumberPattern.test(telNumber);
      if (!isTelNumberPattern){
        setTelNumberError(true);
        setTelNumberErrorMessage('숫자만 입력해주세요');
      }
      
      const hasAddress = address.trim().length > 0;
      if (!hasAddress){
        setAddressError(true);
        setAddressErrorMessage('주소를 입력해주세요.');
      }
      
      if(!agreedPersonal) setAgreedPersonalError(true);
      
      if (!hasNickname || !isTelNumberPattern || !hasAddress || !agreedPersonal ) return;
      
      const requestBody: SignUpRequestDto = {
        email,password,nickname,telNumber,address,addressDetail,agreedPersonal
      };
      
      signUpRequest(requestBody).then(signUpResponse);
    }
    
    //          event handler: Sign In Link Click Event          //
    const onSignInLinkClickHandler = () => {
      setView('sign-in');
    }
    
    //          event handler: Email Key Down Event          //
    const onEmailKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!passwordRef.current) return;
      passwordRef.current.focus();
    }
    
    //          event handler: Password Key Down Event          //
    const onPasswordKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!passwordCheckRef.current) return;
      passwordCheckRef.current.focus();
    }
    
    //          event handler: Password Check Key Down Event          //
    const onPasswordCheckKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      onNextButtonClickHandler();
    }
    
    
    //          event handler: Nickname Key Down Event          //
    const onNicknameKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if(!telNumberRef.current) return; 
      telNumberRef.current.focus();
    }
    //          event handler: TelNumber Key Down Event          //
    const onTelNumberKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      onAddressButtonClickHandler();
    }
    //          event handler: Address Key Down Event          //
    const onAddressKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!addressDetailRef.current) return;
      addressDetailRef.current.focus();
    }
    //          event handler: Address Detail Key Down Event          //
    const onAddressDetailKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      onSignUpButtonClickHandler();
    }
    
    //          event handler: Address Search Event          //
    const onComplete = (data: Address) => {
      const { address } = data;
      setAddress(address);
      setAddressError(false);
      setAddressErrorMessage('');
      if (!addressDetailRef.current) return;
      addressDetailRef.current.focus();
    }
    
    
    //          effect: Page Change Effect          //
    useEffect(() => {
      if (page === 2) {
        if (!nickNameRef.current) return;
        nickNameRef.current.focus();
      }
    }, [page])
    
    //          render: Authentication Component rendering         //
    return(
      <div className='auth-card'>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'Sign Up'}</div>
              <div className='auth-card-page'>{`${page}/2`}</div>
            </div>
            {page === 1 && (
              <>
              <InputBox ref={emailRef} label='Email *' type='text' placeholder='Email' value={email} onChange={onEmailChangeHandler} error={isEmailError} message={emailErrorMessage} onKeyDown={onEmailKeyDownHandler} />
            <InputBox ref={passwordRef} label='password *' type={passwordType} placeholder='Password' value={password} onChange={onPasswordChangeHandler} error={isPasswordError} message={passwordErrorMessage} icon={passwordButtonIcon} onButtonDown={onPasswordButtonDownHandler} onButtonUp={onPasswordButtonUpHandler} onKeyDown={onPasswordKeyDownHandler}/>
            <InputBox ref={passwordCheckRef} label='password check *' type={passwordCheckType} placeholder='Password Check' value={passwordCheck} onChange={onPasswordCheckChangeHandler} error={isPasswordCheckError} message={passwordCheckErrorMessage} icon={passwordCheckButtonIcon} onButtonDown={onPasswordButtonCheckDownHandler} onButtonUp={onPasswordCheckButtonUpHandler} onKeyDown={onPasswordCheckKeyDownHandler}/>
              </>
            )}
            {page === 2 && (
              <>
              <InputBox ref={nickNameRef} label='Nickname *' type='text' placeholder='닉네임을 입력해주세요.' value={nickname} onChange={onNicknameChangeHandler} error={isNicknameError} message={nicknameErrorMessage} onKeyDown={onNicknameKeyDownHandler}/>
              <InputBox ref={telNumberRef} label='TelNumber *' type='text' placeholder='핸드폰 번호를 입력해주세요.' value={telNumber} onChange={onTelNumberChangeHandler} error={isTelNumberError} message={telNumberErrorMessage} onKeyDown={onTelNumberKeyDownHandler}/>
              <InputBox ref={addressRef} label='Address *' type='text' placeholder='주소를 입력해주세요.' value={address} onChange={onAddressChangeHandler} error={isAddressError} message={addressErrorMessage} icon='expand-right-light-icon' onButtonClick={onAddressButtonClickHandler} onKeyDown={onAddressKeyDownHandler}/>
              <InputBox ref={addressDetailRef} label='Address Detail' type='text' placeholder='상세 주소를 입력해주세요' value={addressDetail} onChange={onAddressDetailChangeHandler} error={false} onKeyDown={onAddressDetailKeyDownHandler}/>
              </>
            )}
          </div>
          <div className='auth-card-bottom'>
            {page === 1 && (
              <div className='black-large-full-button' onClick={onNextButtonClickHandler}>{'NEXT'}</div>
            )}
            {page === 2 && (
              <>
              <div className='auth-consent-box'>
                <div className='auth-check-box' onClick={onAgreedPersonalClickHandler}>
                    <div className={`icon ${agreedPersonal ? 'check-round-fill-icon' : 'check-ring-light-icon'}`}></div>
                </div>
                <div className={isAgreedPersonalError ? 'auth-consent-title-error' : 'auth-consent-title'}>{'개인정보동의'}</div>
                <div className='auth-consent-link'>{'더보기 >'}</div>
              </div>
              <div className='black-large-full-button' onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
              </>
            )}
            <div className='auth-description'>{'이미 계정이 있으신가요? '}<span className='auth-description-link' onClick={onSignInLinkClickHandler}>{'Sign In'}</span> </div>
          </div>
        </div>
      </div>
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
