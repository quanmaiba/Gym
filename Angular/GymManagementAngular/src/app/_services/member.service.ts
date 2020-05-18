import { PaginatedResult } from './../_models/pagination';
import { Member } from './../_models/member';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers(page?, itemsPerPage?, memberParams?): Observable<PaginatedResult<Member[]>> {
    const paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (memberParams != null) {
      params = params.append('minAge', memberParams.minAge);
      params = params.append('maxAge', memberParams.maxAge);
      params = params.append('gender', memberParams.gender);
      params = params.append('orderBy', memberParams.orderBy);
    }

  

    return this.http.get<Member[]>(this.baseUrl + 'members', { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  createMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.baseUrl + 'Members/Create',member);
  }
  
  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + 'Members/GetAll')  
  }

  getMember(id): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + 'members/' + id);
  }
  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'Members/Update', member);
  }
 
  deleteMember(memberId: number, id: number) {
    return this.http.delete(this.baseUrl + 'members/' + memberId + '/photos/' + id);
  }
 
}
