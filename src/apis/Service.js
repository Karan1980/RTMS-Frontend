import axios from "axios";
import { ORGANIZATION_API, USER_API } from "../apis/Client";
import { catchError } from "../helper/helper";

// Function to send OTP for login
export const sendOtpLogin = async (formData) => {
  try {
    const response = await axios.post(`${USER_API}/send-otp-login`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// Function to handle login after OTP verification
export const login = async (formData) => {
  try {
    const response = await axios.post(`${USER_API}/login`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//register OTP API
export const sendOtpRegister = async (formData) => {
  try {
    const response = await axios.post(
      `${USER_API}/send-otp-register`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Correct the Content-Type header
        },
      }
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//register API
export const register = async (formData) => {
  try {
    const response = await axios.post(`${USER_API}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Correct the Content-Type header
      },
    });
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// check status api
export const checkStatus = async (formData) => {
  try {
    const response = await axios.post(
      `${USER_API}/registration-status`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//forgot password api
export const forgotPassword = async (formData) => {
  try {
    const response = await axios.post(`${USER_API}/forgot-password`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//reset password Apis
export const resetPassword = async (formData) => {
  try {
    const response = await axios.post(`${USER_API}/reset-password`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// GET all Users Not approved By Manager
export const getNotApprovedManagerUser = async () => {
  try {
    const response = await axios.get(
      `${USER_API}/get-not-approved-manager-user`
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// GET All Users Not Approved By Owner
export const getNotApprovalOwnerUser = async () => {
  try {
    const response = await axios.get(`${USER_API}/get-not-approval-owner-user`);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//User Approved by Manger
export const ApproveByManager = async (formData, authToken) => {
  try {
    const response = await axios.post(
      `${USER_API}/approve-by-manager`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include Bearer token
        },
      }
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// User Approved by Owner
export const approveByOwner = async (formData, authToken) => {
  try {
    const response = await axios.post(
      `${USER_API}/approve-by-owner`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include Bearer token
        },
      }
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//User Reject by Manger
export const rejectByManager = async (formData, authToken) => {
  try {
    const response = await axios.post(
      `${USER_API}/reject-user-by-manager`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include Bearer token
        },
      }
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// User Reject by Owner
export const rejectByOwner = async (formData, authToken) => {
  try {
    const response = await axios.post(
      `${USER_API}/reject-user-by-owner`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include Bearer token
        },
      }
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// generate otp for Organization api
export const genrateOtpOrg = async (formData) => {
  try {
    const response = await axios.post(
      `${ORGANIZATION_API}/generate-otp-oragnization`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// create Organization api
export const createOrg = async (formData) => {
  try {
    const response = await axios.post(
      `${ORGANIZATION_API}//create-organization`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//organization dropdown in signuppage
export const organizationDropDown = async () => {
  try {
    const response = await axios.get(
      `${ORGANIZATION_API}/organization-drop-down`
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//Post Api department-base-org-name-dropdown
export const departmentDropdown = async (formData) => {
  try {
    const response = await axios.post(
      `${ORGANIZATION_API}/department-base-org-name-dropdown`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//add department by owner
export const addDepartment = async (formData) => {
  try {
    const response = await axios.post(
      `${ORGANIZATION_API}/add-department`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//update department
export const UpdateDepartment = async (formData) => {
  try {
    const response = await axios.put(
      `${ORGANIZATION_API}/update-department`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//delete department
export const DeleteDepartment = async (formData) => {
  try {
    const response = await axios.post(
      `${ORGANIZATION_API}/delete-department`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//Delete Position
export const deletePosition = async (formData) => {
  try {

    const response = await axios.post(
      `${ORGANIZATION_API}/delete-position`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);

  }
};

//Add Position on the basic of department
export const addPosition = async (formData) => {
  try {
    const response = await axios.post(
      `${ORGANIZATION_API}/add-position`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//update Position
export const updatePosition = async (formData) => {
  try {
    const response = await axios.put(
      `${ORGANIZATION_API}/update-position`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// https://rtms-backend.onrender.com/api/v1/organization/get-positions?organizationName=Foxboro.in.co&departmentName=Finance
export const getPosition = async (organizationName, departmentName) => {
  try {
    const response = await axios.get(
      `${ORGANIZATION_API}/get-positions?organizationName=${organizationName}&departmentName=${departmentName}`
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//Add Approval Chain on the basic of department
export const addApprovalChain = async (formData) => {
  try {
    const response = await axios.post(
      `${ORGANIZATION_API}/add-approval-chain`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//update approval Chain
export const updateApprovalChain = async (formData) => {
  try {
    const response = await axios.put(
      `${ORGANIZATION_API}/update-approval-chain`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

export const deleteApprovalChain = async (formData) => {
  try {
    const response = await axios.post(`${ORGANIZATION_API}/delete-approval-chain`, formData); // No need for 'data' wrapper
    return response.data;
  } catch (error) {
    return catchError(error); // Handle errors appropriately
  }
};

// https://rtms-backend.onrender.com/api/v1/organization/get-approval-chain?organizationName=AbhiCompany&departmentName=HOD dep
export const getApprovalChain = async (organizationName, departmentName) => {
  try {
    const response = await axios.get(
      `${ORGANIZATION_API}/get-approval-chain?organizationName=${organizationName}&departmentName=${departmentName}`
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//organization-add-data
export const organizationAddData = async (formData) => {
  try {
    const response = await axios.post(
      `${ORGANIZATION_API}/organization-add-data`,
      formData,
      {
        headers: {
          "content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//http://localhost:5000/api/v1/organization/organization-get-data?organizationName=india.in.co
export const getOrganizationData = async (organizationName) => {
  try {
    const response = await axios.get(
      `${ORGANIZATION_API}/organization-get-data?organizationName=${organizationName}`
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// Update Organization
export const updateOrganizationData = async (formData) => {
  try {
    const response = await axios.put(
      `${ORGANIZATION_API}/organization-update-data`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};