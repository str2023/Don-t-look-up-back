import React, { useContext } from "react";
import { useNavigate, useLocation, useHistory } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../../App";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Header = () => {
    const history = useHistory();
    const userState = useContext(UserStateContext);
    const dispatch = useContext(DispatchContext);

    const handleMenuClick = () => {
        //메뉴 버튼인데 나중에 기능 추가 예정
    };

    const handleLogin = () => {
        //로그인 클릭 했을시 LoginPage 안내
        history.push('/login');
    };

    const handleLogout = () => {
        //로그아웃 클릭했을시 IntroPage 안내
        //sessionStorage.removeItem(" 토큰 ")

        dispatch({ type: 'LOGOUT' });
        
        navigate('/');
    };

    const handleRegister = () => {
        // 회원가입 클릭시 RegisterPage 안내
        history.push('/register');
    };

    return (
        <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Don't Look Up
            </Typography>
            {!userState.isLoggedIn && (
                //로그인 안됐을시 로그인 버튼이 띄움
            <Button color="inherit" onClick={handleLogin}>
                로그인
            </Button>
            )}
            {userState.isLoggedIn && (
                //로그인 되었을시 로그아웃 버튼이 띄움
            <Button color="inherit" onClick={handleLogout}>
                로그아웃
            </Button>
            )}
            <Button color="inherit" onClick={handleRegister}>
                회원가입
            </Button>
        </Toolbar>
        </AppBar>
    );
};

export default Header;