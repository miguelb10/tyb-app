import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FacturasComponent } from './facturas/facturas.component';
import { LoginComponent } from './usuarios/login.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { ClienteService } from './clientes/cliente.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormClienteComponent } from './clientes/form-cliente/form-cliente.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { ProductosComponent } from './productos/productos.component';
import { FormProductoComponent } from './productos/form-producto/form-producto.component';
import { ColorsComponent } from './colors/colors.component';
import { FormFacturaComponent } from './facturas/form-factura/form-factura.component';
import { LetrasComponent } from './letras/letras.component';
import { CajasComponent } from './cajas/cajas.component';
import { InicioComponent } from './inicio/inicio.component';
import { FormCajaComponent } from './cajas/form-caja/form-caja.component';
import { FormColorComponent } from './colors/form-color/form-color.component';
import { FormLetraComponent } from './letras/form-letra/form-letra.component';
import { FormUsuarioComponent } from './usuarios/form-usuario/form-usuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ChartModule, LineSeriesService, CategoryService } from '@syncfusion/ej2-angular-charts';
import { ModalClientesComponent } from './facturas/modal-clientes/modal-clientes.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'clientes', component: ClientesComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'clientes/page/:page', component: ClientesComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'clientes/form', component: FormClienteComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'clientes/form/:id', component: FormClienteComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'productos', component: ProductosComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'productos/page/:page', component: ProductosComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'productos/form', component: FormProductoComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'productos/form/:id', component: FormProductoComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'cajas', component: CajasComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'cajas/page/:page', component: CajasComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'cajas/form', component: FormCajaComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'cajas/form/:id', component: FormCajaComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'facturas', component: FacturasComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'facturas/page/:page', component: FacturasComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'facturas/form', component: FormFacturaComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'facturas/form/:clienteId', component: FormFacturaComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'letras', component: LetrasComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'letras/page/:page', component: LetrasComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'letras/form', component: FormLetraComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'letras/form/:id', component: FormLetraComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'colors', component: ColorsComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'colors/page/:page', component: ColorsComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'colors/form', component: FormColorComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'colors/form/:id', component: FormColorComponent, canLoad: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientesComponent,
    FacturasComponent,
    LoginComponent,
    PaginatorComponent,
    FormClienteComponent,
    ProductosComponent,
    FormProductoComponent,
    ColorsComponent,
    FormFacturaComponent,
    LetrasComponent,
    CajasComponent,
    InicioComponent,
    FormCajaComponent,
    FormColorComponent,
    FormLetraComponent,
    FormUsuarioComponent,
    UsuariosComponent,
    ModalClientesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ChartModule
  ],
  providers: [ClienteService, LineSeriesService, CategoryService,
  {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
