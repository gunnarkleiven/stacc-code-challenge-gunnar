import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Home() {

    const handleSubmit = () => {
        console.log("Submit")
    }

    const onClick = () => {
        console.log("Clicked")
    }

    return (
       <Container maxWidth="xs">
           <Typography component="h1" align="center" variant="h5">
               Some text right here
           </Typography>
           <Box component="form" noValidate autoComplete="off">
               <TextField 
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                />
                <TextField 
                    margin="normal"
                    required
                    fullWidth
                    id="someText"
                    label="someText"
                    autoFocus
                />
                <Button
                    // type="submit"
                    onClick={onClick}
                    fullWidth
                    variant="contained"
                >
                    Submit
                </Button>
           </Box>

       </Container>
    )
}

export default Home;