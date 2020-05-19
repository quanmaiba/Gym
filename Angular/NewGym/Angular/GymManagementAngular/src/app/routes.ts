import { MemberAddoreditComponent } from './members/member-addoredit/member-addoredit.component';
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
    { path: 'members', component: MemberListComponent},
    { path: 'members/list', component: MemberListComponent},
    { path: 'members/edit/:id', component: MemberAddoreditComponent},
    { path: 'members/create', component: MemberCreateComponent},
    { path: 'members/createMember', component: MemberAddoreditComponent},
    { path: 'members/detail', component: MemberDetailComponent},
    { path: '', redirectTo: 'members', pathMatch: 'full'},
    { path: '**', component: NotfoundComponent}
];

