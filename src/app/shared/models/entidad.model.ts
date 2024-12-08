import { TipoContribuyente } from './tipo-contribuyente.model';
import { TipoDocumento } from './tipo-documento.model';

export interface Entidad {
  idEntidad?: number;
  tipoDocumento: TipoDocumento;
  nroDocumento: string;
  razonSocial: string;
  nombreComercial?: string;
  tipoContribuyente?: TipoContribuyente;
  direccion?: string;
  telefono?: string;
  estado?: boolean;
}
