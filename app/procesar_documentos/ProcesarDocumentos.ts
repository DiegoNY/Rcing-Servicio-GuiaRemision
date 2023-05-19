import { CrearEstructuraCabecera } from "../crear_estructura/CrearEstructuraCabecera";
import { CrearEstructuraGuiaRemision } from "../crear_estructura/CrearEstructuraGuiaRemision";
import { CrearEstructuraItem } from "../crear_estructura/CrearEstructuraItem";
import { ProcesarArchivoType } from "../types/ProcesarArchivo.type";
import { Documento } from "../types/serviceDoc";
import { ignorar_documento_enviado_sunat } from "../config/config.json";
export const ProcesarDocuemntos = (
  data: ProcesarArchivoType,
  ruc: string,
  sucursal: number
) => {
  const DocumentosDeclarar: Documento[] = [];

  const { cabecera, items, cuotas, respuestaSunat } = data;

  cabecera.map((documento) => {
    if (documento.STATUS == 1 || documento.STATUS == "1") {
      return;
    }
    const documentoEstructurados = CrearEstructuraCabecera(
      documento,
      ruc,
      sucursal
    );

    const index = respuestaSunat.findIndex(
      (documentoDeclarado) =>
        documentoDeclarado.DOCUMENTO ==
          `${documentoEstructurados.CodVenta}-${documentoEstructurados.TipoDoc}` &&
        documentoDeclarado.ESTATUS == "1"
    );

    // console.log(index);

    if (documentoEstructurados.CodVenta != ignorar_documento_enviado_sunat) {
      // console.log(index);
      if (index != -1) {
        return;
      }
    }
    // console.log("paso");
    const itemEstructurados = CrearEstructuraItem(items, documento.SERNUMGUIA);
    const guia = CrearEstructuraGuiaRemision(documento, items);

    DocumentosDeclarar.push({
      ...documentoEstructurados,
      items: itemEstructurados,
      cuotas: [],
      datosguia: guia,
    });
  });

  return DocumentosDeclarar;
};
