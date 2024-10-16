import './style.css';
import { FavoriteListItem } from 'types/interface';
import defaultProfileImage from 'assets/image/default-profile-image.png';

import React from 'react'

interface Props {
    favoriteListItem: FavoriteListItem
}

//          component: Favorite List Item Component          //
export default function FavoriteItem({ favoriteListItem }: Props) {
  
  //         state: properties          //  
  const { nickname, profileImage } = favoriteListItem
   
  //          render: Favorite List Item Rendering          //  
  return (
    <div className='favorite-list-item'>
        <div className='favorite-list-item-profile-box'>
            <div className='favorite-list-item-profile-image' style={{ backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})`}}></div>
        </div>
        <div className='favorite-list-item-nickname'>{nickname}</div>
    </div>
  )
}
