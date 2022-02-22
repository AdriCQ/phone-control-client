import { QTableProps } from 'quasar';
import { DateHelper } from 'src/helpers';
import { ITel, IEntidadType, IEntidad, IFactura } from 'src/modules';
/**
 * EntityGuideColumnFormatter
 * @returns QTableProps['columns']
 */
export function EntityGuideColumnFormatter(): QTableProps['columns'] {
  return [
    {
      name: 'nombre',
      required: true,
      label: 'Nombre',
      align: 'left',
      field: ent => (ent as IEntidad).nombre,
      sortable: true
    }, {
      name: 'tipo',
      required: true,
      label: 'Topo',
      align: 'left',
      field: ent => (ent as IEntidad).tipo,
      sortable: true
    },
  ];
}
/**
 * FacturaColumnFormatter
 * @returns QTableProps['columns']
 */
export const FacturaColumnFormatter: QTableProps['columns'] = [
  {
    name: 'year',
    required: true,
    label: 'Año',
    align: 'left',
    field: ent => (ent as IFactura).year,
    sortable: true
  }, {
    name: 'mes',
    required: true,
    label: 'Mes',
    align: 'left',
    field: ent => DateHelper().monthName((ent as IFactura).mes),
    sortable: true
  }, {
    name: 'total_importe',
    required: true,
    label: 'Importe',
    align: 'left',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    field: (ent: IFactura) => `$${Number(ent.total_importe).toFixed(2)}`,
    sortable: true
  },
];


/**
 * TelGuideColumnFormatter
 * @param _tipoEntidad IEntidadType
 * @returns  QTableProps['columns']
 */
export function TelGuideColumnFormatter(_tipoEntidad: IEntidadType, isAuth = false): QTableProps['columns'] {
  const colLabel = isAuth ? {
    tel: 'Teléfono',
    lugar: 'Lugar',
    cargo: 'Cargo',
    departamento: 'Unidad',
    entidad: 'Órgano',
    comentario: 'Comentario',
    comprado: 'Comprado',
    entregado: 'Entregado'
  } : {
    tel: 'Teléfono',
    lugar: 'Lugar',
    cargo: 'Cargo',
    departamento: 'Unidad',
    entidad: 'Órgano',
    comentario: 'Comentario'
  };
  if (_tipoEntidad === 'EMPRESA') {
    colLabel.departamento = 'Departamento';
    colLabel.entidad = 'Empresa';
  }
  const rows: QTableProps['columns'] = [
    {
      name: 'tel',
      required: true,
      label: colLabel.tel,
      align: 'left',
      field: tel => (tel as ITel).telf,
      sortable: true
    }, {
      name: 'lugar',
      required: true,
      label: colLabel.lugar,
      align: 'left',
      field: tel => (tel as ITel).cargo?.departamento?.lugar?.nombre,
      sortable: true
    }, {
      name: 'cargo',
      required: false,
      label: colLabel.cargo,
      align: 'left',
      field: tel => (tel as ITel).cargo?.nombre,
      sortable: true
    }, {
      name: 'departamento',
      required: false,
      label: colLabel.departamento,
      align: 'left',
      field: tel => (tel as ITel).cargo?.departamento?.nombre,
      sortable: true
    }, {
      name: 'entidad',
      required: false,
      label: colLabel.entidad,
      align: 'left',
      field: tel => (tel as ITel).cargo?.departamento?.entidad?.nombre,
      sortable: true
    }, {
      name: 'comentario',
      required: false,
      label: colLabel.comentario,
      align: 'left',
      field: tel => (tel as ITel).comentario,
      sortable: true
    }
  ];
  if (isAuth) {
    rows.push({
      name: 'entregado',
      required: false,
      label: colLabel.entregado as string,
      align: 'left',
      field: tel => (tel as ITel).config.entregado ? 'SI' : 'NO',
      sortable: true
    }, {
      name: 'comprado',
      required: false,
      label: colLabel.comprado as string,
      align: 'left',
      field: tel => (tel as ITel).config.comprado ? 'SI' : 'NO',
      sortable: true
    })
  }
  return rows;
}