

import { StopwatchPanelComponent } from './pages/stopwatch-panel/stopwatch-panel.component';
import { UserPanelComponent } from './pages/user-panel/user-profile-panel.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path: '',
    children: [
        { path: 'stopwatch-panel', component: StopwatchPanelComponent},
        { path: 'user-panel', component: UserPanelComponent}, 
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CabinetRouting { }
