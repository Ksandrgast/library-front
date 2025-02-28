// Libraries
import React from "react";
import {Checkbox, FormControl, FormControlLabel, FormGroup, ThemeProvider} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

// Imports
import {themes} from "../../../app/theme";

const UIKitPageCheckBoxesModule: React.FC = () => {
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
                <Checkbox defaultChecked size="small"/>
                <Checkbox defaultChecked size="medium"/>
                <Checkbox/>
                <Checkbox defaultChecked size="large"/>
                <ThemeProvider theme={themes}>
                    <Checkbox defaultChecked color="custom"/>
                </ThemeProvider>
                <Checkbox defaultChecked color="success"/>

                <Checkbox disabled/>
                <Checkbox disabled checked/>

                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked/>} label="Label"/>
                    <FormControlLabel required control={<Checkbox/>} label="Required"/>
                    <FormControlLabel disabled control={<Checkbox/>} label="Disabled"/>
                </FormGroup>

                <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}/>
                <ThemeProvider theme={themes}>
                    <Checkbox color="custom" icon={<FavoriteBorder/>} checkedIcon={<Favorite/>}/>
                </ThemeProvider>
                <Checkbox icon={<BookmarkBorderIcon/>} checkedIcon={<BookmarkIcon/>}/>

                <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                            value="bottom"
                            control={<Checkbox/>}
                            label="Bottom"
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value="end"
                            control={<Checkbox/>}
                            label="End"
                            labelPlacement="end"
                        />
                    </FormGroup>
                </FormControl>
            </div>
        </div>
    );
};

export default UIKitPageCheckBoxesModule;
