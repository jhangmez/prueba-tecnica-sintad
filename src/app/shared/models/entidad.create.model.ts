export interface EntidadCrear {
  tipoDocumento: { idTipoDocumento: number };
  nroDocumento: string;
  razonSocial: string;
  nombreComercial?: string;
  tipoContribuyente?: { idTipoContribuyente: number } | null;
  direccion?: string;
  telefono?: string;
  estado?: boolean;
}
