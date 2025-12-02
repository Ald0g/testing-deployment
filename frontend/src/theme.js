import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#02a8ff',
            light: '#4ec3ff',
            dark: '#0177cc',
        },
        background: {
            default: '#0a1929',
            paper: '#132f4c',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export default theme;
