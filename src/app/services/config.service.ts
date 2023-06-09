import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Config } from 'src/app/share/class/config.class'

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  configUrl = 'assets/config/development.json';
  config: Config = { api: 'http://localhost:9316' }; // fix cứng tạm thời

  token = localStorage.getItem('jwt');

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.token == null ? '' : 'Bearer ' + this.token,
  });

  constructor(private http: HttpClient) {}

  private getConfig() {
    return this.http.get<Config>(this.configUrl);
  }

  private showConfig() {
    this.getConfig().subscribe(
      (data: Config) =>
        (this.config = {
          api: data.api,
        })
    );
  }

  post(url: string, payload: any, param?: any) {
    return this.http.post(this.config.api + url, payload, {
      params: param,
      headers: this.headers,
    });
  }
  postFile(url: string, payload: any, param?: any) {
    return this.http.post(this.config.api + url, payload, {
      params: param,
    });
  }
  get(url: string, params?: any) {
    return this.http.get(this.config.api + url, {
      params: params,
      headers: this.headers,
    });
  }

  put(url: string, payload: any, param?: any) {
    return this.http.put(this.config.api + url, payload, {
      params: param,
      headers: this.headers,
    });
  }

  delete(url: string, payload: any, param?: any) {
    return this.http.delete(this.config.api + url, {
      params: param,
      headers: this.headers,
    });
  }
}
