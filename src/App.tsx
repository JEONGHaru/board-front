import React from 'react';
import './App.css';
import top3BoardListItem from 'mocks/top-3-board-list.mock';
import Top3Item from 'components/Top3Item';
import commentListMock from 'mocks/commnet-list.mock';
import CommentItem from 'components/CommentItem';
import favoriteListMock from 'mocks/favorite-list.mock';
import FavoriteItem from 'components/FavoriteItem';

function App() {
  return (
    <>
      <div style={{ display: 'flex', columnGap: '30px', rowGap: '20px' }}>
        {favoriteListMock.map(favoriteListItem => <FavoriteItem favoriteListItem={favoriteListItem} />)}
      </div>
    </>
  );
}

export default App;
