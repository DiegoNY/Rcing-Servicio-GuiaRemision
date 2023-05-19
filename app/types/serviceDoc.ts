export type Item = {
  CodigoItem: string;
  Descripcion: string;
  Cantidad: number;
  Unidad: string;
  Igv: number | null;
  Precio: number | null;
  SubTotal: number | null;
  Total: number | null;
  Descuento: number | null;
  Lote: string | null;
  FechaVcto: string | null;
  Labora: string | null;
  Pastilla: null | string;
  Palote: null | string;
};

export type Cuota = {
  MontoCuota: string;
  FechaCuota: string;
  NroCuota: string;
};

export type GuiaRemision = {
  CodMotTras: string;
  DesMotTras: string;
  CodModTras: string;
  DesModTras: string;
  FechaIniTraslado: string;
  PesoBruto: number;
  NroBultos: number;
  TipoDocConductor: number;
  NroDocConductor: number | string;
  NombreConductor: string;
  NroLicencia: string;
  Placa: string;
  DireccionPartida: string;
  UbigeoPartida: number;
  DireccionLlegada: string;
  UbigeoLlegada: number;
};

export type Documento = {
  CORRELATIV: string;
  items: Item[];
  cuotas: Cuota[];
  cliente: string;
  NroDocCliente: string;
  TipoDocCliente: string;
  DirCliente: string;
  TipoDoc: string;
  CodVenta: string;
  Serie: string;
  Correlativo: string;
  FechaEmision: string;
  HoraEmision: string;
  FechaVencimiento: string;
  Moneda: string | null;
  FormaPago: string | null;
  Base: number;
  Igv: number;
  MontoExcento: number;
  MontoGratuito: number;
  Descuento: number;
  TotalDocumento: number;
  Porcentaje: number;
  NGuia: number;
  TipoCambio: number;
  FechaReferencia: null | string;
  TipoReferencia: null | string;
  DocumentoReferencia: null | string;
  CodMotivo: null | string;
  Motivo: null | string;
  otros: string;
  Detraccion: number;
  PorcDetraccion: number;
  MontoDetraccion: number;
  RegimenPercepcion: number;
  TasaPercepcion: number;
  MontoPercepcion: number;
  ruc: string;
  idSucursal: number;
  Estado: number;
  archivoPath?: string;
  archivo?: string;
  placa: null | string;
  datosguia: GuiaRemision[];
  HoraReferencia: string;
};

export type RespuestaServicio = {
  estatus: number;
  Message: string;
  documento: string;
};

export type Cabecera = {
  FECEMISION: Date;
  HOREMISION: string;
  TIPDOCGUIA: string;
  SERNUMGUIA: string;
  NUMDOCDEST: string;
  TIPDOCDEST: string;
  RZNSOCDEST: string;
  CODMOTTRAS: string;
  DESMOTTRAS: string;
  PSOBRUTOTB: number;
  NUMTOTBULT: number;
  MODTRASGUI: string;
  FECINITRAS: string;
  NUMDOCTRAN: string;
  TIPDOCTRAN: string;
  NOMTRANSPO: string;
  NUMPLACA: string;
  NOMDOCCHOF: string;
  TIPDOCCHOF: string;
  NOMBCHOFER: string;
  UBILLEGADA: string;
  DIRLLEGADA: string;
  UBIPARTIDA: string;
  DIRPARTIDA: string;
  TIPODOCREL: string;
  NUMDOCREL: string;
  STATUS: string | number;
  NUMLICCHOF: string;
};

export type CreditoCuotas = {
  SERIE: string;
  CORRELATIV: string;
  TIPO_DOCTO: string;
  NRO_CUOTA: number;
  FECH_CUOTA: Date;
  MONT_CUOTA: number;
  STATUS: string;
};

export type DetalleItems = {
  SERNUMGUIA: string;
  CODITEM: string;
  UNIMEDITEM: string;
  CANITEM: string;
  DESITEM: string;
  PESOITEM: string;
  BULTONITEM: string;
  LOTE: string;
  FECHAVCTO: string;
  LABORA: string;
};

export type RespuestaSunat = {
  DOCUMENTO: string;
  MENSAJE: string;
  ESTATUS: string;
  RUC: string;
  SUCURSAL: string;
};
