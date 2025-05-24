export interface Cancion {
  titulo: string;
  autor: string;
  genero: string;
  fecha: Date;
  imagen: string;
  Comentarios: string[]; //Default, should have interface comentarios
}
