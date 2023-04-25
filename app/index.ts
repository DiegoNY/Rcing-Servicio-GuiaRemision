import {
  ruta_respuesta_sunat,
  cabecera,
  detalle,
  id_sucursal,
  ruc,
  tiempo,
  tiempo_limpiar_errores,
} from "./config/config.json";
import { ProcesarArchivos } from "./procesar_documentos/ProcesarArchivo";
import { ProcesarDocuemntos } from "./procesar_documentos/ProcesarDocumentos";
import {
  Documento,
  RespuestaServicio,
  RespuestaSunat,
} from "./types/serviceDoc";
import { Declarar } from "./Declarar";
import { RegistrarEnvio } from "./procesar_documentos/RegistrarEnvio";
import { senStatus } from "./service/apu.service";
import express from "express";

const app = express();

let DOCS: Documento[] = [];
const directorio = __dirname;

let documentos_errores: Documento[] = [];

const LimpiarErrores = () => {
  documentos_errores = [];
};

const ValidarInformacion = (data: Documento[]) => {
  documentos_errores.map((docError) => {
    const docIndex = data.findIndex(
      (docData) => docData.CodVenta == docError.CodVenta
    );
    data.splice(docIndex, 1);
  });

  // console.log(data);
  return data;
};

setInterval(() => {
  ProcesarArchivos(cabecera, false, detalle, ruta_respuesta_sunat, directorio)
    .then((data) => {
      const documentos = ProcesarDocuemntos(data, ruc, id_sucursal);

      console.log(documentos);
      const documentosEnviar = ValidarInformacion(documentos);

      const documentosEnviados: RespuestaSunat[] = [];

      if (documentosEnviar.length != 0) {
        console.log("Declarando");
        console.log(documentosEnviar);
        Declarar(documentosEnviar)
          .then((rta: any) => {
            const { data } = rta;

            console.log(data);

            data.map((documento: RespuestaServicio) => {
              const indexDoc = documentosEnviar.findIndex(
                (documentoMock) =>
                  `${documentoMock.CodVenta}-${documentoMock.TipoDoc}` ==
                  documento.documento
              );

              if (documento.estatus == 1) {
                documentosEnviados.push({
                  DOCUMENTO: documento.documento,
                  MENSAJE: documento.Message,
                  ESTATUS: `${documento.estatus}`,
                  RUC: ruc,
                  SUCURSAL: `${id_sucursal}`,
                });
                return;
              }

              documentos_errores.push(documentosEnviar[indexDoc]);
              console.log("Registrndo error" + documento.documento);
            });

            RegistrarEnvio(
              documentosEnviados,
              __dirname + ruta_respuesta_sunat
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }

      DOCS = documentos;
    })
    .catch((error) => {
      console.log(error);
    });
}, tiempo);

setInterval(LimpiarErrores, tiempo_limpiar_errores);

/**Enviando estado de servicio cada 5 min  */

setInterval(async () => {
  try {
    const rta = await senStatus();
    console.log(rta);
  } catch (error) {
    console.log(error);
  }
}, 300000);

app.get("", (req, res) => {
  res.send(DOCS);
});

app.listen(3007, () => {
  console.log("conectado");
});
