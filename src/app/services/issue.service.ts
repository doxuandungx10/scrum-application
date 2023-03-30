import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { UrlConstant } from '../share/Constants/Constant';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IssueService extends ConfigService {
  addListIssueByBacklogId(backlogId: any, payload: any): Observable<any>{
    return this.post(UrlConstant.ISSUE + '/AddListIssueByBacklogId', payload, {backlogId});
  }
 
}
