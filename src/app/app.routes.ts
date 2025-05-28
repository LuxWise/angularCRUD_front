import { Routes } from '@angular/router';
import { PrivateComponent } from './private/private.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
  { path: '', component: FormComponent }, // Ruta para el login (vista principal)
  { path: 'private', component: PrivateComponent }, // Ruta privada
];
