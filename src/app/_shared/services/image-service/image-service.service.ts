import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  protected apiDomain = `${this.config.getDomain()}/Upload`;
  constructor(private config: ConfigService, private httpClient: HttpClient) {}

  uploadImage(data: FormData) {
    return this.httpClient.post(`${this.apiDomain}`, data, {reportProgress: true, observe: 'events'});
  }
}
