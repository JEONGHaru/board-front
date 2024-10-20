import Footer from 'layouts/Footer';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from 'views/Main';
import Authentication from 'views/Authentication';
import Search from 'views/Search';
import User from 'views/User';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import Container from 'layouts/Container';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import AddressT from 'views/Test';

//          component: Application Component          //
function App() {
  
  //          component: Application Component          //
  // description: main : '/' - Main //
  // description: signin + signup : '/auth' - Authentication //
  // description: search : '/search/:searchword' - Search //
  // description: user page : '/user/:email' - User //
  // description: board detail : '/board/detail/:boardNumber' - BoardDetail //
  // description: board write : '/board/write' - BoardWrite //
  // description: board update : '/board/update/:boardNumber' - BoardUpdate //
  return (
    <Routes>
        <Route element={<Container />}>
            <Route path={MAIN_PATH()} element={<Main />}></Route>
            <Route path='/test' element={<AddressT />}></Route>
            <Route path={AUTH_PATH()} element={<Authentication />}></Route>
            <Route path={SEARCH_PATH(':searchWord')} element={<Search />}></Route>
            <Route path={USER_PATH('userEmail')} element={<User />}></Route>
            <Route path={BOARD_PATH()}>
                <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />}></Route>
                <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />}></Route>
                <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />}></Route>
            </Route>
            <Route path='*' element={<h1>404 Not Found</h1>} />
        </Route>
    </Routes>
  );
}

export default App;
