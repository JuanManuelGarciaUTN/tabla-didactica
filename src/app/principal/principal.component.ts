import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent  implements OnInit {

  public EnumTipo = Tipo;
  public EnumIdioma = Idioma;
  public idioma: Idioma = Idioma.esp;
  public tipo: Tipo = Tipo.colores;
  public actual = -1;
  public colores = ["verde", "rojo", "azul", "amarillo", "celeste", "naranja"];
  public animales = ["vaca", "perro", "caballo", "gato", "oveja", "conejo"];
  public numeros = ["uno", "dos", "tres", "cuatro", "cinco", "seis"];
  public audio: HTMLAudioElement;
  public jugando = true;
  public ganaste = false;

  constructor(private router: Router) {
    this.audio = new Audio();
   }

  ngOnInit() {
    this.iniciarJuego();
  }

  randomInt(min:number, max:number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  iniciarJuego(){
    this.jugando = true;
    this.ganaste = false;
    this.actual = this.randomInt(0,6);
    this.iniciarSonido();
  }

  volverAIntentar(){
    this.jugando = true;
    this.ganaste = false;
    this.iniciarSonido();
  }

  elegir(valor: string){
    this.jugando = false;
    if(this.animales[this.actual] == valor || this.numeros[this.actual] == valor || this.colores[this.actual] == valor){
      this.ganaste = true;
    }
    else{
      this.ganaste = false;
    }
  }

  iniciarSonido(){
    let direccion = "../../assets/"+this.idioma.toString()+"-";
    console.log(this.actual, direccion, this.tipo);
    switch(this.tipo){
      case Tipo.animales:
        direccion = direccion+this.animales[this.actual];
        break;

      case Tipo.colores:
        direccion = direccion+this.colores[this.actual];
        break;

      case Tipo.numeros:
        direccion = direccion+this.numeros[this.actual];
        break;
    }
    direccion += ".mp3";
    this.audio.src = direccion;
    this.audio.load();
    this.audio.play();
  }

  cerrarSesion(){
    this.router.navigate(['home']);
  }

  cambiarEsp(){
    this.idioma = Idioma.esp;
    this.iniciarJuego();
  }
  cambiarEng(){
    this.idioma = Idioma.eng;
    this.iniciarJuego();
  }
  cambiarPtg(){
    this.idioma = Idioma.ptg;
    this.iniciarJuego();
  }
  cambiarNumeros(){
    this.tipo = Tipo.numeros;
    this.iniciarJuego();
  }
  cambiarAnimales(){
    this.tipo = Tipo.animales;
    this.iniciarJuego();
  }
  cambiarColores(){
    this.tipo = Tipo.colores;
    this.iniciarJuego();
  }
}

enum Idioma{
  esp = "esp",
  eng = "eng",
  ptg = "ptg"
}
enum Tipo{
  animales,
  colores,
  numeros
}


