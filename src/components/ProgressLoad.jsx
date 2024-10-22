import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const ProgressLoad=()=> {
  return (
    <Box sx={{ width: '100%', color:'white'}}>
      <LinearProgress />
    </Box>
  );
}

export default ProgressLoad