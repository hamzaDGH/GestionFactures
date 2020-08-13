import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';
import { IFacture } from '../../shared/model/facture.model';
import { createRequestOption, Search } from '../../shared/util/request-util';
import { map } from 'rxjs/operators';
import { DATE_FORMAT } from '../../shared/constants/input.constants';
import * as moment from 'moment';


type EntityResponseType = HttpResponse<IFacture>;
type EntityArrayResponseType = HttpResponse<IFacture[]>;

@Injectable({ providedIn: 'root' })
export class FactureService {
  public resourceUrl = SERVER_API_URL + 'api/factures';

  constructor(protected http: HttpClient) { }

  create(facture: IFacture): Observable<EntityResponseType> {

    const copy = this.convertDateFromClient(facture);

    return this.http
      .post<IFacture>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(opportunity: IFacture): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(opportunity);
    return this.http
      .put<IFacture>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFacture>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFacture[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFacture[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(facture: IFacture): IFacture {
    const copy: IFacture = Object.assign({}, facture, {
      dateDebut:
        facture.dateDebut ? moment(facture.dateDebut).format(DATE_FORMAT) : undefined,
      dateFin:
        facture.dateFin ? moment(facture.dateFin).format(DATE_FORMAT) : undefined,
      delai:
        facture.delai ? moment(facture.delai).format(DATE_FORMAT) : undefined,

    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateFin = res.body.dateFin ? moment(res.body.dateFin) : undefined;
      res.body.dateDebut = res.body.dateDebut ? moment(res.body.dateDebut) : undefined;
      res.body.delai = res.body.delai ? moment(res.body.delai) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((facture: IFacture) => {
        facture.dateDebut = facture.dateDebut ? moment(facture.dateDebut) : undefined;
        facture.dateFin = facture.dateFin ? moment(facture.dateFin) : undefined;
        facture.delai = facture.delai ? moment(facture.delai) : undefined;
      });
    }
    return res;
  }

}
