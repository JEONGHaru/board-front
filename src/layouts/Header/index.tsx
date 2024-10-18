import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { AUTH_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';


//          component: Header Layout          //
export default function Header() {
  
  
  //          state: Login User State          //
  const {loginUser, setLoginUser, resetLoginUser} =useLoginUserStore();
  
  //          state: Cookie State          //
  const [cookie, setCookie] = useCookies();
  
  //          state: Login State          //
  const [isLogin, setLogin] = useState<boolean>(false);
  
  
  //          function: navigate function          //
  const navigate = useNavigate();
  
  
  //          event handler: Logo Click Event          //
  const onLogoClickHandler = () => {
    navigate(MAIN_PATH());
  }
  
  
  //          component: Search Button component          //
  const SearchButton = () => {
    
    
    //          state: Search Button input State          //
    const searchButtonRef = useRef<HTMLDivElement | null>(null);
    
    //          state: Search Button State          //
    const [status, setStatus] = useState<boolean>(false);
    
    //          state: Search State          //
    const [Word,setWord] = useState<string>('');
    
    //          state: Search State          //
    const { searchWord } = useParams();
    
    
    //          event handler: Search Change Event          //
    const onSearchWordChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setWord(value);
    }
    
    //          event handler: Search Key Event          //
    const onSearchWordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!searchButtonRef.current) return;
      searchButtonRef.current.click();
    };
    
    //          event handler: Search Icon Click Event          //
    const onSearchButtonClickHandler = () => {
      if (!status){
        setStatus(!status);
        return;
      }
      navigate(SEARCH_PATH(Word));
    };
    
    
    //          effect: Search Path Value Change Event           //
    useEffect(() => {
      if (searchWord) {
        setWord(searchWord);
        setStatus(true);
      }
    },[searchWord]);
    
    if (!status)
    //          render: Search Button Rendering (false)         //
    return (
      <div className='icon-button' onClick={onSearchButtonClickHandler}>
        <div className='icon search-light-icon'></div>
      </div>
    );
    
    //          render: Search Button Rendering (true)         //
    return (
      <div className='header-search-input-box'>
        <input className='header-search-input' type='text' placeholder='검색어를 입력해주세요.' value={Word} onChange={onSearchWordChangeHandler} onKeyDown={onSearchWordKeyDownHandler}/>
        <div ref={searchButtonRef} className='icon-button' onClick={onSearchButtonClickHandler}>
          <div className='icon search-light-icon'></div>
        </div>
      </div>
    );
  };
  
  
  //          component: Login & My Page component          //
  const MyPageButton = () => {
    
    //          state: UserEmail Path Varialbe state          //
    const { userEmail } = useParams();
    
    
    //          event handler: Mypage Button Click Event         //
    const onMyPageButtonClickHandler = () =>{
      
      if(!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    };
    
    //          event handler: Mypage Button Click Event         //
    const onSignOutButtonClickHandler = () =>{
      resetLoginUser();
      navigate(MAIN_PATH());
    };
    
    //          event handler: Login Button Click Event         //
    const onSignInButtonClickHandler = () =>{
      navigate(AUTH_PATH());
    };
    
    if (isLogin && userEmail === loginUser?.email)
    //          render: Logout Button Component Rendering         //
    return <div className='white-button' onClick={onMyPageButtonClickHandler}>{'로그아웃'}</div>;
    
    if (isLogin) 
    //          render: Mypage Button Component Rendering         //
    return <div className='white-button' onClick={onMyPageButtonClickHandler}>{'MyPage'}</div>; 
    //          render: Login Button Component Rendering         //
    return <div className='black-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>;
  }
  
  //          render: Header Layout Rendering         //
  return (
    <div id='header'>
      <div className='header-container'>
        <div className='header-left-box' onClick={onLogoClickHandler}>
          <div className='icon-box'>
            <div className='icon logo-dark-icon'></div>
          </div>
          <div className='header-logo'>{'NK IDOL'}</div>
        </div>
        <div className='header-right-box'>
          <SearchButton />
          <MyPageButton />
        </div>
      </div>
    </div>
  )
}
