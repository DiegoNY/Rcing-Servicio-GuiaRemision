import { DetalleItems, Item } from "../types/serviceDoc";

export const CrearEstructuraItem = (
  items: DetalleItems[],
  codigo: string
): Item[] => {
  const ItemsDeclarar: Item[] = [];

  items.map((item) => {
    if (item.SERNUMGUIA == codigo) {
      ItemsDeclarar.push({
        CodigoItem: item.CODITEM,
        Descripcion: item.DESITEM,
        Unidad: item.UNIMEDITEM,
        Cantidad: Number(item.CANITEM),
        Precio: null,
        SubTotal: null,
        Igv: null,
        Descuento: null,
        Total: null,
        Lote: item.LOTE,
        FechaVcto: null,
        Labora: item.LABORA,
        Pastilla: null,
        Palote: null,
      });
    }
  });

  return ItemsDeclarar;
};
