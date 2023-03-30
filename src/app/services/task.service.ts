import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { UrlConstant } from '../share/Constants/Constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends ConfigService {
  getListTask(sprintId: number): Observable<any>{
    return this.get(UrlConstant.TASK + '/GetListTask', {sprintId});
  }

  getListTaskOfUser(sprintId: number, userId: number): Observable<any>{
    return this.get(UrlConstant.TASK + '/GetListTaskOfUser', {sprintId, userId});
  }
  // getListTask(sprintBacklogId: number): Observable<any>{
  //   return this.get(UrlConstant.TASK + '/GetListSprintBacklogBySprintId', {sprintBacklogId});
  // }//GetListTask

  // getSprintBacklogById(id: number): Observable<any>{
  //   return this.get(UrlConstant.TASK + '/GetSprintBacklogById', {id});
  // }

  addListTask(sprintBacklogId: number, payload: any): Observable<any>{
    return this.post(UrlConstant.TASK + '/AddListTaskBySprintBacklogId', payload, {sprintBacklogId});
  }

  updateTask(sprintBacklogId: number, payload: any): Observable<any>{
    return this.post(UrlConstant.TASK + '/UpdateTask', payload, {sprintBacklogId});
  }

  updateTaskInBoard(payload: any): Observable<any>{
    return this.post(UrlConstant.TASK + '/UpdateTaskInBoard', payload);
  }

  updateTaskStatus(id:number, status:number): Observable<any>{
    return this.post(UrlConstant.TASK + '/UpdateTaskStatus', null, {id, status});
  }
}
