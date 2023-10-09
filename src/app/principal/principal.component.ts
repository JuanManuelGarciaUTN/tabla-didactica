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
  public idiomaString = "🇦🇷";
  public tipo: Tipo = Tipo.colores;
  public tipoString = "🎨";
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
    // this.iniciarJuego();
  }

  // randomInt(min:number, max:number) {
  //   return Math.floor(Math.random() * (max - min) + min);
  // }

  // iniciarJuego(){
  //   this.jugando = true;
  //   this.ganaste = false;
  //   this.actual = this.randomInt(0,6);
  //   this.iniciarSonido();
  // }

  // volverAIntentar(){
  //   this.jugando = true;
  //   this.ganaste = false;
  //   this.iniciarSonido();
  // }

  // elegir(valor: string){
  //   this.jugando = false;
  //   if(this.animales[this.actual] == valor || this.numeros[this.actual] == valor || this.colores[this.actual] == valor){
  //     this.ganaste = true;
  //   }
  //   else{
  //     this.ganaste = false;
  //   }
  // }

  iniciarSonido(elemento: string){
    let direccion = "../../assets/"+this.idioma.toString()+"-"+elemento;
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
    this.idiomaString = "🇦🇷";
    // this.iniciarJuego();
  }
  cambiarEng(){
    this.idioma = Idioma.eng;
    this.idiomaString = "🇬🇧";
    // this.iniciarJuego();
  }
  cambiarPtg(){
    this.idioma = Idioma.ptg;
    this.idiomaString = "🇵🇹";
    // this.iniciarJuego();
  }
  cambiarNumeros(){
    this.tipo = Tipo.numeros;
    this.tipoString = "💯";
    // this.iniciarJuego();
  }
  cambiarAnimales(){
    this.tipo = Tipo.animales;
    this.tipoString = "🐮";
    // this.iniciarJuego();
  }
  cambiarColores(){
    this.tipo = Tipo.colores;
    this.tipoString = "🎨";
    // this.iniciarJuego();
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


