export const GenerarCodigoVenta = (correlativo: string) => {
  let correlativoArr = correlativo.split("-");
  return {
    codigo: correlativo,
    correlativo: correlativoArr[1],
    serie: correlativoArr[0],
  };
};

export const ValidarPorcentaje = (igv: number) => {
  let rtaPorcenta = 0;
  if (igv > 0) {
    rtaPorcenta = 18;
  }
  return rtaPorcenta;
};

export const ValidarTipoTraslado = (tipo: string | number) => {
  if (tipo == 1 || tipo == "01") {
    return "Transporte Publico";
  }

  if (tipo == 2 || tipo == "02") {
    return "Transporte Privado";
  }
  return `Error de documento ${tipo} de transporte no existe`;
};
