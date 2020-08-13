import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFacture } from '../../shared/model/facture.model';

@Component({
  selector: 'app-facture-detail',
  templateUrl: './facture-detail.component.html',
  styleUrls:['./facture-detail.component.scss']
})
export class FactureDetailComponent implements OnInit {
  facture: IFacture | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facture }) => (this.facture = facture));
  }

  previousState(): void {
    window.history.back();
  }
}
