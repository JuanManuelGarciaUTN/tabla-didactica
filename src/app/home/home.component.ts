import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, QueryList, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseDeDatosService } from '../services/base-de-datos.service';
import { Gesture, GestureController, GestureDetail, IonContent } from '@ionic/angular';
import {SplashScreen} from '@capacitor/splash-screen';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit{

  @ViewChild(IonContent, { read: ElementRef }) card?: QueryList<ElementRef>;
  
  public form!: FormGroup;
  public loginInvalido = false;
  public validando = false;
  public cargando = false;
  public mostrarMenu = false;

  constructor(private fb: FormBuilder,
            private router : Router, 
            private db: BaseDeDatosService,
            private gestureCtrl: GestureController,
            private el: ElementRef,
            private cd: ChangeDetectorRef){ 
    this.db.usuario = undefined;
    this.form = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password':['', [Validators.required]],
    });
  }

  ngAfterViewInit(){
    

    this.cargando = true;
    setTimeout(()=>{
      SplashScreen.hide();
      setTimeout(()=>{
        this.cargando = false;
        this.EncontrarPantalla();
      }, 2500);
    }, 1000);
  }

  private EncontrarPantalla(){
    setTimeout(()=>{
      const listado = document.getElementById("pantalla");
      if(listado){
        this.Swipe(listado);
      }
      else{
        this.EncontrarPantalla();
      }
    }
    ),100;
  }

  private Swipe(items: HTMLElement | null){
    if(items){
      const gesture: Gesture = this.gestureCtrl.create({
        el: items,
        threshold: 15,
        gestureName: "swipe",
        onStart: ev =>{

        },
        onMove: ev=>{

        },
        onEnd: ev=>{
          if(ev.startX + 20 < ev.currentX){
            this.mostrar();
            console.log("Swipe Right");
          }
          else if(ev.startX - 20 > ev.currentX){
            this.ocultar();
            console.log("Swipe Left");
          }

        }
      });
      gesture.enable(true);
    }
  }

  private mostrar(){
    this.mostrarMenu = true;
    this.cd.detectChanges();
  }

  private ocultar(){
    this.mostrarMenu = false;
    this.cd.detectChanges();
  }

  Login(){
    this.limpiarEspacios();
    this.loginInvalido = false;
    this.validando = true;
    const usuario = this.form.value;
    const sub = this.db.obtenerUsuarios().subscribe(listaUsuarios=>{
      sub.unsubscribe();
      for(let datos of listaUsuarios){
        console.log(datos);
        if(datos.correo == usuario.email && datos.clave == usuario.password){
          datos.clave = "";
          this.db.login(datos);
          this.validando = false;
          this.limpiarInputs();
          this.router.navigate(["selector"]);
          return;
        }
      }
      this.loginInvalido = true;
      this.validando = false;
    });
  }

  private limpiarEspacios(){
    this.form.get('email')?.setValue(this.form.get('email')?.value.trim());
    this.form.get('password')?.setValue(this.form.get('password')?.value.trim());
  }

  private limpiarInputs(){
    this.form.get('email')?.setValue("");
    this.form.get('password')?.setValue("");
  }

  completarInvitado(){
    this.completarForm("invitado@invitado.com", "222222");
    this.ocultar();
  }

  completarAdmin(){
    this.completarForm("admin@admin.com", "111111");
    this.ocultar();
  }

  completarUsuario(){
    this.completarForm("usuario@usuario.com", "333333");
    this.ocultar();
  }

  completarAnonimo(){
    this.completarForm("anonimo@anonimo.com", "444444");
    this.ocultar();
  }

  completarTester(){
    this.completarForm("tester@tester.com", "555555");
    this.ocultar();
  }

  private completarForm(email: string, password: string){
    this.form.get('email')?.setValue(email);
    this.form.get('password')?.setValue(password);
  }

}
