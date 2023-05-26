import { ValidarTipoTraslado } from "../helpers/Documentos.helper";
import { Cabecera, DetalleItems, GuiaRemision } from "../types/serviceDoc";

export const CrearEstructuraGuiaRemision = (
  documento: Cabecera,
  items: DetalleItems[]
): GuiaRemision[] => {
  const GuiaRemision: GuiaRemision[] = [];
  GuiaRemision.push({
    CodMotTras: documento.CODMOTTRAS,
    DesMotTras: documento.DESMOTTRAS,
    CodModTras: documento.MODTRASGUI,
    DesModTras: ValidarTipoTraslado(documento.MODTRASGUI),
    FechaIniTraslado: documento.FECINITRAS,
    PesoBruto: documento.PSOBRUTOTB == 0 ? 1 : Number(documento.PSOBRUTOTB),
    NroBultos: Number(documento.NUMTOTBULT),
    TipoDocConductor:
      documento.MODTRASGUI == "01" ? Number(documento.TIPDOCTRAN) : 1,
    NroDocConductor:
      documento.MODTRASGUI == "02"
        ? documento.NOMDOCCHOF
        : documento.NUMDOCTRAN,
    DireccionLlegada: documento.DIRLLEGADA,
    UbigeoLlegada: Number(documento.UBILLEGADA),
    DireccionPartida: documento.DIRPARTIDA,
    UbigeoPartida: Number(documento.UBIPARTIDA),
    NombreConductor:
      documento.MODTRASGUI == "01"
        ? documento.NOMTRANSPO
        : documento.NOMBCHOFER,
    NroLicencia: documento.NUMLICCHOF,
    Placa: documento.NUMPLACA.replace("-", ""),
  });

  return GuiaRemision;
};
