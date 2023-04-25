import { DBFFile } from "dbffile";
import config from "../config/config.json";
import { CREAR_DBF } from "../helpers/CrearDBF.helpers";

export const LeerArchivo = async (ruta: string, directorio?: string) => {
  let rutaLectura = ruta;

  if (directorio) {
    rutaLectura = directorio + ruta;
  }

  let data: any = [];
  try {
    const dataArchivo: any = await DBFFile.open(rutaLectura);

    /**Mostrar los compos contenidos */
    // console.log(
    //   `Field names: ${dataArchivo.fields.map((f: any) => f.name).join(", ")}`
    // );

    for await (const dataObtnenida of dataArchivo) {
      data.push(dataObtnenida);
    }

    return data;
  } catch (error) {
    const send = config.ruta_respuesta_sunat == ruta ? true : false;

    if (send) {
      console.log("Creando Historial de envios");
      CREAR_DBF(
        [
          { name: "DOCUMENTO", type: "C", size: 255 },
          { name: "MENSAJE", type: "C", size: 255 },
          { name: "ESTATUS", type: "C", size: 255 },
          { name: "RUC", type: "C", size: 255 },
          { name: "SUCURSAL", type: "C", size: 255 },
        ],
        rutaLectura
      );
      throw new Error("Hubo un error al leer historial");
    }

    console.log(error);
    throw new Error("Error de lectura");
  }
};
