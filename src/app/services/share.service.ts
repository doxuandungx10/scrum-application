import { Injectable } from '@angular/core';
import { UrlConstant } from '../share/Constants/Constant';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService extends ConfigService {
  convertStatusText(status: number): string{
    switch(status){
      case 0:
        return "To Do";
      case 1: 
        return "Doing";
      case 2: 
        return "Done";
      default: 
        return "";
    } 
  }
  convertPosition(pos: number): string{
    switch(pos){
      case 1:
        return "Dev";
      case 2: 
        return "Tester";
      case 3: 
        return "BA";
      case 4: 
        return "Designer";
      default: 
        return "";
    } 
  }
}
