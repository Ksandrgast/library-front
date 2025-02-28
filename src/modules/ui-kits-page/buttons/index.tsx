// Libraries
import React from "react";
import {Box, Button, FormControlLabel, IconButton, styled, Switch, ThemeProvider, Tooltip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import {useTranslation} from "react-i18next";

// Imports
import {themes} from "../../../app/theme";

const VisuallyHiddenInput = styled('input')({
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const UIKitPageButtonsModule: React.FC = () => {
    const {t} = useTranslation();

    const [buttonsLoading, setButtonsLoading] = React.useState(true);

    function handleClickButton() {
        setButtonsLoading(true);
    }

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
                <Button variant="text">{t('click-me')}</Button>

                <Button
                    variant="text"
                    disabled
                    sx={{
                        '&.MuiButtonBase-root:disabled': {
                            cursor: 'not-allowed',
                            pointerEvents: 'auto',
                        },
                    }}
                >
                    Disabled
                </Button>

                <ThemeProvider theme={themes}>
                    <Button variant="text" href="#text-buttons" color="custom">Link</Button>
                </ThemeProvider>

                <Button variant="text" startIcon={<DeleteIcon/>}>Delete</Button>
                <Button variant="text" endIcon={<SendIcon/>}>Send</Button>

                <Button variant="text" size="small">Small</Button>
                <Button variant="text" size="medium">Medium</Button>
                <Button variant="text" size="large">Large</Button>
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <Button variant="outlined">{t('click-me')}</Button>

                <Tooltip title="You don't have permission to do this">
                    <span style={{cursor: 'not-allowed'}}>
                        <Button variant="outlined" disabled>Disabled</Button>
                    </span>
                </Tooltip>

                <ThemeProvider theme={themes}>
                    <Button variant="outlined" href="#text-buttons" color="custom">Link</Button>
                </ThemeProvider>

                <Button variant="outlined" startIcon={<DeleteIcon/>}>Delete</Button>
                <Button variant="outlined" endIcon={<SendIcon/>}>Send</Button>

                <Button variant="outlined" size="small">Small</Button>
                <Button variant="outlined" size="medium">Medium</Button>
                <Button variant="outlined" size="large">Large</Button>
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <Button variant="contained">{t('click-me')}</Button>

                <Button variant="contained" disabled>Disabled</Button>

                <Button variant="contained" disableElevation>Disable elevation</Button>

                <ThemeProvider theme={themes}>
                    <Button variant="contained" href="#text-buttons" color="custom">Link</Button>
                </ThemeProvider>

                <Button variant="contained" startIcon={<DeleteIcon/>}>Delete</Button>
                <Button variant="contained" endIcon={<SendIcon/>}>Send</Button>

                <Button variant="contained" size="small">Small</Button>
                <Button variant="contained" size="medium">Medium</Button>
                <Button variant="contained" size="large">Large</Button>
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <IconButton aria-label="delete" size="small"><DeleteIcon fontSize="inherit"/></IconButton>
                <IconButton aria-label="delete" size="small" disabled>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>

                <IconButton aria-label="delete" size="medium"><DeleteIcon fontSize="inherit"/></IconButton>
                <IconButton aria-label="delete" size="medium" disabled>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>

                <ThemeProvider theme={themes}>
                    <IconButton aria-label="delete" color="custom" size="large">
                        <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                </ThemeProvider>

                <IconButton aria-label="delete" size="large" disabled>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>

                <IconButton color="secondary" aria-label="add an alarm"><AlarmIcon/></IconButton>
                <ThemeProvider theme={themes}>
                    <IconButton color="custom" aria-label="add an alarm"><AlarmIcon/></IconButton>
                </ThemeProvider>

                <IconButton color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon/>
                </IconButton>
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon/>}
                >
                    Upload files
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => console.log(event.target.files)}
                        multiple
                    />
                </Button>

                <ThemeProvider theme={themes}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon/>}
                        color="custom"
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => console.log(event.target.files)}
                            multiple
                        />
                    </Button>
                </ThemeProvider>

                <span style={{cursor: 'not-allowed'}}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon/>}
                        disabled
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => console.log(event.target.files)}
                            multiple
                        />
                    </Button>
                </span>
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                padding: '10px 0 20px'
            }}>
                <FormControlLabel
                    sx={{display: 'block'}}
                    control={
                        <Switch
                            checked={buttonsLoading}
                            onChange={() => setButtonsLoading(!buttonsLoading)}
                            name="loading"
                            color="primary"
                        />
                    }
                    label="Loading"
                />
                <Box sx={{'& > button': {m: 1}}}>
                    <LoadingButton
                        onClick={handleClickButton}
                        loading={buttonsLoading}
                        variant="outlined"
                        disabled
                    >
                        Disabled
                    </LoadingButton>
                    <LoadingButton
                        onClick={handleClickButton}
                        loading={buttonsLoading}
                        loadingIndicator="Loading…"
                        variant="outlined"
                    >
                        Fetch data
                    </LoadingButton>
                    <LoadingButton
                        onClick={handleClickButton}
                        endIcon={<SendIcon/>}
                        loading={buttonsLoading}
                        loadingPosition="end"
                        variant="contained"
                    >
                        Send
                    </LoadingButton>
                    <LoadingButton
                        color="secondary"
                        onClick={handleClickButton}
                        loading={buttonsLoading}
                        loadingPosition="start"
                        startIcon={<SaveIcon/>}
                        variant="contained"
                    >
                        Save
                    </LoadingButton>
                </Box>
            </div>
        </div>
    );
};

export default UIKitPageButtonsModule;
