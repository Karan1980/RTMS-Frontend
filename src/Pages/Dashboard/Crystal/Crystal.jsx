import React, { useState } from "react";
import { Button,  Grid, IconButton, TextField, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chart from "react-apexcharts";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SummarizeIcon from '@mui/icons-material/Summarize';
import BallotIcon from '@mui/icons-material/Ballot';
import { Box } from "@mui/system";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: '10px', // Increase padding
    height: '20px',  // Set a specific height
    fontSize: '16px', // Optionally adjust font size for header
    lineHeight: '1.5', // Adjust line height if needed
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("1"),
  createData("2"),
  createData("3"),
  createData("4"),
];


const StyledGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey[100],
}));

const StyledContent = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: 'white',
}));

let data = {
  "Well No": "1",
  "GIP (kg)": "New York",
  "CHP (kg)": "01/01/2021",
  "THP (kg)": "40.7128 N",
  "Battery %": "74.0060 W",
  "Solar Power (V)": "74.0060 W",
  "Communication": "74.0060 W",
  "Flow Status": "74.0060 W",
};

let Tata = {
  "Well No": "1",
  "GIP (kg)": "New York",
  "CHP (kg)": "01/01/2021",
  "THP (kg)": "40.7128 N",
  "Battery %": "74.0060 W",
  "Solar Power (V)": "74.0060 W",
  "Communication": "74.0060 W",
  "Flow Status": "74.0060 W",
};

let Mata = {
  "Well No": "1",
  "GIP (kg)": "New York",
  "CHP (kg)": "01/01/2021",
  "THP (kg)": "40.7128 N",
  "Battery %": "74.0060 W",
  "Solar Power (V)": "74.0060 W",
  "Communication": "74.0060 W",
  "Flow Status": "74.0060 W",
};

let Sata = {
  "Well No": "1",
  "GIP (kg)": "New York",
  "CHP (kg)": "01/01/2021",
  "THP (kg)": "40.7128 N",
  "Battery %": "74.0060 W",
  "Solar Power (V)": "74.0060 W",
  "Communication": "74.0060 W",
  "Flow Status": "74.0060 W"
};


function Monitor() {
  const [age, setAge] = React.useState("");
  const [parameters, setParameters] = React.useState("");
  const [report, setReport] = React.useState("");
  const [resolution, setResolution] = React.useState("");
  const [selectedDate, setSelectedDate] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangeParameters = (event) => {
    setParameters(event.target.value);
  };

  const handleChangeReport = (event) => {
    setReport(event.target.value);
  };
  const handleChangeResolution = (event) => {
    setResolution(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const lineChartOptions = {
    chart: {
      type: "line",
    },
    stroke: {
      width: 2, // Adjust the width here
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
  };

  const lineChartSeries = [
    {
      name: "Sales",
      data: [30, 40, 35, 50, 49, 60, 70],
    },
  ];

  const handleDownload = () => {
    // Logic for downloading table data
    console.log("Download button clicked");
  };


  return (
    <div>
      <Grid container gap={1}>
        {/* ----------------------Icon and Well Report-----------------------------------  */}
        <Typography fontSize='x-large'> <IconButton><SummarizeIcon sx={{ fontSize: 40, color: 'blue' }} /></IconButton>Well Report</Typography>
        {/* --------------------------Well Report Inputs Field------------------------------------- */}
        <Grid container spacing={2}>
          <Grid item sm={6} md={3} xs={12} lg={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-select-large-label">Well Number</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-large"
                value={age}
                label="Well Location"
                onChange={handleChange}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={10}>UP</MenuItem>
                <MenuItem value={20}>MP</MenuItem>
                <MenuItem value={30}>WB</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} md={3} xs={12} lg={3}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                type="date"
                size='small'
                label='Start Date'
                value={selectedDate}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true, // Ensures the label is always visible
                }}
                inputProps={{
                  min: "2001-02-16",
                  max: "2024-08-07",
                }}
              />
            </FormControl>
          </Grid>
          <Grid item sm={6} md={3} xs={12} lg={3}>
            <FormControl fullWidth >
              <TextField
                fullWidth
                type="date"
                size='small'
                label='End Date'
                value={selectedDate}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true, // Ensures the label is always visible
                }}
                inputProps={{
                  min: "2001-02-16",
                  max: "2024-08-07",
                }}
              />
            </FormControl>
          </Grid>
          <Grid item sm={6} md={3} xs={12} lg={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-select-large-label">Resolution</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-large"
                value={parameters}
                label="Parameters"
                onChange={handleChangeParameters}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={10}>1 minute</MenuItem>
                <MenuItem value={20}>1 hour</MenuItem>
                <MenuItem value={30}>1 day</MenuItem>
                <MenuItem value={40}>1 week</MenuItem>
                <MenuItem value={50}>1 month</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {/* ---------------------Icon and Globle Report------------------------------------ */}
        <Typography fontSize='x-large'> <IconButton><BallotIcon sx={{ fontSize: 40, color: 'blue' }} /></IconButton>Global Report</Typography>
        {/* ---------------------Globle Report Iputs Field--------------------------------- */}
        <Grid container spacing={3}>
          <Grid item sm={6} md={3} xs={12} lg={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-select-large-label">Parameter</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-large"
                value={report}
                label="Report Type"
                onChange={handleChangeReport}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={10}>Low Bettery</MenuItem>
                <MenuItem value={20}>Flowing Well</MenuItem>
                <MenuItem value={30}>Not Flowing Well</MenuItem>
                <MenuItem value={40}>Low Solar Power</MenuItem>
                <MenuItem value={50}>Network Error</MenuItem>
                <MenuItem value={60}>Low Pressure</MenuItem>
                <MenuItem value={70}>High Pressure</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} md={3} xs={12} lg={3}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                type="date"
                size='small'
                label='Start Date'
                value={selectedDate}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true, // Ensures the label is always visible
                }}
                inputProps={{
                  min: "2001-02-16",
                  max: "2024-08-07",
                }}
              />
            </FormControl>
          </Grid>
          <Grid item sm={6} md={3} xs={12} lg={3}>
            <FormControl fullWidth >
              <TextField
                fullWidth
                type="date"
                size='small'
                label='End Date'
                value={selectedDate}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true, // Ensures the label is always visible
                }}
                inputProps={{
                  min: "2001-02-16",
                  max: "2024-08-07",
                }}
              />
            </FormControl>
          </Grid>
          <Grid item sm={6} md={3} xs={12} lg={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-select-large-label">Resolution</InputLabel>
              <Select

                labelId="demo-select-small-label"
                id="demo-select-large"
                value={resolution}
                label="Resolution"
                onChange={handleChangeResolution}
              >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={10}>1 minute</MenuItem>
                <MenuItem value={20}>1 hour</MenuItem>
                <MenuItem value={30}>1 day</MenuItem>
                <MenuItem value={40}>1 week</MenuItem>
                <MenuItem value={50}>1 month</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {/* ----------------------------Button---------------------------------- */}
        <Grid container display={'flex'} justifyContent={'end'} >
          <Grid item lg={1.3} md={3} sm={6} xs={12} paddingTop={3} paddingBottom={2}>
            <Button variant='contained'
              sx={{
                backgroundColor: 'green',   // Change button color to green
                '&:hover': {
                  backgroundColor: 'darkgreen', // Optional: Change color on hover
                },
                fontSize: '16px',

              }} fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Monitor;