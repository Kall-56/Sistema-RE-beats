import {Playlist} from '../playlist/playlist.interface';

export interface Usuario {
  nombre: string;
  clave: string;
  ID: number;
  Amigos: Usuario[];
  Playlists: Playlist[];
}
