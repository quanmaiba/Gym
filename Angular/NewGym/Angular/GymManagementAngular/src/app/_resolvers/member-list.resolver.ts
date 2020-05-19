import { MemberService } from './../_services/member.service';
import { Member } from './../_models/member';
import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyjsService } from '../_services/alertifyjs.service';

@Injectable()
export class MemberListResolver implements Resolve<Member[]> {
    pageNumber = 1;
    pageSize = 5;
    
    constructor(private userService: MemberService, private router: Router,
                private alertify: AlertifyjsService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Member[]> {
        return this.userService.getMembers(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                // this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}