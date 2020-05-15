import { MemberCreateComponent } from './members/member-create/member-create.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: MemberCreateComponent},
  {
      path: '',
      runGuardsAndResolvers: 'always',
      // canActivate: [AuthGuard],
      // children: [
      //     { path: 'members', component: MemberListComponent,
      //         resolve: {users: MemberListResolver}},
      //     { path: 'members/:id', component: MemberDetailComponent,
      //         resolve: {user: MemberDetailResolver}},
      //     { path: 'member/edit', component: MemberEditComponent,
      //         resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
      //     { path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
      //     { path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}}
      // ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
    