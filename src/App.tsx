import React from 'react';
import './App.css';
import top3BoardListItem from 'mocks/top-3-board-list.mock';
import Top3Item from 'components/Top3Item';

function App() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px'}}>
        {top3BoardListItem.map(top3ListItem => <Top3Item top3ListItem={top3ListItem} />)}
      </div>
      
    </>
  );
}

export default App;
