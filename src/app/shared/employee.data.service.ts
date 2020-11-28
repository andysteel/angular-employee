import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountResponse, EmployeeInsertRequest, EmployeeResponse, EmployeeListResponse, Employee } from '../pages/employee/request/employee.request';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class EmployeeDataService {

  constructor(private http: HttpClient){}
  private URL_API: string = window.location.hostname.includes('localhost')
                            ? 'http://localhost:8080/api/v1/employees/'
                            : 'https://employee-andysteel-api.herokuapp.com/api/v1/employees/';

  createEmployee(request: EmployeeInsertRequest): Observable<EmployeeInsertRequest> {
    return this.http.post<EmployeeInsertRequest>(`${this.URL_API}`, request)
    .pipe(
      catchError(this.handleError)
    );
  }

  listEmployee(index: number, size: number): Observable<EmployeeListResponse> {
    return this.http.get<EmployeeListResponse>(`${this.URL_API}index/${index}/size/${size}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  countEmployee(): Observable<CountResponse> {
    return this.http.get<CountResponse>(`${this.URL_API}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getEmployee(id: string): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(`${this.URL_API}${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateEmployee(employee: Employee): Observable<EmployeeResponse> {
    return this.http.put<EmployeeResponse>(`${this.URL_API}${employee.id}`, employee)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteEmployee(id: number): Observable<number> {
    return this.http.delete<number>(`${this.URL_API}${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else if (error.error instanceof ProgressEvent) {
      console.error(error.message);
      return throwError('Something is wrong with the API communication.');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      `Something bad happened; ${error.error.response}`);
  }
}
