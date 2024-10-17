import React from 'react'
import './style.css';

//          component: Footer Layout          //
export default function Footer() {
    
  //          event handler: Insta Icon Click Event         //
  const onInstaIconButtonClickHandler = () => {
    window.open('https://www.instagram.com');
  }  
  
  //          event handler: Insta Icon Click Event         //
  const onNaverBlogIconButtonClickHandler = () => {
    window.open('http://blog.naver.com')
  }
  
  //          render: Footer Layout Rendering         //
  return (
    <div id='footer'>
        <div className='footer-container'>
            <div className='footer-top'>
                <div className='footer-logo-box'>
                    <div className='icon-box'>
                        <div className='icon logo-light-icon'></div>
                    </div>
                    <div className='footer-logo-text'>{'NK IDOL'}</div>
                </div>
                <div className='footer-link-box'>
                    <div className='footer-email-link'>{'holyanegl@gmail.com'}</div>
                    <div className='icon-button' onClick={onInstaIconButtonClickHandler}>
                        <div className='icon insta-icon'></div>
                    </div>
                    <div className='icon-button' onClick={onNaverBlogIconButtonClickHandler}>
                        <div className='icon naver-blog-icon'></div>
                    </div>
                </div>
            </div>
            <div className='footer-bottom'>
                <div className='footer-copyright'>{'Copyright 2024. Jeong. All Rights Reserved.'}</div>
            </div>
        </div>
    </div>
  )
}

