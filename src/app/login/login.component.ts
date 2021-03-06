import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@NgModule({
  imports: [FormsModule]
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  exibirLoader = false;
  sessaoInvalida = false;
  error = '';
  constructor(private LoginService : LoginService,
              private router : Router) { }

  ngOnInit() {}
  async entrar(f: NgForm) {
    let usuario = f.value;
    this.exibirLoader = true;
    await this.LoginService.authUser(usuario).toPromise()
      .then( res => {
        this.exibirLoader = false;
        this.validaSessao(res);
      })
      .catch( err => {
        this.error = JSON.stringify(err);
      })
  }

  validaSessao(dados){
    if(dados.mensagem){
      this.sessaoInvalida = true;
      return;
    }

    if(dados.hash){
      this.LoginService.setSessao(dados);
      this.sessaoInvalida = false;
      this.router.navigate(["/tabs"]);
    }
  }

  viewPass(){
    if(document.querySelector("#senha").getAttribute("type")=="text"){
      document.querySelector("#senha").setAttribute("type", "password");
    }else{
      document.querySelector("#senha").setAttribute("type", "text");
    }
  }

}
