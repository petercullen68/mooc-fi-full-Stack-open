import patientsData from "../../data/patients";
import { Patient, PatientSensitive, NewPatient } from "../types";
import { randomUUID } from "crypto";

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

const addPatient = (patient: NewPatient): PatientSensitive => {
  const newPatient = {
    id: randomUUID(),
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    ssn: patient.ssn,
    gender: patient.gender,
    occupation: patient.occupation,
  };
  patientsData.push(newPatient);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn: _ssn, ...patientWithoutSsn } = newPatient;
  return patientWithoutSsn;
};

export default {
  getPatients,
  getPatientsSensitive,
  addPatient,
};
