// Libraries
import React from "react";
import {Box, Slider, Stack, ThemeProvider} from "@mui/material";
import {themes} from "../../../app/theme";

// Imports

const marks = [
    {
        value: 0,
        label: '0°C',
    },
    {
        value: 20,
        label: '20°C',
    },
    {
        value: 37,
        label: '37°C',
    },
    {
        value: 100,
        label: '100°C',
    },
];

function valuetext(value: number) {
    return `${value}°C`;
}

const UIKitPageSlidersModule: React.FC = () => {
    const [value, setValue] = React.useState<number>(30);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '40px',
                padding: '10px 0 20px'
            }}>
                <Box sx={{width: 300}}>
                    <Slider aria-label="Volume" value={value} onChange={handleChange}/>
                </Box>

                <Box sx={{width: 300}}>
                    <Slider disabled defaultValue={value} aria-label="Disabled slider"/>
                </Box>
            </div>


            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '40px',
                padding: '10px 0 20px'
            }}>
                <Box sx={{width: 300}}>
                    <Slider
                        aria-label="Temperature"
                        defaultValue={30}
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        shiftStep={30}
                        step={10}
                        marks
                        min={10}
                        max={110}
                    />

                </Box>

                <Box sx={{width: 300}}>
                    <Slider defaultValue={30} step={10} marks min={10} max={110} disabled/>
                </Box>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '40px',
                padding: '10px 0 20px'
            }}>
                <Box sx={{width: 300}}>
                    <Slider
                        aria-label="Restricted values"
                        defaultValue={20}
                        getAriaValueText={valuetext}
                        step={null}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                </Box>

                <ThemeProvider theme={themes}>
                    <Box sx={{width: 300}}>
                        <Slider
                            aria-label="Restricted values"
                            defaultValue={20}
                            getAriaValueText={valuetext}
                            step={null}
                            valueLabelDisplay="auto"
                            marks={marks}
                            color="custom"
                        />
                    </Box>
                </ThemeProvider>
            </div>

            <Stack sx={{height: 300}} spacing={1} direction="row">
                <ThemeProvider theme={themes}>
                    <Slider
                        aria-label="Temperature"
                        orientation="vertical"
                        getAriaValueText={valuetext}
                        valueLabelDisplay="auto"
                        defaultValue={30}
                        color="custom"
                    />
                </ThemeProvider>
                <Slider
                    aria-label="Temperature"
                    orientation="vertical"
                    defaultValue={30}
                    valueLabelDisplay="auto"
                    disabled
                />
                <Slider
                    getAriaLabel={() => 'Temperature'}
                    orientation="vertical"
                    getAriaValueText={valuetext}
                    defaultValue={[20, 37]}
                    valueLabelDisplay="auto"
                    marks={marks}
                />
            </Stack>
        </div>
    );
};

export default UIKitPageSlidersModule;
