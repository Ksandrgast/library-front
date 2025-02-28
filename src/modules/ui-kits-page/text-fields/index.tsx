// Libraries
import {
    Box,
    filledInputClasses,
    FormControl,
    IconButton,
    InputAdornment,
    inputBaseClasses,
    InputLabel,
    MenuItem,
    OutlinedInput,
    TextField,
    ThemeProvider
} from "@mui/material";
import React from "react";
import {AccountCircle, Visibility, VisibilityOff} from "@mui/icons-material";
import {themes} from "../../../app/theme";

// Imports

const UIKitPageTextFieldsModule: React.FC = () => {
    const currencies = [
        {
            value: 'USD',
            label: '$',
        },
        {
            value: 'EUR',
            label: '€',
        },
        {
            value: 'BTC',
            label: '฿',
        },
        {
            value: 'JPY',
            label: '¥',
        },
    ];

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                />
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="Disabled"
                    defaultValue="Hello World"
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />
                <TextField
                    id="outlined-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}
                />
                <TextField
                    id="outlined-number"
                    label="Number"
                    type="number"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />
                <TextField id="outlined-search" label="Search field" type="search"/>
                <TextField
                    id="outlined-helperText"
                    label="Label"
                    defaultValue="Default Value"
                />
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <TextField
                    required
                    id="filled-required"
                    label="Required"
                    defaultValue="Hello World"
                    variant="filled"
                />
                <TextField
                    disabled
                    id="filled-disabled"
                    label="Disabled"
                    defaultValue="Hello World"
                    variant="filled"
                />
                <TextField
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                />
                <TextField
                    id="filled-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    variant="filled"
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}
                />
                <TextField
                    id="filled-number"
                    label="Number"
                    type="number"
                    variant="filled"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />
                <TextField
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                />
                <TextField
                    id="filled-helperText"
                    label="Label"
                    defaultValue="Default Value"
                    variant="filled"
                />
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <TextField
                    required
                    id="standard-required"
                    label="Required"
                    defaultValue="Hello World"
                    variant="standard"
                />
                <TextField
                    disabled
                    id="standard-disabled"
                    label="Disabled"
                    defaultValue="Hello World"
                    variant="standard"
                />
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                />
                <TextField
                    id="standard-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    variant="standard"
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                    }}
                />
                <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    variant="standard"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                />
                <TextField
                    id="standard-search"
                    label="Search field"
                    type="search"
                    variant="standard"
                />
                <TextField
                    id="standard-helperText"
                    label="Label"
                    defaultValue="Default Value"
                    variant="standard"
                />
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <TextField
                    error
                    id="outlined-error"
                    label="Error"
                    defaultValue="Hello World"
                />

                <TextField
                    error
                    id="filled-error"
                    label="Error"
                    defaultValue="Hello World"
                    variant="filled"
                />

                <TextField
                    error
                    id="standard-error"
                    label="Error"
                    defaultValue="Hello World"
                    variant="standard"
                />
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <TextField
                    error
                    id="outlined-error-helper-text"
                    label="Error"
                    defaultValue="Hello World"
                    helperText="Incorrect entry."
                />

                <TextField
                    error
                    id="filled-error-helper-text"
                    label="Error"
                    defaultValue="Hello World"
                    helperText="Incorrect entry."
                    variant="filled"
                />

                <TextField
                    error
                    id="standard-error-helper-text"
                    label="Error"
                    defaultValue="Hello World"
                    helperText="Incorrect entry."
                    variant="standard"
                />
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Multiline"
                    multiline
                    maxRows={4}
                />
                <TextField
                    id="outlined-textarea"
                    label="Multiline Placeholder"
                    placeholder="Placeholder"
                    multiline
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                />
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <TextField
                    id="filled-multiline-flexible"
                    label="Multiline"
                    multiline
                    maxRows={4}
                    variant="filled"
                />
                <TextField
                    id="filled-textarea"
                    label="Multiline Placeholder"
                    placeholder="Placeholder"
                    multiline
                    variant="filled"
                />
                <TextField
                    id="filled-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                    variant="filled"
                />
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <TextField
                    id="standard-multiline-flexible"
                    label="Multiline"
                    multiline
                    maxRows={4}
                    variant="standard"
                />
                <TextField
                    id="standard-textarea"
                    label="Multiline Placeholder"
                    placeholder="Placeholder"
                    multiline
                    variant="standard"
                />
                <TextField
                    id="standard-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}
                    defaultValue="Default Value"
                    variant="standard"
                />
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    defaultValue="EUR"
                    helperText="Please select your currency"
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="filled-select-currency"
                    select
                    label="Select"
                    defaultValue="EUR"
                    helperText="Please select your currency"
                    variant="filled"
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    defaultValue="EUR"
                    helperText="Please select your currency"
                    variant="standard"
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <TextField
                    id="input-with-icon-textfield"
                    label="Text Field"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle/>
                                </InputAdornment>
                            ),
                        },
                    }}
                    variant="standard"
                />
                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField id="input-with-sx" label="With sx" variant="standard"/>
                </Box>
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <TextField
                    label="With normal TextField"
                    id="outlined-start-adornment"
                    sx={{m: 1, width: '25ch'}}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                        },
                    }}
                />
                <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                    />
                </FormControl>
                <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <TextField
                    id="outlined-suffix-shrink"
                    label="Outlined"
                    variant="outlined"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    sx={{
                                        opacity: 0,
                                        pointerEvents: 'none',
                                        [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                                            opacity: 1,
                                        },
                                    }}
                                >
                                    lbs
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <TextField
                    id="filled-suffix-shrink"
                    label="Filled"
                    variant="filled"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    sx={{
                                        alignSelf: 'flex-end',
                                        opacity: 0,
                                        pointerEvents: 'none',
                                        [`.${filledInputClasses.root} &`]: {
                                            marginBottom: '7.5px',
                                        },
                                        [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                                            opacity: 1,
                                        },
                                    }}
                                >
                                    days
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <TextField
                    id="standard-suffix-shrink"
                    label="Standard"
                    variant="standard"
                    slotProps={{
                        htmlInput: {
                            sx: {textAlign: 'right'},
                        },
                        input: {
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    sx={{
                                        alignSelf: 'flex-end',
                                        margin: 0,
                                        marginBottom: '5px',
                                        opacity: 0,
                                        pointerEvents: 'none',
                                        [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                                            opacity: 1,
                                        },
                                    }}
                                >
                                    @gmail.com
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <ThemeProvider theme={themes}>
                    <TextField label="Outlined secondary" color="custom" focused/>
                    <TextField label="Outlined secondary" color="secondary" focused/>
                    <TextField label="Filled success" variant="filled" color="success" focused/>
                    <TextField
                        label="Standard warning"
                        variant="standard"
                        color="warning"
                        focused
                    />
                </ThemeProvider>
            </div>
        </div>
    );
};

export default UIKitPageTextFieldsModule;
