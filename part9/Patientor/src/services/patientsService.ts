import patientsData from "../../data/patients";
import { Patient, PatientSensitive } from "../types";

const getPatients = (): Patient[] => {
  return patientsData;
};

const getPatientsSensitive = (): PatientSensitive[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  getPatientsSensitive,
  addPatient,
};
