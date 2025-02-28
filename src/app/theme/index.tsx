// Libraries
import {createTheme} from "@mui/material";

// Styles
import '../styles/colors-variables.scss';

export const themes = createTheme({
    palette: {
        custom: {
            main: '#22D3EE',
            light: '#CFFAFE',
            dark: '#0891B2',
            contrastText: '#CFFAFE',
        }
    },
});
