import {
  GenerarCodigoVenta,
  ValidarPorcentaje,
} from "../helpers/Documentos.helper";
import { Cabecera, Documento } from "../types/serviceDoc";

export const CrearEstructuraCabecera = (
  documento: Cabecera,
  ruc: string,
  sucursal: number
): Documento => {
  const { correlativo, codigo, serie } = GenerarCodigoVenta(
    documento.SERNUMGUIA
  );

  const documentoDeclarar: Documento = {
    CORRELATIV: documento.SERNUMGUIA,
    cliente: documento.RZNSOCDEST,
    NroDocCliente: documento.NUMDOCDEST,
    TipoDocCliente: documento.TIPDOCDEST,
    DirCliente: "S/N",
    TipoDoc: documento.TIPDOCGUIA,
    CodVenta: documento.SERNUMGUIA,
    Serie: serie,
    Correlativo: correlativo,
    FechaEmision: new Date(`${documento.FECEMISION}`)
      .toISOString()
      .substring(0, 10),
    HoraEmision: "00:00:00",
    HoraReferencia: "00:00:00",
    FechaVencimiento: new Date(`${documento.FECEMISION}`)
      .toISOString()
      .substring(0, 10),
    items: [],
    cuotas: [],
    Moneda: null,
    FormaPago: null,
    Base: 0,
    Igv: 0,
    MontoExcento: 0,
    MontoGratuito: 0,
    Descuento: 0,
    TotalDocumento: 0,
    Porcentaje: 0,
    NGuia: 0,
    TipoCambio: 0,
    FechaReferencia: new Date(`${documento.FECEMISION}`)
      .toISOString()
      .substring(0, 10),
    TipoReferencia: documento.TIPODOCREL,
    DocumentoReferencia: documento.NUMDOCREL,
    CodMotivo: null,
    Motivo: null,
    otros: "V",
    Detraccion: 0,
    PorcDetraccion: 0,
    MontoDetraccion: 0,
    RegimenPercepcion: 0,
    TasaPercepcion: 0,
    MontoPercepcion: 0,
    ruc: ruc,
    idSucursal: sucursal,
    placa: null,
    Estado: 1,
    datosguia: [],
  };

  return documentoDeclarar;
};
