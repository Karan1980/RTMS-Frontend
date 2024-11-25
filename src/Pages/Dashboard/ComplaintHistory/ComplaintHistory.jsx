import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ComplaintIcon from "@mui/icons-material/AccessAlarm";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { padding } from "@mui/system";
// ----------------------Table for  Moblie --------------------------
const StyledGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey[100],
}));

const StyledContent = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: "white",
}));

let data = {
  "Complain No.": "1",
  "Data/Time": "New York",
  "Notification No.": "01/01/2021",
  "Raiser Name": "40.7128 N",
  "Taker Name": "74.0060 W",
  Description: "All Good",
};

let Tata = {
  "Complain No.": "1",
  "Data/Time": "New York",
  "Notification No.": "01/01/2021",
  "Raiser Name": "40.7128 N",
  "Taker Name": "74.0060 W",
  Description: "All Good",
};

let Mata = {
  "Complain No.": "1",
  "Data/Time": "New York",
  "Notification No.": "01/01/2021",
  "Raiser Name": "40.7128 N",
  "Taker Name": "74.0060 W",
  Description: "All Good",
};

let Sata = {
  "Complain No.": "1",
  "Data/Time": "New York",
  "Notification No.": "01/01/2021",
  "Raiser Name": "40.7128 N",
  "Taker Name": "74.0060 W",
  Description: "All Good",
};
// ------------------------Table for Desktop-----------------------------
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#8C000B",
    color: theme.palette.common.white,
    padding: "10px", // Increase padding
    height: "20px", // Set a specific height
    fontSize: "18px", // Optionally adjust font size for header
    lineHeight: "1.5", // Adjust line height if needed
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    textAlign: "center",
    padding: "5px",
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

const rows = [createData("1")];

function ComplaintHistory() {
  const [compNo, setCompNo] = React.useState("");
  const [notification, setNotification] = React.useState("");
  const [rName, setRName] = React.useState("");
  const [tName, setTname] = React.useState("");

  const handleLocation = (event) => {
    setCompNo(event.target.value);
  };

  const handleNotification = (event) => {
    setNotification(event.target.value);
  };

  const handleRaiserName = (event) => {
    setRName(event.target.value);
  };

  const handleTakerName = (event) => {
    setTname(event.target.value);
  };
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [parameter, setParameter] = React.useState("");

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    console.log("Search button clicked");
    // Additional logic for search button click can be added here
  };

  const handleChangeParameter = (event) => {
    setParameter(event.target.value);
  };

  return (
    <div>
      <Grid container>
        <IconButton>
          <ComplaintIcon sx={{ fontSize: "40px", color: "red" }} />
        </IconButton>
        <Typography variant="h4" mt={1}>
          Complaint History
        </Typography>
      </Grid>
      <Grid container spacing={3} pt={3}>
        <Grid item sm={6} md={6} xs={12} lg={2.4}>
          <FormControl fullWidth>
            <TextField
              fullWidth
              type="date"
              size="small"
              label="Start Date"
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true, // Ensures the label is always visible
              }}
              inputProps={{
                min: "2001-02-16",
                max: "2024-08-07",
              }}
              sx={{
                // Optional: Customize the TextField styling as needed
                ".MuiInputBase-root": {
                  // Optional: Style the input field if needed
                },
                "& .MuiInputLabel-root": {
                  // Optional: Style the label if needed
                },
                "& .MuiInputBase-input": {
                  // Optional: Style the input value if needed
                },
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={2.4}>
          <FormControl fullWidth size="small">
            <TextField
              fullWidth
              type="date"
              size="small"
              label="End Date"
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true, // Ensures the label is always visible
              }}
              inputProps={{
                min: "2001-02-16",
                max: "2024-08-07",
              }}
              sx={{
                // Optional: Customize the TextField styling as needed
                ".MuiInputBase-root": {
                  // Optional: Style the input field if needed
                },
                "& .MuiInputLabel-root": {
                  // Optional: Style the label if needed
                },
                "& .MuiInputBase-input": {
                  // Optional: Style the input value if needed
                },
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={2.4}>
          <FormControl fullWidth>
            <TextField size="small" label="Complaint No." />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={2.4}>
          <FormControl fullWidth>
            <TextField size="small" label="Well Number" />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={2.4}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-large-label">Custom Search</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-large"
              value={parameter}
              label="Well Location"
              onChange={handleChangeParameter}
            >
              <MenuItem value={0}>
                <em>All</em>
              </MenuItem>
              <MenuItem value={1}>Pending Complaints</MenuItem>
              <MenuItem value={2}>Resloved Complaints</MenuItem>
              <MenuItem value={3}>Unsolved Complaints</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container display={"flex"} justifyContent={"end"} pt={2}>
        <Grid item lg={1.3} md={6} sm={6} xs={12}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "green", // Change button color to green
              "&:hover": {
                backgroundColor: "darkgreen", // Optional: Change color on hover
              },
              fontSize: "16px",
            }}
            fullWidth
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <Grid container display={"flex"}>
        <Typography variant="h5" mt={2} sx={{ color: "darkgrey" }}>
          Records Found:
        </Typography>
      </Grid>
      {/* -----------------------------------------table for Desktop-------------------------- */}
      <Grid
        container
        md={12}
        lg={12}
        sm={5}
        xs={4}
        sx={{ display: { sm: "none", xs: "none", md: "block", lg: "block" } }}
        mt={1}
      >
        <TableContainer component={Paper} sx={{ maxHeight: 620, height: 1000 }}>
          <Table aria-label="customized table" stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Complain No.</StyledTableCell>
                <StyledTableCell align="left">Data/Time</StyledTableCell>
                <StyledTableCell align="left">Sender Name</StyledTableCell>
                <StyledTableCell align="left">Department</StyledTableCell>
                <StyledTableCell align="left">Receiver Name</StyledTableCell>
                <StyledTableCell align="left">Department</StyledTableCell>
                <StyledTableCell align="center">Description</StyledTableCell>
                <StyledTableCell align="left">View</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {/* {row.name} */}
                  </StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left">
                    <IconButton
                      sx={{
                        color: "grey",
                        "&:hover": { color: "darkred" },
                        marginRight: "5px",
                      }}
                    >
                      <VisibilityIcon fontSize="large" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* ------------------------------------table for mobile------------------------- */}

      <Grid
        container
        md={12}
        lg={12}
        sm={12}
        xs={12}
        mt={2}
        sx={{ display: { sm: "block", xs: "block", md: "none", lg: "none" } }}
      >
        <Paper elevation={3} sx={{ padding: 3, maxWidth: 600 }}>
          <Grid container mt={2} direction="column">
            {Object.keys(data).map((header, index) => (
              <Grid container key={index}>
                {/* Header Section */}
                <StyledGridItem item xs={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {header}
                  </Typography>
                </StyledGridItem>
                {/* Content Section */}
                <StyledContent item xs={8}>
                  <Typography variant="body1">{data[header]}</Typography>
                </StyledContent>
              </Grid>
            ))}
          </Grid>
          {/* ----------------------Dreak---------------------------------- */}
          <Grid container mt={2} direction="column">
            {Object.keys(Tata).map((header, index) => (
              <Grid container key={index}>
                {/* Header Section */}
                <StyledGridItem item xs={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {header}
                  </Typography>
                </StyledGridItem>
                {/* Content Section */}
                <StyledContent item xs={8}>
                  <Typography variant="body1">{Tata[header]}</Typography>
                </StyledContent>
              </Grid>
            ))}
          </Grid>
          {/* ----------------------Dreak---------------------------------- */}
          <Grid container mt={2} direction="column">
            {Object.keys(Mata).map((header, index) => (
              <Grid container key={index}>
                {/* Header Section */}
                <StyledGridItem item xs={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {header}
                  </Typography>
                </StyledGridItem>
                {/* Content Section */}
                <StyledContent item xs={8}>
                  <Typography variant="body1">{Mata[header]}</Typography>
                </StyledContent>
              </Grid>
            ))}
          </Grid>
          {/* ----------------------Dreak---------------------------------- */}
          <Grid container mt={2} direction="column">
            {Object.keys(Sata).map((header, index) => (
              <Grid container key={index}>
                {/* Header Section */}
                <StyledGridItem item xs={4}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {header}
                  </Typography>
                </StyledGridItem>
                {/* Content Section */}
                <StyledContent item xs={8}>
                  <Typography variant="body1">{Sata[header]}</Typography>
                </StyledContent>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}

export default ComplaintHistory;
