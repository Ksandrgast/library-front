import React from "react";
import {Box, Button, CircularProgress, Fab, LinearProgress} from "@mui/material";
import {green} from "@mui/material/colors";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";

const UIKitPageProgressLoadersModule: React.FC = () => {
    const [progress, setProgress] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        }
    };

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                paddingBottom: '20px',
                paddingTop: '10px'
            }}>
                <CircularProgress/>
                <CircularProgress color="secondary"/>
                <CircularProgress color="success"/>
                <CircularProgress color="inherit"/>
                <CircularProgress variant="determinate" value={progress}/>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                paddingBottom: '20px',
                paddingTop: '10px'
            }}>
                <LinearProgress/>
                <Box sx={{width: '100%'}}>
                    <LinearProgress variant="determinate" value={progress}/>
                </Box>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                paddingBottom: '20px',
                paddingTop: '10px'
            }}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box sx={{m: 1, position: 'relative'}}>
                        <Fab
                            aria-label="save"
                            color="primary"
                            sx={buttonSx}
                            onClick={handleButtonClick}
                        >
                            {success ? <CheckIcon/> : <SaveIcon/>}
                        </Fab>
                        {loading && (
                            <CircularProgress
                                size={68}
                                sx={{
                                    color: green[500],
                                    position: 'absolute',
                                    top: -6,
                                    left: -6,
                                    zIndex: 1,
                                }}
                            />
                        )}
                    </Box>
                    <Box sx={{m: 1, position: 'relative'}}>
                        <Button
                            variant="contained"
                            sx={buttonSx}
                            disabled={loading}
                            onClick={handleButtonClick}
                        >
                            Accept terms
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: green[500],
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>
                </Box>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                paddingBottom: '20px',
                paddingTop: '10px'
            }}>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                paddingBottom: '20px',
                paddingTop: '10px'
            }}>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '20px',
                paddingBottom: '20px',
                paddingTop: '10px'
            }}>
            </div>
        </div>
    );
}

export default UIKitPageProgressLoadersModule;
