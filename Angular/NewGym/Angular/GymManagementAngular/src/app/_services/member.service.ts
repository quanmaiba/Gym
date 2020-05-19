import { PaginatedResult } from './../_models/pagination';
import { Member } from './../_models/member';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry,catchError } from 'rxjs/operators';

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
  
  getAllMember(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + 'Members/GetAll')
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + 'Members/GetAll')  
  }

  getMember(id): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + 'Members/Get/' + id);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'Members/Update', member);
  }
 
  deleteMember(memberId: any) {
    return this.http.delete(this.baseUrl + 'Members/Delete/' + memberId );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
 
}
