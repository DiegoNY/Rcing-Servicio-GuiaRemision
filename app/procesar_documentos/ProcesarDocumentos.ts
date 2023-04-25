import { CrearEstructuraCabecera } from "../crear_estructura/CrearEstructuraCabecera";
import { CrearEstructuraGuiaRemision } from "../crear_estructura/CrearEstructuraGuiaRemision";
import { CrearEstructuraItem } from "../crear_estructura/CrearEstructuraItem";
import { ProcesarArchivoType } from "../types/ProcesarArchivo.type";
import { Documento } from "../types/serviceDoc";

export const ProcesarDocuemntos = (
  data: ProcesarArchivoType,
  ruc: string,
  sucursal: number
) => {
  const DocumentosDeclarar: Documento[] = [];

  const { cabecera, items, cuotas, respuestaSunat } = data;

  cabecera.map((documento) => {
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
    if (index != -1) {
      return;
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
