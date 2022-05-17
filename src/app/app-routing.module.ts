import { DepotPage } from './depot/depot.page';
import { Component, OnInit } from '@angular/core';
import { TransfertPage } from './transfert/transfert.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { scheduled } from 'rxjs';
import { DepotComponent } from './depot/depot.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'members',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admin-systeme',
    loadChildren: () => import('./admin-systeme/admin-systeme.module').then( m => m.AdminSystemePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'agence-users',
    loadChildren: () => import('./simple-agent/simple-agent.module').then( m => m.SimpleAgentPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'transfert',
    loadChildren: () => import('./transfert/transfert.module').then( m => m.TransfertPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'calculateur-frais',
    loadChildren: () => import('./calculateur-frais/calculateur-frais.module').then( m => m.CalculateurFraisPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'retrait',
    loadChildren: () => import('./retrait/retrait.module').then( m => m.RetraitPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-agence',
    loadChildren: () => import('./admin-agence/admin-agence.module').then( m => m.AdminAgencePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'creer-agence',
    loadChildren: () => import('./creer-agence/creer-agence.module').then( m => m.CreerAgencePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'caissier',
    loadChildren: () => import('./caissier/caissier.module').then( m => m.CaissierPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'depot-compte',
    loadChildren: () => import('./depot-compte/depot-compte.module').then( m => m.DepotComptePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'header',
    loadChildren: () => import('./header/header.module').then( m => m.HeaderPageModule)
  },
  {
    path: 'list-agences',
    loadChildren: () => import('./list-agences/list-agences.module').then( m => m.ListAgencesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'liste-transactions',
    loadChildren: () => import('./liste-transactions/liste-transactions.module').then( m => m.ListeTransactionsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'commissions',
    loadChildren: () => import('./commissions/commissions.module').then( m => m.CommissionsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'agence-admintransaction',
    loadChildren: () => import('./agence-admintransaction/agence-admintransaction.module').then( m => m.AgenceAdmintransactionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'client-interface',
    loadChildren: () => import('./client/client-interface/client-interface.module').then( m => m.ClientInterfacePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
