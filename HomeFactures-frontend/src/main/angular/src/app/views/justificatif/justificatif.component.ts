import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventManager } from '../../shared/services/event-manager/EventManager.service';
import { IJustificatif } from '../../shared/model/justificatif.model';
import { JustificatifService } from './justificatif.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { OrderPipe } from 'ngx-order-pipe';
import { JustificatifDeleteDialogComponent } from './justificatif-delete-dialog.component';

@Component({
  selector: 'app-justificatif',
  templateUrl: './justificatif.component.html',
  styleUrls: ['./justificatif.component.scss']
})
export class JustificatifComponent implements OnInit, OnDestroy {
  public order: string = "justificatif.nomJustificatif"
  public sortedJustificatif: any;
  public reverse: boolean = false;
  justificatifs?: IJustificatif[];
  eventSubscriber?: Subscription;
  currentSearch: string;
  pageNumber: number = 1;

  constructor(
    protected justificatifService: JustificatifService,
    protected modalService: NgbModal,
    protected eventManager:EventManager,
    protected activatedRoute: ActivatedRoute,
    protected orderpipe: OrderPipe

  ) {
    this.sortedJustificatif = this.orderpipe.transform(this.justificatifs, 'justificatif.nomJustificatif');
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.justificatifService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IJustificatif[]>) => {
          (this.justificatifs = res.body || [])
          console.log(this.justificatifs);
        });
      return;
    }

    console.log('test');
    this.justificatifService.query().subscribe((res: HttpResponse<IJustificatif[]>) => {
      (this.justificatifs = res.body || [])
      console.log(this.justificatifs);
    });

  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  registerChangeInJustificatifs(): void {
    this.eventSubscriber = this.eventManager.subscribe('justificatifListModification', () => this.loadAll());
  } 

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInJustificatifs();
  }

  trackId(index: number, item: IJustificatif): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  delete(justificatif: IJustificatif): void {
    const modalRef = this.modalService.open(JustificatifDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.justificatif = justificatif;
  }

}
