// module
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@emotion/react';
import styled from "@emotion/styled";
// custom
import useStore, { Store } from "../store/store";

const Home = (): ReactNode => {
    const navigate = useNavigate();
    const logout = useStore((store: Store) => store.logout);
    const darkMode: boolean = useStore((store: Store) => store.darkMode);
    const setDarkMode = useStore((store: Store) => store.setDarkMode);

    return (
        <>
            <LogoutButton onClick={() => logout()}>logout</LogoutButton>
            <LogoutButton onClick={() => navigate('/hhh')}>hhh</LogoutButton>
            <LogoutButton onClick={() => setDarkMode(!darkMode)}>{darkMode ? 'light mode' : 'dark mode'}</LogoutButton>
        </>
    )
};

export default Home;

const LogoutButton = styled.div(() => {
    const theme: any = useTheme();
    return {
        width: '100px',
        height: '50px',
        color: `${theme.coloring.color}`,
    }
})