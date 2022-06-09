import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { HistorialComponent } from './components/historial/historial.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const routes: Routes = [
  { path: '', redirectTo: 'calculadora', pathMatch: 'full'},
  { path: '', component: SidenavComponent, children: [
    {path: 'calculadora', component: CalculatorComponent},
    {path: 'historial', component: HistorialComponent},
    // {path: 'ajustes'},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
