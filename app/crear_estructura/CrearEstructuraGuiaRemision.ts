import { ValidarTipoTraslado } from "../helpers/Documentos.helper";
import { Cabecera, DetalleItems, GuiaRemision } from "../types/serviceDoc";

export const CrearEstructuraGuiaRemision = (
  documento: Cabecera,
  items: DetalleItems[]
): GuiaRemision[] => {
  const GuiaRemision: GuiaRemision[] = [];

  items.map((item) => {
    if (item.SERNUMGUIA == documento.SERNUMGUIA) {
      GuiaRemision.push({
        CodMotTras: documento.CODMOTTRAS,
        DesMotTras: documento.DESMOTTRAS,
        CodModTras: documento.MODTRASGUI,
        DesModTras: ValidarTipoTraslado(documento.MODTRASGUI),
        FechaIniTraslado: documento.FECINITRAS,
        PesoBruto: item.PESOITEM == "0" ? 1 : Number(item.PESOITEM),
        NroBultos: Number(item.BULTONITEM),
        TipoDocConductor: Number(documento.TIPDOCTRAN),
        NroDocConductor: Number(documento.NUMDOCTRAN),
        DireccionLlegada: documento.DIRLLEGADA,
        UbigeoLlegada: Number(documento.UBILLEGADA),
        DireccionPartida: documento.DIRPARTIDA,
        UbigeoPartida: Number(documento.UBIPARTIDA),
        NombreConductor:
          documento.MODTRASGUI == "01"
            ? documento.NOMTRANSPO
            : documento.NOMBCHOFER,
        NroLicencia: documento.NUMLICCHOF,
        Placa: documento.NUMPLACA,
      });
    }
  });

  return GuiaRemision;
};
