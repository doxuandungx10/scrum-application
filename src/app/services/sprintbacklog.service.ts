import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstant } from '../share/Constants/Constant';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SprintbacklogService extends ConfigService {
  getListSprintBacklog(sprintId: number): Observable<any>{
    return this.get(UrlConstant.SPRINT_BACKLOG + '/GetListSprintBacklogOrderTask', {sprintId});
  }

  getSprintBacklogById(id: number): Observable<any>{
    return this.get(UrlConstant.SPRINT_BACKLOG + '/GetSprintBacklogById', {id});
  }
  
  addSprint(payload: any): Observable<any>{
    return this.post(UrlConstant.SPRINT_BACKLOG + '/AddSprint', payload);
  }

  updateSprintBacklog(payload: any): Observable<any>{
    return this.put(UrlConstant.SPRINT_BACKLOG + '/UpdateSprintBacklog', payload);
  }
}
