import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, padding } from "@mui/system";
import AssetsIcon from "@mui/icons-material/AccountBalance";
import PersonIcon from "@mui/icons-material/Person";
import LinkIcon from "@mui/icons-material/Link";
import { useSelector } from "react-redux";
import {
  Edit as EditIcon,
  DeleteForever as DeleteForeverIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import {
  addDepartment,
  departmentDropdown,
  addPosition,
  addApprovalChain,
  getPosition,
  getApprovalChain,
  organizationAddData,
  getOrganizationData,
  UpdateDepartment,
  DeleteDepartment,
  updatePosition,
  deletePosition,
  updateApprovalChain,
  deleteApprovalChain,
  updateOrganizationData,
} from "../../../apis/Service";
import OrgMessageForward from "../ManageAsset.jsx/OrgMessageForward";

function ManageAsset() {
  const organizationName = useSelector((state) => state.auth.organization);
  const [DepartmentLoading, setDepartmentLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [selectedPositionDepartment, setSelectedPositionDepartment] =
    useState("");
  const [position, setPosition] = useState("");
  const [positions, setPositions] = useState("");
  const [positionRows, setPositionRows] = useState([]);
  const [positionLoading, setPositionLoading] = useState(true);
  const [isEditingPosition, setIsEditingPosition] = useState(false);
  const [oldPosition, setOldPosition] = useState(null);
  const [approvalChainLoading, setApprovalChainLoading] = useState(true);
  const [approvalChains, setApprovalChains] = useState(""); // For Action
  const [level1, setLevel1] = useState(""); // For Level-1
  const [level2, setLevel2] = useState(""); // For Level-2
  const [approvalChainRows, setApprovalChainRows] = useState([]);
  const [selectedApprovalDepartment, setSelectedApprovalDepartment] =
    useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [oldAction, setOldAction] = useState("");
  const [oldLevel1, setOldLevel1] = useState("");
  const [oldLevel2, setOldLevel2] = useState("");
  const [selectedLevelDepartment, setSelectedLevelDepartment] = useState("");
  const [positionsForApp, setPositionsForApp] = useState([]);
  //organization Data Add
  const [formData, setFormData] = useState({
    OrganizationName: "",
    organizationlogo: "",
    subtitlename: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phone: "",
    fax: "",
    email: "",
  });

  //storeg in local storage to use
  localStorage.setItem("organizationLogo", formData.organizationlogo); // Save the logo
  localStorage.setItem("subtitlename", formData.subtitlename); // Save the subtitle
  const [loading, setLoading] = useState(false);
  const [isEditOrganization, setIsEditOrganization] = useState(false);
  const [organiatioLoading, setOrganiationLoading] = useState(false);
  const [file, setFile] = useState(null);
  // Options for the dropdown
  const actions = [
    "User Registration",
    "Well Setting",
    "Node Configuration",
    "Device Registration",
    "Close Complain",
    "Close Notification",
    "Delete User",
  ];
  // Function to initiate Updating department
  const handleEditClick = (index) => {
    setNewDepartmentName(departments[index]); // Set current department name to input
    setIsEditing(true); // Set editing mode
    setEditingIndex(index); // Set index of the department being edited
  };
  //integration for add department and Update department
  const handleAddOrUpdateDepartment = async () => {
    const value = newDepartmentName.trim();
    if (!organizationName) {
      toast.error("Organization name is missing");
      return;
    }
    if (value) {
      try {
        const formData = {
          organizationName: organizationName,
        };
        if (isEditing) {
          const oldDepartmentName = departments[editingIndex];
          formData.oldDepartmentName = oldDepartmentName;
          formData.newDepartmentName = value;
          const result = await UpdateDepartment(formData);
          if (result && result.success) {
            const updatedDepartments = [...departments];
            updatedDepartments[editingIndex] = value;
            setDepartments(updatedDepartments);
            toast.success(result.message || "Department updated successfully");
          } else {
            toast.error(result.message || "Failed to update department");
          }
        } else {
          // Handle adding the department
          formData.departmentName = value;
          const result = await addDepartment(formData);
          if (result && result.success) {
            setDepartments((prevDepartments) => [...prevDepartments, value]);
            toast.success(result.message || "Department added successfully");
          } else {
            toast.error(result.message || "Failed to add department");
          }
        }
        // Reset state after operation
        setNewDepartmentName(""); // Clear input
        setIsEditing(false); // Reset editing mode
        setEditingIndex(null); // Reset editing index
      } catch (error) {
        console.error("API call error: ", error.response || error.message);
        toast.error(
          "Error: " + (error.response?.data?.message || error.message)
        );
      }
    } else {
      toast.error("Department name cannot be empty");
    }
  };

  // Delete Department
  const handleDeleteDepartment = async (departmentName) => {
    if (!organizationName || !departmentName) {
      toast.error("Organization name and department name are required");
      return;
    }

    try {
      const response = await DeleteDepartment({
        organizationName,
        departmentName,
      });

      // Log the response for debugging
      console.log("Delete Department Response:", response);

      if (response && response.success) {
        // Update the UI to remove the deleted department
        setDepartments((prevDepartments) =>
          prevDepartments.filter((dep) => dep !== departmentName)
        );

        // Optionally, also remove positions associated with this department from state
        setPositionRows((prevRows) =>
          prevRows.filter((row) => row.departmentName !== departmentName)
        );

        toast.success(`Department "${departmentName}" deleted successfully`);
      } else {
        toast.error(response.data.message || "Failed to delete department");
      }
    } catch (error) {
      console.error("Error deleting department: ", error);
      toast.error("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handlePositionSubmit = async () => {
    if (!selectedPositionDepartment || !position) {
      toast.error("Department and position are required");
      return;
    }

    try {
      let result;
      const formData = {
        organizationName: organizationName,
        departmentName: selectedPositionDepartment,
        ...(isEditingPosition
          ? { oldPositionName: oldPosition, newPositionName: position }
          : { positions: [position] }),
      };

      if (isEditingPosition) {
        result = await updatePosition(formData);
        // Update the position in positionRows
        setPositionRows((prevRows) =>
          prevRows.map((row) => {
            if (row.departmentName === selectedPositionDepartment) {
              return {
                ...row,
                positions: row.positions.map((pos) =>
                  pos === oldPosition ? position : pos
                ),
              };
            }
            return row;
          })
        );
      } else {
        result = await addPosition(formData);
        // Add the new position to positionRows
        setPositionRows((prevRows) => {
          const departmentExists = prevRows.some(
            (row) => row.departmentName === selectedPositionDepartment
          );

          if (departmentExists) {
            return prevRows.map((row) => {
              if (row.departmentName === selectedPositionDepartment) {
                return {
                  ...row,
                  positions: [...row.positions, position],
                };
              }
              return row;
            });
          } else {
            return [
              ...prevRows,
              {
                departmentName: selectedPositionDepartment,
                positions: [position],
              },
            ];
          }
        });
      }

      if (result && result.success) {
        toast.success(
          result.message ||
            (isEditingPosition
              ? "Position updated successfully"
              : "Position added successfully")
        );
        setPosition(""); // Clear position input
        setSelectedPositionDepartment(""); // Clear department selection
        setIsEditingPosition(false); // Reset edit state
        setOldPosition(null); // Clear old position reference
      } else {
        toast.error(result.message || "Failed to submit position");
      }
    } catch (error) {
      toast.error("Error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEditPosition = (departmentName, positionName) => {
    setSelectedPositionDepartment(departmentName);
    setPosition(positionName);
    setOldPosition(positionName); // Store old position for update
    setIsEditingPosition(true); // Set edit mode
  };

  // delete position
  const handleDeletePosition = async (departmentName, positionName) => {
    if (!organizationName || !departmentName || !positionName) {
      toast.error(
        "Organization Name, Department Name, and Position Name are required"
      );
      return;
    }

    try {
      // Call the deletePosition API
      const deletePositionResponse = await deletePosition({
        organizationName,
        departmentName,
        positionName,
      });

      if (deletePositionResponse && deletePositionResponse.success) {
        // Update the UI to remove the deleted position
        setPositionRows((prevRows) =>
          prevRows.map((row) => {
            if (row.departmentName === departmentName) {
              return {
                ...row,
                positions: row.positions.filter((pos) => pos !== positionName),
              };
            }
            return row;
          })
        );

        toast.success(`Position "${positionName}" deleted successfully`);
      } else {
        toast.error(
          deletePositionResponse.message || "Failed to delete position"
        );
      }
    } catch (error) {
      console.error(
        "Error Deleting Position: ",
        error.response?.data || error.message
      );
      toast.error("Error: " + (error.response?.data?.message || error.message));
    }
  };

  // Reset form fields after submission
  const resetForm = () => {
    setSelectedApprovalDepartment("");
    setApprovalChains("");
    setLevel1("");
    setLevel2("");
    setIsEditMode(false);
    setOldAction("");
    setOldLevel1("");
    setOldLevel2("");
  };

  const handleApprovalChainSubmit = async () => {
    if (!selectedLevelDepartment || !level1 || !level2) {
      toast.error("All fields are required.");
      return;
    }

    const formData = {
      organizationName,
      departmentName: selectedLevelDepartment,
    };

    if (isEditMode) {
      formData.oldAction = oldAction;
      formData.oldLevel1 = oldLevel1;
      formData.oldLevel2 = oldLevel2;
      formData.newAction = approvalChains;
      formData.newLevel1 = level1;
      formData.newLevel2 = level2;
    } else {
      formData.action = approvalChains;
      formData.level1 = level1;
      formData.level2 = level2;
    }

    try {
      const result = isEditMode
        ? await updateApprovalChain(formData)
        : await addApprovalChain(formData);

      toast.success(
        isEditMode
          ? "Approval chain updated successfully!"
          : "Approval chain added successfully!"
      );

      // Update state to reflect changes immediately
      setApprovalChainRows((prevRows) => {
        const updatedRows = [...prevRows];
        const departmentIndex = updatedRows.findIndex(
          (row) => row.departmentName === selectedLevelDepartment
        );

        if (isEditMode) {
          // Update the existing chain in the department
          updatedRows[departmentIndex].approvalChains = updatedRows[
            departmentIndex
          ].approvalChains.map((chain) =>
            chain.action === oldAction &&
            chain.level1 === oldLevel1 &&
            chain.level2 === oldLevel2
              ? { action: approvalChains, level1, level2 }
              : chain
          );
        } else {
          // Add the new chain to the department, or create a new department entry
          if (departmentIndex > -1) {
            updatedRows[departmentIndex].approvalChains.push({
              action: approvalChains,
              level1,
              level2,
            });
          } else {
            updatedRows.push({
              departmentName: selectedLevelDepartment,
              approvalChains: [{ action: approvalChains, level1, level2 }],
            });
          }
        }
        return updatedRows;
      });

      // Reset fields post-submit
      setSelectedLevelDepartment("");
      setApprovalChains("");
      setLevel1("");
      setLevel2("");
      setIsEditMode(false);
      setOldAction("");
      setOldLevel1("");
      setOldLevel2("");
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "An error occurred while processing the request. Please try again."
      );
    }
  };

  // Handle edit initiation for updating fields
  const handleApprovalChainEdit = (index, chainIndex) => {
    try {
      const approvalChainToEdit = approvalChainRows[index];
      const chain = approvalChainToEdit.approvalChains[chainIndex];

      // Set new values in the form fields
      setSelectedLevelDepartment(approvalChainToEdit.departmentName);
      setApprovalChains(chain.action || "");
      setLevel1(chain.level1 || "");
      setLevel2(chain.level2 || "");

      // Set old values for the API
      setOldAction(chain.action || "");
      setOldLevel1(chain.level1 || "");
      setOldLevel2(chain.level2 || "");

      setIsEditMode(true);
      setEditIndex(index);
      toast.info("Editing approval chain entry.");
    } catch (error) {
      console.error("Error during edit:", error);
      toast.error(
        "An error occurred while trying to edit the approval chain. Please try again."
      );
    }
  };

  const handleDepartmentChange = async (departmentName) => {
    // setDepartmentLoading(true);
    try {
      const response = await getPosition(organizationName, departmentName);
      if (response.success) {
        setPositionsForApp(response.data);
      } else {
        setPositionsForApp([]);
      }
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
    setDepartmentLoading(false);
  };

  //Delete Approval chain
  const handleDeleteApprovalChain = async (index) => {
    const approvalChainToDelete = approvalChainRows[index];
    // Create the form data for deletion
    const formData = {
      organizationName,
      departmentName: approvalChainToDelete.departmentName,
      action: approvalChainToDelete.approvalChains[0]?.action || "",
      level1: approvalChainToDelete.approvalChains[0]?.level1 || "",
      level2: approvalChainToDelete.approvalChains[0]?.level2 || "",
    };
    // Validate required fields
    if (!formData.organizationName || !formData.departmentName) {
      console.error("Organization name and department name are required.");
      toast.error("Organization name and department name are required.");
      return;
    }
    try {
      const response = await deleteApprovalChain(formData);
      if (response.success) {
        setApprovalChainRows((prev) =>
          prev.map((row, rowIndex) => {
            if (rowIndex === index) {
              return {
                ...row,
                approvalChains: row.approvalChains.filter(
                  (_, chainIndex) => chainIndex !== 0
                ),
              };
            }
            return row;
          })
        );
        toast.success(
          response.message || "Approval chain deleted successfully!"
        );
      } else {
        console.error("Error deleting approval chain:", response.message);
        toast.error(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error("Error occurred while deleting approval chain:", error);
      toast.error("An error occurred while deleting the approval chain.");
    }
  };

  // Fetch GET departments, position, approvalchain from API To Show
  const fetchDepartments = async (organizationName) => {
    setDepartmentLoading(true);
    try {
      const formData = { organizationName };
      const response = await departmentDropdown(formData);
      if (response.data && response.data.length > 0) {
        const departmentList = response.data[0].departments.map(
          (department) => department.departmentName
        );
        // console.log("Fetched Departments:", departmentList);
        setDepartments(departmentList); // Store department names in state
      } else {
        console.warn("No department data found in response.");
        setDepartments([]); // Set to an empty array if no departments found
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setDepartmentLoading(false);
    }
    // Fetch all Positions and their respective department
    setPositionLoading(true);
    try {
      const formData = { organizationName };
      const departmentResponse = await departmentDropdown(formData); // Fetch departments
      if (departmentResponse.data && departmentResponse.data.length > 0) {
        const departmentList = departmentResponse.data[0].departments.map(
          (dept) => dept.departmentName
        );
        // Fetch positions for each department
        const allPositions = await Promise.all(
          departmentList.map(async (department) => {
            const positionResponse = await getPosition(
              organizationName,
              department
            );
            return {
              departmentName: department,
              positions: positionResponse.data || [], // Store positions if found
            };
          })
        );
        setPositionRows(allPositions);
      } else {
        console.warn("No departments found");
        setPositionRows([]); // Clear if no departments are available
      }
    } catch (error) {
      console.error("Error fetching departments and positions:", error);
    } finally {
      setPositionLoading(false);
    }
    // Fetch all Approval chain and their respective department
    setApprovalChainLoading(true);
    try {
      const formData = { organizationName };
      const departmentResponse = await departmentDropdown(formData);
      if (departmentResponse.data && departmentResponse.data.length > 0) {
        const departmentList = departmentResponse.data[0].departments.map(
          (dept) => dept.departmentName
        );
        const allApprovalChain = await Promise.all(
          departmentList.map(async (department) => {
            const approvalChainResponse = await getApprovalChain(
              organizationName,
              department
            );
            return {
              departmentName: department,
              approvalChains: approvalChainResponse.data || [],
            };
          })
        );
        setApprovalChainRows(allApprovalChain);
      } else {
        console.warn("No Departments Found");
        setApprovalChainRows([]);
      }
    } catch (error) {
      console.error("An error occurred while fetching data.");
    } finally {
      setApprovalChainLoading(false);
    }
  };

  //Organization ADD Data
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //upload logo of organization
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      organizationlogo: file,
    });
  };

  // Save organization data
  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedFormData = { ...formData };
      const response = await organizationAddData(updatedFormData);
      console.log("jhdvchjdfjc", response);
      if (response.success) {
        toast.success(response.message || "Data saved successfully");
        setIsEditOrganization(true); // Switch to Update mode after saving
        localStorage.setItem("organizationSaved", true);
      } else {
        // console.log("sssss", "Essslse ");
        toast.error(response.message || "Data not saved");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cancel update
  const handleCancel = () => {
    setIsEditOrganization(true);
  };

  // Check if data is saved in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("organizationSaved");
    if (saved) {
      setIsEditOrganization(true);
      const savedLogo = localStorage.getItem("organizationLogo");
      if (savedLogo) {
        setFormData((prev) => ({ ...prev, organizationlogo: savedLogo }));
      }
    }
  }, []);

  //HAndle Update Organization
  const handleUpdate = async () => {
    setLoading(true);
    const updatedFormData = {
      ...formData,
      organizationName: organizationName,
    };
    try {
      await updateOrganizationData(updatedFormData);
      toast.success("Organization updated successfully");
      setIsEditOrganization(false);
    } catch (error) {
      toast.error("Error updating organization:", error);
    } finally {
      setLoading(false);
    }
  };

  //fetch organization data based on Organization Name\
  const fetchOrganization = async () => {
    setOrganiationLoading(true);
    try {
      const response = await getOrganizationData(organizationName);
      console.log(response, "organizationdata  //////////////");
      setFormData({
        organizationName: response.data.organizationName || "",
        organizationlogo: response.data.organizationlogo || "",
        subtitlename: response.data.subtitlename || "",
        address: response.data.address || "",
        city: response.data.city || "",
        state: response.data.state || "",
        country: response.data.country || "",
        pinCode: response.data.pinCode || "",
        phone: response.data.phone || "",
        fax: response.data.fax || "",
        email: response.data.email || "",
      });
      console.log(organizationlogo, "org logo...............");
      if (organizationlogo instanceof File) {
        formDataToUpdate.organizationlogo = organizationlogo;
      }
      setFormData(formDataToUpdate);
      console.log("hgdvdhc..........", data.organizationlogo);
      console.log("organization\\\\\\\\\\\\\\\\\\\\\\\\", response.data);
    } catch (error) {
      console.error("Error fetching organization data:", error);
    } finally {
      setOrganiationLoading(false);
    }
  };

  // -------------------Table------------------------
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#8C000B", // Customize background color
      color: theme.palette.common.white,
      padding: "15px", // Increase padding
      height: "20px", // Set a specific height
      fontSize: "16px", // Optionally adjust font size for header
      lineHeight: "1.5", // Adjust line height if needed
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

  useEffect(() => {
    if (organizationName) {
      fetchDepartments(organizationName);
    }
  }, [organizationName]);

  useEffect(() => {
    fetchOrganization();
  }, [organizationName]);

  return (
    <div>
      <Paper>
        <Grid container gap={1} p={2}>
          <Box display="flex" gap={1}>
            <IconButton>
              <AssetsIcon sx={{ fontSize: 30, color: "green" }} />
            </IconButton>
            <Typography variant="h4" fontWeight={700} mt={1}>
              {organizationName ? organizationName : "N/A"}
            </Typography>
          </Box>
          {/* Organization Logo (Top of Organization Name) */}
          {/* {isEditOrganization && formData.organizationlogo && (
            <Grid
              container
              justifyContent="flex-start"
              alignItems="center"
              marginTop={4}
            >
              <span
                style={{
                  marginRight: "50px",
                  fontSize: "1.5rem",
                }}
              >
                Organization Logo:
              </span>
              <img
                src={formData.organizationlogo}
                alt="Organization Logo"
                style={{
                  width: "250px",
                  height: "100px",
                  objectFit: "contain", // Use 'contain' to preserve the aspect ratio
                  borderRadius: "5px", // Optional: added to make the image look better
                }}
              />
            </Grid>
          )} */}
          <Grid container>
            {/* <Grid container marginTop={3}> */}
            <Grid container mt={3} >
              {/* Organization Logo Upload (Show only in Save mode) */}
              {!isEditOrganization && (
                <Grid
                  item
                  lg={6}
                  // bgcolor={"yellow"}
                  // position='absolute'
                  // width={"100%"}
                  // sx={{ position:"absolute", transform:'translate(-50%,-50%)', top:'50%',left:"50%" }}
                >
                  <Box
                    // bgcolor={'yellowgreen'}
                    // width="450px"
                    display="flex"
                    alignItems="center"
                    gap={2}
                    position={"absolute"}
                    right="1%"
                    top="15%"
                  >
                    <Typography variant="h6">Organization Logo</Typography>
                    <span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ cursor: "pointer", marginLeft: "1rem" }}
                        onChange={handleLogoUpload}
                      />
                    </span>
                    {file && (
                      <img
                        src={file}
                        alt="Organization Logo Preview"
                        style={{
                          width: "250px",
                          height: "100px",
                          objectFit: "contain",
                          marginLeft: "1.5rem",
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              )}
            </Grid>

            <Grid container spacing={3} pr={3}>
              {[
                { name: "organizationName", label: "Organization" },
                { name: "subtitlename", label: "Display Name" },
                { name: "address", label: "Address" },
                { name: "city", label: "City" },
                { name: "state", label: "State" },
                { name: "country", label: "Country" },
                { name: "pinCode", label: "Pin Code" },
                { name: "phone", label: "Phone" },
                { name: "fax", label: "Fax" },
                { name: "email", label: "Email" },
              ].map((field) => (
                <Grid
                  container
                  key={field.name}
                  item
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  spacing={2}
                  alignItems="center"
                >
                  {/* Label Section */}
                  <Grid item lg={3} md={3} sm={3} xs={12}>
                    <Typography variant="h6">{field.label}</Typography>
                  </Grid>

                  {/* Input/Display Section */}
                  {field.name === "organizationName" ? (
                    <Grid item lg={9} md={9} sm={9} xs={12}>
                      <Typography sx={{ fontSize: "20px" }}>
                        {formData[field.name]}
                      </Typography>
                    </Grid>
                  ) : (
                    <Grid item lg={9} md={9} sm={9} xs={12}>
                      <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        fullWidth
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        disabled={isEditOrganization}
                      />
                    </Grid>
                  )}
                </Grid>
              ))}

              {/* Action Buttons */}
              <Grid
                container
                mt={2}
                justifyContent={"end"}
              >
                <Grid item >
                  {isEditOrganization ? (
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        backgroundColor: "blue",
                        fontSize: "16px",
                        width: "130px",
                        "&:hover": { backgroundColor: "darkblue" },
                      }}
                      onClick={() => setIsEditOrganization(false)}
                      disabled={loading}
                    >
                      {loading ? "UPDATING..." : "UPDATE"}
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          backgroundColor: "green",
                          fontSize: "16px",
                          width: "130px",
                          "&:hover": { backgroundColor: "darkgreen" },
                        }}
                        onClick={handleSave}
                        disabled={loading}
                      >
                        {loading ? "SAVING..." : "SAVE"}
                      </Button>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>

            {/* </Grid> */}
          </Grid>
        </Grid>
      </Paper>
      {/* ------------Input textfield for table------------------- */}
      <Card sx={{ my: 2 }}>
        <CardContent>
          <Grid container  mt={0.1}>
            {/* ------------------------ADD DEPARTMENT------------------------------ */}
            <Grid
              container
              p={2}
              gap={1}
              display="flex"
              flexDirection={"column"}
            >
              <Box display="flex" gap={1}>
                <AssetsIcon />
                <Typography variant="h5">Add Department</Typography>
              </Box>
              <Grid container spacing={1}>
                <Grid item lg={11} md={11} sm={11} xs={12}>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Department"
                    value={newDepartmentName} // Bind value to newDepartmentName state
                    onChange={(e) => setNewDepartmentName(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item lg={1} md={1} sm={1} xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleAddOrUpdateDepartment}
                    size="small"
                    sx={{
                      // backgroundColor: "green",
                      backgroundColor: isEditing ? "blue" : "green",
                      fontSize: "16px",
                      // width: "162px",
                      "&:hover": {
                        backgroundColor: isEditing ? "darkorange" : "darkgreen",
                      },
                    }}
                  >
                    {isEditing ? "UPDATE" : "ADD"}{" "}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid container p={2}>
              <TableContainer
                component={Paper}
                sx={{ maxHeight: 320, height: 600, overflowY: "auto" }}
              >
                <Table aria-label="customized table" stickyHeader>
                  <TableHead>
                    <TableRow sx={{ msOverflowY: "scroll" }}>
                      <StyledTableCell sx={{ fontSize: "18px", width: "15%" }}>
                        Department
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {DepartmentLoading ? (
                      <TableRow>
                        <StyledTableCell colSpan={2}>
                          Loading...
                        </StyledTableCell>
                      </TableRow>
                    ) : departments && departments.length > 0 ? (
                      departments.map((departmentName, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <span style={{ fontSize: "medium" }}>
                                {index + 1}. {departmentName}
                              </span>
                              <Box display="flex">
                                <IconButton
                                  onClick={() => handleEditClick(index)}
                                >
                                  {" "}
                                  <EditIcon fontSize="large" />
                                </IconButton>{" "}
                                <IconButton
                                  sx={{
                                    color: "red",
                                    "&:hover": { color: "darkred" },
                                    marginRight: "8px",
                                  }}
                                  onClick={() =>
                                    handleDeleteDepartment(departmentName)
                                  }
                                >
                                  <DeleteForeverIcon fontSize="large" />
                                </IconButton>
                              </Box>
                            </Box>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <TableRow>
                        <StyledTableCell
                          style={{ fontSize: "medium" }}
                          colSpan={2}
                        >
                          No departments available
                        </StyledTableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* ------------------------ADD POSITION------------------------------ */}
            <Grid
              container
              p={2}
              gap={1}
              mt={2}
              display="flex"
              flexDirection={"column"}
            >
              <Box display="flex" gap={1}>
                <PersonIcon />
                <Typography variant="h5">Add Position</Typography>
              </Box>
              <Grid container spacing={1}>
                <Grid item lg={5.5} md={5.5} sm={5.5} xs={12}>
                  {DepartmentLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-select-large-label">
                        Department
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-large"
                        label="Department"
                        value={selectedPositionDepartment}
                        onChange={(e) =>
                          setSelectedPositionDepartment(e.target.value)
                        }
                      >
                        <MenuItem value="" disabled>
                          Select a department
                        </MenuItem>
                        {departments && departments.length > 0 ? (
                          departments.map((departmentName, index) => (
                            <MenuItem
                              key={departmentName}
                              value={departmentName}
                            >
                              {index + 1}. {departmentName}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="" disabled>
                            No departments available
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  )}
                </Grid>
                <Grid item lg={5.5} md={5.5} sm={5.5} xs={12}>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item lg={1} md={1} sm={1} xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handlePositionSubmit}
                    size="small"
                    sx={{
                      backgroundColor: isEditingPosition ? "blue" : "green",
                      fontSize: "16px",
                      // width: "300px",
                      "&:hover": {
                        backgroundColor: isEditingPosition
                          ? "darkorange"
                          : "darkgreen",
                      },
                    }}
                  >
                    {isEditingPosition ? "Update" : "Add"}
                  </Button>
                </Grid>
              </Grid>

              {/* Position Table */}
              <Grid container>
                <TableContainer
                  component={Paper}
                  sx={{ maxHeight: 320, height: 400, overflowY: "scroll" }}
                >
                  <Table aria-label="customized table" stickyHeader>
                    <TableHead>
                      <TableRow sx={{ overflowY: "scroll" }}>
                        <StyledTableCell
                          sx={{ fontSize: "18px", width: "15%" }}
                        >
                          Department
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ fontSize: "18px", width: "15%" }}
                        >
                          Position
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {positionLoading ? (
                        <TableRow>
                          <StyledTableCell colSpan={2}>
                            Loading...
                          </StyledTableCell>
                        </TableRow>
                      ) : departments && departments.length > 0 ? (
                        positionRows.map((row, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell component="th" scope="row">
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <span style={{ fontSize: "medium" }}>
                                  {index + 1}. {row.departmentName}
                                </span>
                              </Box>
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {row.positions.length > 0
                                ? row.positions.map((position, posIndex) => (
                                    <div
                                      key={posIndex}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        fontSize: "medium",
                                      }}
                                    >
                                      {posIndex + 1}. {position}
                                      <Box display="flex">
                                        <IconButton
                                          aria-label="edit"
                                          size="small"
                                          sx={{
                                            color: "darkblue",
                                            "&:hover": { color: "black" },
                                          }}
                                          onClick={() =>
                                            handleEditPosition(
                                              row.departmentName,
                                              position
                                            )
                                          }
                                        >
                                          <EditIcon fontSize="large" />
                                        </IconButton>
                                        <IconButton
                                          aria-label="delete"
                                          size="small"
                                          sx={{
                                            color: "red",
                                            "&:hover": { color: "darkred" },
                                            marginRight: "8px",
                                          }}
                                          onClick={() =>
                                            handleDeletePosition(
                                              row.departmentName,
                                              position
                                            )
                                          }
                                        >
                                          <DeleteForeverIcon fontSize="large" />
                                        </IconButton>
                                      </Box>
                                    </div>
                                  ))
                                : "No positions available"}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))
                      ) : (
                        <TableRow>
                          <StyledTableCell
                            style={{ fontSize: "large" }}
                            colSpan={2}
                          >
                            No Positions available
                          </StyledTableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            {/* ------------------------APPROVAL CHAIN------------------------------ */}

            <Grid
              container
              p={2}
              gap={1}
              mt={2}
              display="flex"
              flexDirection="column"
            >
              <Box display="flex" gap={1}>
                <LinkIcon />
                <Typography variant="h5">Approval Chain</Typography>
              </Box>
              <Grid container display="flex" spacing={1}>
                <Grid item lg={2.75} mg={2.75} sm={5.5} xs={12}>
                  {DepartmentLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <FormControl fullWidth size="small">
                      <InputLabel id="department-select-label">
                        Department
                      </InputLabel>
                      <Select
                        labelId="department-select-label"
                        id="department-select"
                        label="Department"
                        // value={selectedApprovalDepartment}

                        // onChange={(e) =>
                        //   setSelectedApprovalDepartment(e.target.value)
                        // }
                        value={selectedLevelDepartment}
                        onChange={(e) => {
                          setSelectedLevelDepartment(e.target.value);
                          handleDepartmentChange(e.target.value); // Fetch positions when department changes
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select a department
                        </MenuItem>
                        {departments && departments.length > 0 ? (
                          departments.map((departmentName, index) => (
                            <MenuItem
                              key={departmentName}
                              value={departmentName}
                            >
                              {index + 1}. {departmentName}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value="" disabled>
                            No departments available
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  )}
                </Grid>

                <Grid item lg={2.75} mg={2.75} sm={5.5} xs={12}>
                  <FormControl fullWidth size="small">
                    <Autocomplete
                      freeSolo // Allows users to type their own value
                      options={actions} // Provides options to select from
                      value={approvalChains || ""} // Ensure value is controlled
                      onChange={(event, newValue) => {
                        setApprovalChains(newValue); // Update the selected value
                      }}
                      onInputChange={(event, newInputValue) => {
                        setApprovalChains(newInputValue); // Update for freeSolo input
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Action"
                          variant="outlined"
                          size="small"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item lg={2.75} mg={2.75} sm={5.5} xs={12}>
                  <TextField
                    variant="outlined"
                    label="Level-1"
                    size="small"
                    select
                    value={level1}
                    onChange={(e) => setLevel1(e.target.value)}
                    fullWidth
                  >
                    {positionsForApp.length > 0 ? (
                      positionsForApp.map((position, index) => (
                        <MenuItem key={position} value={position}>
                          {index + 1}. {position}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="" disabled>
                        No positions available
                      </MenuItem>
                    )}
                  </TextField>
                </Grid>

                <Grid item lg={2.75} mg={2.75} sm={5.5} xs={12}>
                  <TextField
                    variant="outlined"
                    label="Level-2"
                    size="small"
                    select
                    value={level2}
                    onChange={(e) => setLevel2(e.target.value)}
                    fullWidth
                  >
                    {positionsForApp.length > 0 ? (
                      positionsForApp.map((position, index) => (
                        <MenuItem key={position} value={position}>
                          {index + 1}. {position}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="" disabled>
                        No positions available
                      </MenuItem>
                    )}
                  </TextField>
                </Grid>

                <Grid item lg={1} md={1} sm={1} xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleApprovalChainSubmit}
                    size="small"
                    sx={{
                      backgroundColor: isEditMode ? "blue" : "green",
                      fontSize: "16px",
                      "&:hover": {
                        backgroundColor: isEditMode
                          ? "darkorange"
                          : "darkgreen",
                      },
                    }}
                  >
                    {isEditMode ? "Update" : "Add"}
                  </Button>
                </Grid>
              </Grid>

              {/* Approval Chain Table */}
              <Grid container>
                <TableContainer
                  component={Paper}
                  sx={{ maxHeight: 320, height: 400, overflow: "auto" }}
                >
                  <Table aria-label="customized table" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell
                          sx={{ fontSize: "18px", width: "25%" }}
                        >
                          Department
                        </StyledTableCell>
                        <StyledTableCell align="left" sx={{ width: "25%" }}>
                          Action
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{ fontSize: "18px", width: "25%" }}
                        >
                          Level-1
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{ fontSize: "18px", width: "25%" }}
                        >
                          Level-2
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          sx={{ fontSize: "18px", width: "10%" }}
                        >
                          Actions
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {approvalChainLoading ? (
                        <TableRow>
                          <StyledTableCell colSpan={5}>
                            Loading...
                          </StyledTableCell>
                        </TableRow>
                      ) : approvalChainRows && approvalChainRows.length > 0 ? (
                        approvalChainRows.map((row, index) => (
                          <React.Fragment key={index}>
                            {row.approvalChains?.map((chain, chainIndex) => (
                              <StyledTableRow key={`${index}-${chainIndex}`}>
                                {chainIndex === 0 && (
                                  <StyledTableCell
                                    style={{ fontSize: "medium" }}
                                    rowSpan={row.approvalChains.length}
                                  >
                                    {index + 1}. {row.departmentName}
                                  </StyledTableCell>
                                )}
                                <StyledTableCell style={{ fontSize: "medium" }}>
                                  {chainIndex + 1}. {chain.action || "N/A"}
                                </StyledTableCell>
                                <StyledTableCell style={{ fontSize: "medium" }}>
                                  {chainIndex + 1}. {chain.level1 || "N/A"}
                                </StyledTableCell>
                                <StyledTableCell style={{ fontSize: "medium" }}>
                                  {chainIndex + 1}. {chain.level2 || "N/A"}
                                </StyledTableCell>
                                <StyledTableCell
                                  align="center"
                                  style={{ fontSize: "medium" }}
                                >
                                  <Box display="flex" justifyContent="center">
                                    <IconButton
                                      onClick={() =>
                                        handleApprovalChainEdit(
                                          index,
                                          chainIndex
                                        )
                                      }
                                    >
                                      <EditIcon fontSize="large" />
                                    </IconButton>
                                    <IconButton
                                      onClick={() =>
                                        handleDeleteApprovalChain(
                                          index,
                                          chainIndex
                                        )
                                      }
                                      sx={{
                                        color: "red",
                                        "&:hover": { color: "darkred" },
                                        marginLeft: "8px",
                                      }}
                                    >
                                      <DeleteForeverIcon fontSize="large" />
                                    </IconButton>
                                  </Box>
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </React.Fragment>
                        ))
                      ) : (
                        <TableRow>
                          <StyledTableCell
                            colSpan={5}
                            style={{ fontSize: "medium" }}
                          >
                            No Approval Chain Available
                          </StyledTableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              {/*------------Button-------------- */}
            </Grid>

            <Grid container mt={2}>
              <OrgMessageForward />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default ManageAsset;
