import { QTableProps } from 'quasar';
import { ITel, IEntidadType, IEntidad } from 'src/modules';
/**
 * TelGuideColumnFormatter
 * @param _tipoEntidad IEntidadType
 * @returns  QTableProps['columns']
 */
export function TelGuideColumnFormatter(_tipoEntidad: IEntidadType): QTableProps['columns'] {
  const colLabel = {
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
  return [
    {
      name: 'tel',
      required: true,
      label: colLabel.tel,
      align: 'left',
      field: tel => (tel as ITel).tel,
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
}
/**
 * EntityGuideColumnFormatter
 * @returns 
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