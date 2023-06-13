import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { UrlConstant } from '../share/Constants/Constant';
import { Observable } from 'rxjs';
import { Backlog } from '../share/class/backlog.class';


@Injectable({
  providedIn: 'root',
})
export class BacklogService extends ConfigService {
  getListBacklogByProjectId(projectId: number): Observable<any> {
    return this.get(UrlConstant.BACKLOG + '/GetListBacklog', { projectId });
  }
  addBacklog(payload: any): Observable<any> {
    return this.post(UrlConstant.BACKLOG + '/AddBacklog', payload);
  }
  updateBacklog(payload: any): Observable<any> {
    return this.put(UrlConstant.BACKLOG + '/UpdateBacklog', payload);
  }
  convertBacklog(sprintId: number, payload: any): Observable<any> {
    return this.post(UrlConstant.SPRINT_BACKLOG + '/ConvertBacklog', payload, {
      sprintId,
    });
  }
  deleteBacklog(id: any): Observable<any> {
    return this.delete(UrlConstant.BACKLOG + '/DeleteBacklog/' + id, null);
  }
}

