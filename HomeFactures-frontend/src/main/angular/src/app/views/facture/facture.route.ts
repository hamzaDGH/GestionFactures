import { FactureComponent } from './facture.component';
import { FactureUpdateComponent } from './facture-update.component'; 
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { IFacture, Facture } from '../../shared/model/facture.model';
import { FactureService } from './facture.service';
import { FactureDetailComponent } from './facture-detail.component'; 

@Injectable({ providedIn: 'root' })
export class FactureResolve implements Resolve<IFacture> {
  constructor(private service: FactureService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IFacture> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((facture: HttpResponse<Facture>) => {
          if (facture.body) {
            return of(facture.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Facture());
  }
}

export const factureRoute: Routes = [
  {
    path: '',
    component: FactureComponent,
    data: {
      title: 'Liste des factures'
    }

  },
  {
    path: 'new',
    component: FactureUpdateComponent,
    resolve: {
      facture: FactureResolve
    },
    data: {
      title: 'Nouveau facture'
    }
  },
  {
    path: ':id/edit',
    component: FactureUpdateComponent,
    resolve: {
      facture: FactureResolve
    },
    data: {
      title: 'Edition d\'un facture'
    }
  }
  ,
  {
    path: ':id/view',
    component: FactureDetailComponent,
    resolve: {
      facture: FactureResolve
    },
    data: {
      title: 'Consulter facture'
    }
  },


];