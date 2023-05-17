import { Injectable, Pipe } from '@angular/core';
import { Observable, of, pipe, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError} from 'rxjs/operators';

import { Project } from 'src/app/class/project'

//CRUD


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  public project$ = new Subject<Project>();
  public projects$ = new Subject<Project[]>();

  public project= new Project ();
  public projects: Project [] = [];

  httpOptions = {
    Header: new HttpHeaders({'content-type':'application/json'})
  }
  
  public url = environment.url 

  
  
  constructor(
    private http: HttpClient
  ) { }
  
  
  all$(): Observable<Project[]>{
    return this.projects$.asObservable();
  }
  

  all(): Observable<any>{
    this.projects =[]
    return this.http.get<Project[]>(this.url)
    .pipe(
      map( (res: any) =>{
        res.forEach((
          item: any) => {
        this.project.setValues(item)
        this.projects.push(this.project)

        });
        this.projects$.next(this.projects)
      }),
      catchError((err) => of(err))
    )
      
  }
}
    

  

   

