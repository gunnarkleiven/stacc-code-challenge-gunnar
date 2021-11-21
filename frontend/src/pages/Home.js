import React, {useState} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {DataGrid} from '@mui/x-data-grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function Home() {

    const [searchValue, setSearchValue] = useState("");
    const [resultData, setResultData] = useState({});
    const [prevResult, setPrevResult] = useState({});
    const [hasPersonResult, sethasPersonResult] = useState(false);
    const [hasCompanyResult, sethascompanyResult] = useState(false);
    const [rowsPersons, setRowsPersons] = useState([]);
    const [rowsCompanies, setRowsCompanies] = useState([]);
    const [alignment, setAlignment] = useState('Person');
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [displayHelperText, setDisplayHelperText] = useState(false);
    const [helperText, setHelperText] = useState("")
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarmessage] = useState("");

    const boxStyle = {display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 16, marginBottom: 16}

    const columnsPersons = [
        {field: 'id', headerName: 'ID', width: 200},
        {field: 'name', headerName: 'Name', width: 130},
        {field: 'birth_date', headerName: 'Birth Date', width: 100},
        {field: 'score', headerName: 'PEP Score', width: 200}
    ];

    const columnsCompanies = [
        {field: 'id', headerName: 'Org Nr', width: 200},
        {field: 'navn', headerName: 'navn', width: 130},
        {field: 'stiftelsesdato', headerName: 'Stiftelsesdato', width: 100},
        {field: 'antallAnsatte', headerName: 'Antall ansatte', width: 160}
    ]

    const request_url = {
        "Person": "/api/pep/",
        "Company": "/api/enheter"
    }

    const params_lookup = {
        "Person": {
            "name": searchValue
        },
        "Company": {
            "orgNr": searchValue
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };


    const handleSubmit = () => {
        console.log("Submit");
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        setDisplayHelperText(false);
        setHelperText("");
    }

    const handleAlignment = (event, newAlignment) => {
        if (!newAlignment) {
            return;
        }
        setAlignment(newAlignment);
        // console.log(alignment)
    };

    const openSnackbarWithMessage = (msg) => {
        setSnackbarmessage(msg);
        setOpenSnackbar(true);

    }

    const handleInputDataPerson = (data) => {
        if (data.numberOfHits === 0) {
            openSnackbarWithMessage("0 hits på personen");
            return;
        }
        const hits = data["hits"]
        sethasPersonResult(true);
        setPrevResult(data)

        // const curr_data = resultData;
        let newArr = rowsPersons;
        for (const obj of hits) {
            // curr_data[obj.id] = obj;
            const rowEntry = {id: obj.id, name: obj.name, birth_date: obj.birth_date, score: obj.score};
            console.log(rowEntry);
            newArr = [...newArr, rowEntry];
            console.log(newArr);
        }
        setRowsPersons(newArr);
        // setResultData(curr_data)
        setPrevResult(data);
    }

    const handleInputDataCompany = (data) => {
        if ('status' in data && data['status'] === 400) {
            console.log("Status stuff");
            console.log(data);
            console.log(data.valideringsfeil[0].feilmelding);
            openSnackbarWithMessage("OBS! " + data.valideringsfeil[0].feilmelding)
            return;
        }
        else if ('status' in data && data['status'] === 404) {
            openSnackbarWithMessage("Fant ikke organisasjon");
            return;
        }

        sethascompanyResult(true);
        let newArr = rowsCompanies;

        const rowEntry = {
            id: data.organisasjonsnummer,
            navn: data.navn,
            stiftelsesdato: data.stiftelsesdato,
            antallAnsatte: data.antallAnsatte,
        }

        newArr = [...newArr, rowEntry];
        setRowsCompanies(newArr);
    }

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackbar}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );


    const onClick = () => {
        console.log("Clicked")

        if (!searchValue) {
            setDisplayHelperText(true);
            setHelperText("Search field can't be empty!");
            return;
        }

        // const curr_params = params[alignment]
        const params = params_lookup[alignment]
        // console.log("Curr params: ", curr_params)
        setLoadingRequest(true);


        axios.get(request_url[alignment], {params})
            .then(res => {
                console.log(res.data);
                console.log("Axios request status code: ", res.status)
                if (alignment === "Person") {
                    handleInputDataPerson(res.data);
                } else {
                    handleInputDataCompany(res.data)
                }
                setLoadingRequest(false);
            })
            .catch(err => {
                console.log("ERROR!: ", err);
                setLoadingRequest(false);
                openSnackbarWithMessage("Internal Server Error");
            })
        // axios.get("/hello").then(res => {console.log(res.data)})
    }

    return (
        <Container maxWidth="md">
            <Typography component="h1" align="center" variant="h4">
                Know your customer
            </Typography>

            <Box style={boxStyle} component="form" noValidate autoComplete="off">
                <ToggleButtonGroup
                    orientation="horizontal"
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                >
                    <ToggleButton value="Person">Person</ToggleButton>
                    <ToggleButton value="Company">Company</ToggleButton>
                </ToggleButtonGroup>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    error={displayHelperText}
                    id="name"
                    label={alignment}
                    onChange={handleChange}
                    helperText={helperText}
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
            <Box sx={{width: '100%'}}>
                {loadingRequest &&
                <LinearProgress/>
                }
            </Box>
            {hasPersonResult && alignment === "Person" && <DataGrid
                key={0}
                // rowsPersons={Object.values(resultData)}
                rows={rowsPersons}
                columns={columnsPersons}
                pageSize={5}
                rowsPersonsPerPageOptions={[5]}
                // checkboxSelection
                disableSelectionOnClick
            />}
            {hasCompanyResult && alignment === "Company" && <DataGrid
                key={1}
                // rowsPersons={Object.values(resultData)}
                rows={rowsCompanies}
                columns={columnsCompanies}
                pageSize={5}
                rowsPersonsPerPageOptions={[5]}
                // checkboxSelection
                disableSelectionOnClick
            />}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                action={action}
            />
        </Container>
    )
}

export default Home;