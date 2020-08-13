import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';
import { IJustificatif } from '../../shared/model/justificatif.model';
import { createRequestOption, Search } from '../../shared/util/request-util';

type EntityResponseType = HttpResponse<IJustificatif>;
type EntityArrayResponseType = HttpResponse<IJustificatif[]>;

@Injectable({ providedIn: 'root' })
export class JustificatifService {
  public resourceUrl = SERVER_API_URL + 'api/justificatifs';

  constructor(protected http: HttpClient) { }

create(justificatif: FormData): Observable<EntityResponseType>{
  return this.http.post<IJustificatif>(this.resourceUrl,justificatif,{observe : 'response'})
}

  find(imageName: string): Observable<EntityResponseType> {
    return this.http
      .get<IJustificatif>(`${this.resourceUrl}/${imageName}`, { observe: 'response' });
  }

  update(justificatif: IJustificatif): Observable<EntityResponseType> {
    return this.http
      .put<IJustificatif>(this.resourceUrl, justificatif, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IJustificatif[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IJustificatif[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

}
