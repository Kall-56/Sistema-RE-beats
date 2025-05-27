//import {Usuario} from '../log-in/Usuario.interface';
import {Cancion} from '../cancion/cancion.interface';

export interface Playlist {
  Canciones: Cancion[];
  Descripcion: string;
  Propietario: string;

}
