import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { UrlConstant } from '../share/Constants/Constant';

@Injectable({
  providedIn: 'root'
})
export class SprintService extends ConfigService {
  getListSprint(projectId: number): Observable<any>{
    return this.get(UrlConstant.SPRINT + '/GetListSprintByProjectId', {projectId});
  }

  getSprintById(): Observable<any>{
    return this.get(UrlConstant.SPRINT + '/GetSprintById');
  }
  
  addSprint(payload: any): Observable<any>{
    return this.post(UrlConstant.SPRINT + '/AddSprint', payload);
  }

  updateSprint(payload: any): Observable<any>{
    return this.put(UrlConstant.SPRINT + '/UpdateSprint', payload);
  }

  getListTimeOff(sprintId: number): Observable<any>{
    return this.get(UrlConstant.SPRINT + '/GetListTimeOff', {sprintId});
  }

  updateTimeOff(payload: any): Observable<any>{
    return this.post(UrlConstant.SPRINT + '/UpdateTimeOff', payload);
  }

  addSprintTarget(payload: any): Observable<any>{
    return this.put(UrlConstant.SPRINT_BACKLOG + '/AddSprintTarget', payload);
  }//RemoveSprintTarget

  removeSprintTarget(payload: any): Observable<any>{
    return this.put(UrlConstant.SPRINT_BACKLOG + '/RemoveSprintTarget', payload);
  }

  getListSprintTarget(sprintId: any): Observable<any>{
    return this.get(UrlConstant.SPRINT_BACKLOG + '/GetListSprintTarget', {sprintId});
  }
  //api/SprintBacklog/GetListSprintTarget
  //api/SprintBacklog/GetListSprintTarget
}
