import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // { path: 'home', component: HomeComponent},
  // {
  //     path: '',
  //     runGuardsAndResolvers: 'always',
  //     canActivate: [AuthGuard],
  //     children: [
  //         { path: 'members', component: MemberListComponent,
  //             resolve: {users: MemberListResolver}},
  //         { path: 'members/:id', component: MemberDetailComponent,
  //             resolve: {user: MemberDetailResolver}},
  //         { path: 'member/edit', component: MemberEditComponent,
  //             resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
  //         { path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
  //         { path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}}
  //     ]
  // },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  //{ path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
    