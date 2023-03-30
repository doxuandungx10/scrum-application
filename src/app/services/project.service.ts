import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { UrlConstant } from '../share/Constants/Constant';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ConfigService {
  getListProject(userId: number): Observable<any>{
    return this.get(UrlConstant.PROJECT + '/GetListProject', {userId});
  }

  getProjectById(id: number): Observable<any>{
    return this.get(UrlConstant.PROJECT + '/GetProjectById', {id});
  }
  
  addProject(payload: any): Observable<any>{
    return this.post(UrlConstant.PROJECT + '/AddProject', payload);
  }
  
  getListIssueByBacklogId(backlogId: any): Observable<any>{
    return this.get(UrlConstant.ISSUE + '/GetListIssueByBacklogId', {backlogId});
  }

  updateProject(payload: any): Observable<any>{
    return this.post(UrlConstant.PROJECT + '/UpdateProjectInfo', payload);
  }
}
