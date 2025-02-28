// Libraries
import React from "react";
import {FormControlLabel, FormGroup, Switch, ThemeProvider} from "@mui/material";
import {themes} from "../../../app/theme";

// Imports

const UIKitPageSwitchesModule: React.FC = () => {

    const label = {inputProps: {'aria-label': 'Switch demo'}};

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
                <Switch {...label} defaultChecked/>
                <Switch {...label} />
                <Switch {...label} disabled defaultChecked/>
                <Switch {...label} disabled/>

                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked/>} label="Label"/>
                    <FormControlLabel required control={<Switch/>} label="Required"/>
                    <FormControlLabel disabled control={<Switch/>} label="Disabled"/>
                </FormGroup>

                <Switch {...label} defaultChecked size="small"/>
                <Switch {...label} defaultChecked/>
                <ThemeProvider theme={themes}>
                    <Switch {...label} defaultChecked color="custom"/>
                </ThemeProvider>

                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        value="bottom"
                        control={<Switch color="primary"/>}
                        label="Bottom"
                        labelPlacement="bottom"
                    />
                    <FormControlLabel
                        value="end"
                        control={<Switch color="primary"/>}
                        label="End"
                        labelPlacement="end"
                    />
                </FormGroup>
            </div>
        </div>
    );
};

export default UIKitPageSwitchesModule;
