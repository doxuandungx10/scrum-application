import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { User } from '../share/class/user.class';
import { UrlConstant } from '../share/Constants/Constant';

@Injectable({
  providedIn: 'root',
})
export class BurndownChartService extends ConfigService {
  getRemainDataBySprintId(sprintId: number): Observable<any> {
    return this.get(UrlConstant.CHART + '/GetRemainDataBySprintId', { sprintId });
  }
}
