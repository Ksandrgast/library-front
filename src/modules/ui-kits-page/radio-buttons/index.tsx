// Libraries
import React from "react";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, ThemeProvider} from "@mui/material";

// Imports
import {themes} from "../../../app/theme";

const UIKitPageRadioButtonsModule: React.FC = () => {
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
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                        <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                        <FormControlLabel value="other" control={<Radio/>} label="Other"/>
                    </RadioGroup>
                </FormControl>

                <ThemeProvider theme={themes}>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio size="small"/>} label="Female"/>
                            <FormControlLabel
                                value="male"
                                control={<Radio size="medium" color="custom"/>}
                                label="Male"
                            />
                            <FormControlLabel value="other" control={<Radio sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 28,
                                },
                            }}/>} label="Other"/>
                            <FormControlLabel value="disabled" disabled control={<Radio/>} label="Other"/>
                        </RadioGroup>
                    </FormControl>
                </ThemeProvider>

                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-form-control-label-placement"
                        name="position"
                        defaultValue="top"
                    >
                        <FormControlLabel
                            value="bottom"
                            control={<Radio/>}
                            label="Bottom"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel value="end" control={<Radio/>} label="End"/>
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    );
};

export default UIKitPageRadioButtonsModule;
