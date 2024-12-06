export interface Entidad {
  idEntidad?: number;
  idTipoDocumento: number;
  nroDocumento: string;
  razonSocial: string;
  nombreComercial?: string;
  idTipoContribuyente?: number;
  direccion?: string;
  telefono?: string;
  estado?: boolean;
}
