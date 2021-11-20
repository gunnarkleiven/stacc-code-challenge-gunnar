import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import axios from 'axios';

function Home() {

    const [searchValue, setSearchValue] = useState("");
    const [resultData, setResultData] = useState({});
    const [prevResult, setPrevResult] = useState({});
    const [hasPersonResult, sethasPersonResult] = useState(false);
    const [hasCompanyResult, sethascompanyResult] = useState(false);
    const [rowsPersons, setRowsPersons] = useState([]);
    const [rowsCompanies, setRowsCompanies] = useState([]);
    const [alignment, setAlignment] = React.useState('Person');

    const columnsPersons = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'birth_date', headerName: 'Birth Date', width: 100 },
        { field: 'score', headerName: 'PEP Score', width: 200 }
    ];

    const columnsCompanies = [
        { field: 'id', headerName: 'Org Nr', width: 200 },
        { field: 'navn', headerName: 'navn', width: 130 },
        { field: 'stiftelsesdato', headerName: 'Stiftelsesdato', width: 100 },
        { field: 'antallAnsatte', headerName: 'Antall ansatte', width: 160 }
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


    const handleSubmit = () => {
        console.log("Submit");
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleAlignment = (event, newAlignment) => {
        if (!newAlignment) {
            return;
        }
        setAlignment(newAlignment);
        // console.log(alignment)
      };

    const handleInputDataPerson = (data) => {
        const hits = data["hits"]
        sethasPersonResult(true);
        setPrevResult(data)

        // const curr_data = resultData;
        let newArr = rowsPersons;
        for (const obj of hits) {
            // curr_data[obj.id] = obj;
            const rowEntry = { id: obj.id, name: obj.name, birth_date: obj.birth_date, score: obj.score };
            console.log(rowEntry);
            newArr = [...newArr, rowEntry];
            console.log(newArr);
        }
        setRowsPersons(newArr);
        // setResultData(curr_data)
        setPrevResult(data);
    }

    const handleInputDataCompany = (data) => {
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

    

    const onClick = () => {
        console.log("Clicked")
        
        // const curr_params = params[alignment]
        const params = params_lookup[alignment]
        // console.log("Curr params: ", curr_params)


        axios.get(request_url[alignment], { params })
            .then(res => {
                console.log(res.data)
                if (alignment === "Person") {
                    handleInputDataPerson(res.data);
                }
                else {
                    handleInputDataCompany(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
        // axios.get("/hello").then(res => {console.log(res.data)})
    }

    return (
        <Container maxWidth="md">
            <Typography component="h1" align="center" variant="h4">
                Know your customer
            </Typography>

            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16}} component="form" noValidate autoComplete="off">
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
                    id="name"
                    label={alignment}
                    onChange={handleChange}
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
            {hasPersonResult && alignment==="Person" && <DataGrid
                key={1}
                // rowsPersons={Object.values(resultData)}
                rows={rowsPersons}
                columns={columnsPersons}
                pageSize={5}
                rowsPersonsPerPageOptions={[5]}
                // checkboxSelection
                disableSelectionOnClick
            />}
            {hasCompanyResult && alignment==="Company" && <DataGrid
                key={1}
                // rowsPersons={Object.values(resultData)}
                rows={rowsCompanies}
                columns={columnsCompanies}
                pageSize={5}
                rowsPersonsPerPageOptions={[5]}
                // checkboxSelection
                disableSelectionOnClick
            />}
        </Container>
    )
}

export default Home;