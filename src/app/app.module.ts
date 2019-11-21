import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {DirectivaComponent} from './components/directiva/directiva.component';
import {ClientesComponent} from './components/clientes/clientes.component';
import {ClienteService} from './service/cliente.service';
import {APP_ROUTING} from './app.routes';
import {HttpClientModule} from '@angular/common/http';
import {FormComponent} from './components/clientes/form.component';
import {FormsModule} from '@angular/forms';

// Esto es muy parecido a lo que en spring viene siendo nuestro contenedor

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ClienteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
