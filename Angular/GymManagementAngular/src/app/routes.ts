import { MemberCreateComponent } from './members/member-create/member-create.component';

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';

import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { NotfoundComponent } from './notfound/notfound.component';

export const appRoutes: Routes = [
    { path: '', component: MemberCreateComponent},
    {
        path: '',
       
        children: [
            { path: 'members', component: MemberListComponent,
                resolve: {users: MemberListResolver}},
            { path: 'members/:id', component: MemberDetailComponent,
                resolve: {user: MemberDetailResolver}},                     
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', component: NotfoundComponent}
];

