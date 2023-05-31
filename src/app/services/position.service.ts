import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { User } from '../share/class/user.class';
import { UrlConstant } from '../share/Constants/Constant';

@Injectable({
  providedIn: 'root',
})
export class PositionService extends ConfigService {
  getListPosition(): Observable<any> {
    return this.get(UrlConstant.POSITION + '/GetListPosition', '');
  }
}
