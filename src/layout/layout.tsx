// module
import { Global, ThemeProvider, useTheme } from '@emotion/react';
import styled from "@emotion/styled";
// custom
import useStore, { Store } from '../store/store';
import appTheme from './theme';

export interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
    const darkMode: boolean = useStore((store: Store) => store.darkMode);

    return (
        <ThemeProvider theme={darkMode ? appTheme.darkMode : appTheme.lightMode}>
            <Global
                styles={{
                    body: {
                        margin: 0,
                        padding: 0,
                    }
                }}
            />
            <LayoutWrapper>
                {props.children}
            </LayoutWrapper>
        </ThemeProvider>
    )
}

export default Layout;

const LayoutWrapper = styled.div(() => {
    const theme: any = useTheme();
    return {
        display: 'block',
        backgroundColor: `${theme.coloring.backgroundColor}`,
        color: `${theme.coloring.color}`,
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100vh',
    }
});