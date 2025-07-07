export interface Usuario {
  nombre: string;
  id: number;
  rol: 'Admin' | 'Usuario';
  amigos: number[];
  playlists: number[];
}
