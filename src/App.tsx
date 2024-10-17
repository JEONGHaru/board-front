import React, { useState } from 'react';
import './App.css';
import top3BoardListItem from 'mocks/top-3-board-list.mock';
import Top3Item from 'components/Top3Item';
import commentListMock from 'mocks/commnet-list.mock';
import CommentItem from 'components/CommentItem';
import favoriteListMock from 'mocks/favorite-list.mock';
import FavoriteItem from 'components/FavoriteItem';
import InputBox from 'components/InputBox';

function App() {
  
  const [value, setValue] = useState<string>('');
  
  return (
    <>
      <InputBox label='Email' type='text' placeholder='이메일 주소를 입력해주세요' value={value} error={true} setValue={setValue} message='8자이상'/>
    </>
  );
}

export default App;
