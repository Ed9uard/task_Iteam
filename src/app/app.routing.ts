import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: 'cabinet',
        loadChildren: () => import('@feature/cabinet/cabinet.module').then(m => m.CabinetModule)
    },
    { path: '**', redirectTo: '/cabinet' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true})],
    exports: [RouterModule]
})
export class AppRouting {
}
