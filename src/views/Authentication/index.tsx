import React, { useState } from 'react';
import './style.css';

//          component: Authentication Component          //
export default function Authentication() {
  
  
  //          state: State          //
  const[view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
  
  
  //          component: Sign In Card Component          //
  const SignInCard = () => {
    
    
    //          render: Authentication Component rendering         //
    return(
      <div className='auth-card'></div>
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
