// Libraries
import React from "react";
import {Badge, ThemeProvider} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";

// Imports
import {themes} from "../../../app/theme";

const UIKitPageBadgesModule: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '20px',
            padding: '10px 0 20px'
        }}>
            <ThemeProvider theme={themes}>
                <Badge badgeContent={4} color="custom">
                    <MailIcon color="disabled"/>
                </Badge>
            </ThemeProvider>

            <Badge badgeContent={4} color="primary">
                <MailIcon color="action"/>
            </Badge>

            <Badge badgeContent={4} color="secondary">
                <MailIcon color="action"/>
            </Badge>

            <Badge badgeContent={4} color="success">
                <MailIcon color="action"/>
            </Badge>

            <Badge color="secondary" badgeContent={100}>
                <MailIcon/>
            </Badge>

            <Badge color="secondary" variant="dot">
                <MailIcon/>
            </Badge>
        </div>
    );
};

export default UIKitPageBadgesModule;
