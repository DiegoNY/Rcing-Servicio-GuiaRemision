import { LeerArchivo } from "./LeerArchivo";
import { ProcesarArchivoType } from "../types/ProcesarArchivo.type";
import mockCab from "../config/mock_cabecera.json";
import mockDeta from "../config/mock_detalle.json";

export const ProcesarArchivos = async (
  direccionCabecera: string,
  direccionCuota: string | boolean,
  direccionItems: string,
  direccionGuardarRespuesta: string,
  directorio: string
): Promise<ProcesarArchivoType | any> => {
  try {
    const cabecera = await LeerArchivo(direccionCabecera);
    const items = await LeerArchivo(direccionItems);
    let cuotas;

    if (typeof direccionCuota === "string") {
      cuotas = await LeerArchivo(direccionCuota);
    } else {
      cuotas = [];
    }

    const respuestaSunat = await LeerArchivo(
      direccionGuardarRespuesta,
      directorio
    );
    /**Eliminar los mocks  */

    const mocckCAb = [mockCab];
    const mockItemsDetalle = [mockDeta];

    return {
      cabecera: mocckCAb,
      items: mockItemsDetalle,
      cuotas,
      respuestaSunat,
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};
