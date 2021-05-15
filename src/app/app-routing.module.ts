import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    { path: '', redirectTo: 'bookmarks', pathMatch: 'full'},
    {
        path: 'bookmarks',
        loadChildren: '../app/bookmarks/bookmarks.module#BookmarksModule'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }