import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseDeDatosService {

  public usuario?: Usuario;
  constructor(private firestore: Firestore) {}

  obtenerUsuarios(): Observable<Usuario[]>{
    const coleccion = collection(this.firestore, "usuarios");
    return collectionData(coleccion, {idField: 'id'}) as Observable<Usuario[]>;
  }

  login(datos: Usuario){
    this.usuario = datos;
  }
}
