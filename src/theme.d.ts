import '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        custom: Palette['custom'];
    }

    interface PaletteOptions {
        custom?: PaletteOptions['custom'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        custom: true;
    }
}

declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides {
        custom: true;
    }
}

declare module '@mui/material/Checkbox' {
    interface CheckboxPropsColorOverrides {
        custom: true;
    }
}

declare module '@mui/material/Radio' {
    interface RadioPropsColorOverrides {
        custom: true;
    }
}

declare module '@mui/material/Badge' {
    interface BadgePropsColorOverrides {
        custom: true;
    }
}

declare module '@mui/material/Slider' {
    interface SliderPropsColorOverrides {
        custom: true;
    }
}

declare module '@mui/material/Switch' {
    interface SwitchPropsColorOverrides {
        custom: true;
    }
}

declare module '@mui/material/TextField' {
    interface TextFieldPropsColorOverrides {
        custom: true;
    }
}

declare module '@mui/material/ToggleButtonGroup' {
    interface ToggleButtonGroupPropsColorOverrides {
        custom: true;
    }
}
