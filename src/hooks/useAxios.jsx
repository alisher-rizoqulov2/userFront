import axios from "axios";

const API = import.meta.API.env


export const useAxios = () => axios.create({baseURL:API})