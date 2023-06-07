// import logo from './logo.svg';
// import './App.css';
import React, { useReducer, useEffect, useState } from 'react';
import { createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import { IntroPage, LoginPage, RegisterPage, MainPage } from './pages';
import { handlers as Api } from './mocks/mocks';

export const UserStateContext = createContext();
export const DispatchContext = createContext();

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        user: null,
      };
    default:
      return state;
  }
};

function App() {
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const res = await Api.get('user/current');
      const currentUser = res.data;

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: currentUser,
      });

      console.log('%c sessionStorage에 토큰 있음.', 'color: #d93d1a;');
    } catch {
      console.log('%c SessionStorage에 토큰 없음.', 'color: #d93d1a;');
    }
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return 'loading...';
  }

  return (
    <Router>
      <UserStateContext.Provider value={userState}>
        <DispatchContext.Provider value={dispatch}>
          <Header />
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/main" element={<MainPage />} />
          </Routes>
        </DispatchContext.Provider>
      </UserStateContext.Provider>
    </Router>
  );
}

export default App;