import axios from "axios";
import { Documento } from "../types/serviceDoc";
import { id_sucursal } from "../config/config.json";

const host: string = "http://192.168.1.32:8282";
class Apu {
  rta: any;
  constructor(data: Documento[]) {
    this.rta = this.sendData(data);
  }
  sendData(data: Documento[]) {
    const rta = axios
      .post(`${host}/portal2/public/api/InsertDocumento`, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return console.error(error);
      });

    return rta;
  }

  getRta() {
    return this.rta;
  }
}

const senStatus = () => {
  const rta = axios
    .post(`${host}/Portal/public/api/servicioActivo`, {
      idSucursal: id_sucursal,
      // empresa: config.ruc
    })
    .then((rta) => {
      return rta;
    })
    .catch((error) => {
      throw new Error(`Error al enviar estatus ${error}`);
    });
  return rta;
};

export { Apu, senStatus };
