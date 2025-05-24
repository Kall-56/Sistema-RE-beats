export interface Usuario {
  nombre: string;
  clave: string;
  ID: number;
  Amigos: Usuario[];
  Playlists: string[]; //Default, should be type playlist
}
