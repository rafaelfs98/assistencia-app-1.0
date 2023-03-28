import axios from "axios";

const apiBuscaCep = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

export default apiBuscaCep;
