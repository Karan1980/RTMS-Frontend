import axios from "axios";
import { catchError } from "../helper/helper";
import { WELL_API } from "./Client";


// add location

export const addLocation = async (formData) => {
  try {
    const response = await axios.post(`${WELL_API}/add-location`, formData);
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// GET ALL LOCATION
export const getLocation = async (organizationName) => {
  try {
    const response = await axios.get(
      `${WELL_API}/get-AllLocations?organizationName=${organizationName}`
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

//addInstallation on the basic of Location
export const addInstallation = async (formData) => {
  try {
    const response = await axios.post(
      `${WELL_API}/add-InstallationToLocation `,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};

// GET ALL LOCATION
export const getAllInstallation = async (location, organizationName) => {
  try {
    const response = await axios.get(
`      ${WELL_API}/get-InstallationsByLocation?location=${location}&organizationName=${organizationName}`
    );
    return response.data;
  } catch (error) {
    console.error(error); // Log error for debugging
    throw error; // Throw error to handle in the calling function
  }
};

// add well number
export const addWellNum = async (formData) => {
  try {
    const response = await axios.post(
      `${WELL_API}/save-WellTypeAndNumber`,
      formData
    );
    return response.data;
  } catch (error) {
    return catchError(error);
  }
};