import { PaginatedResult } from './../_models/pagination';
import { Member } from './../_models/member';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createMember(member ): Observable<Member> {
    console.log(this.baseUrl + 'Members/GetAll');
    this.http.get<Member[]>(this.baseUrl + 'Members/GetAll');
    console.log(JSON.stringify(member));
    return this.http.post<Member>(this.baseUrl + 'Members/Create',member);
  }

  createMembers(member: Member): Observable<Member> {
    return this.http.post<Member>(this.baseUrl + 'Members/CreateMember',member);
  }
  
  getAllMembers(): Observable<Member[]> {
    // console.log(this.baseUrl + 'Members/GetAll')
    return this.http.get<Member[]>(this.baseUrl + 'Members/GetAll').pipe(
      tap(data => {
        console.log(`${JSON.stringify(data)}`)
      })
    )
  }

  getMember(id): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + 'members/' + id);
  }
  updateMember(id: number, member: Member) {
    return this.http.put(this.baseUrl + 'members/' + id, member);
  }
  setMainPhoto(memberId: number, id: number) {
    return this.http.post(this.baseUrl + 'members/' + memberId + '/photos/' + id + '/setMain', {});
  }
  deleteMember(memberId: number, id: number) {
    return this.http.delete(this.baseUrl + 'members/' + memberId + '/photos/' + id);
  }
 
}
