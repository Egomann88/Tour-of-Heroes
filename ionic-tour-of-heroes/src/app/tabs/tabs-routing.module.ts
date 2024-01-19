import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'heroes',
        loadChildren: () =>
          import('../heroes/heroes.module').then((m) => m.HeroesPageModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../settings/settings.module').then(
            (m) => m.settingsPageModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('../login-register/login-register.module').then(
            (m) => m.LoginRegisterPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/heroes',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/heroes',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
