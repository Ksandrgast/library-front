import React from "react";
import {Box, Skeleton, Stack} from "@mui/material";

const UIKitPageSkeletonLoadersModule: React.FC = () => {

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
                <Stack spacing={1}>
                    <Skeleton variant="text" sx={{fontSize: '1rem'}}/>

                    <Skeleton variant="circular" width={40} height={40}/>
                    <Skeleton variant="rectangular" width={210} height={60}/>
                    <Skeleton variant="rounded" width={210} height={60}/>
                </Stack>
                <Box sx={{width: 300}}>
                    <Skeleton/>
                    <Skeleton animation="wave"/>
                    <Skeleton animation={false}/>
                </Box>
            </div>
        </div>
    )
}

export default UIKitPageSkeletonLoadersModule;
