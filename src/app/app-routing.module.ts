import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { DashboardComponent } from './dashboard/dashboard.component';
import { PokeFrontComponent } from  './pokemon-list/pokemon-list.component';
import { PokeDetailComponent } from './pokemon-detail/pokemon-detail.component';

const routes: Routes = [

  //{ path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: PokeDetailComponent },
  { path: ':page', component: PokeFrontComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
