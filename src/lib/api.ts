import axios from 'axios';

const API_BASE = 'https://ef92b778ba5c4d1f9a7c3d8e2b1f6a90.vercel.app/api';
const API_KEY = 'ef92b778ba';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const fetchCPFData = async (cpf: string) => {
  try {
    const cleanCpf = cpf.replace(/\D/g, '');
    const response = await apiClient.get(`/cpf?cpf=${cleanCpf}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCEPData = async (cep: string) => {
  try {
    const cleanCep = cep.replace(/\D/g, '');
    const response = await apiClient.get(`/cep?cep=${cleanCep}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPhoneData = async (phone: string) => {
  try {
    const cleanPhone = phone.replace(/\D/g, '');
    const response = await apiClient.get(`/tel?tel=${cleanPhone}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchRGData = async (rg: string) => {
  try {
    const cleanRg = rg.replace(/\D/g, '');
    const response = await apiClient.get(`/rg?rg=${cleanRg}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchNameData = async (name: string) => {
  try {
    const response = await apiClient.get(`/nome?nome=${encodeURIComponent(name)}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
