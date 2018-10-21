import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGogMySuffix } from 'app/shared/model/gog-my-suffix.model';
import { Principal } from 'app/core';
import { GogMySuffixService } from './gog-my-suffix.service';

@Component({
    selector: 'jhi-gog-my-suffix',
    templateUrl: './gog-my-suffix.component.html'
})
export class GogMySuffixComponent implements OnInit, OnDestroy {
    gogs: IGogMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gogService: GogMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.gogService.query().subscribe(
            (res: HttpResponse<IGogMySuffix[]>) => {
                this.gogs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGogs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGogMySuffix) {
        return item.id;
    }

    registerChangeInGogs() {
        this.eventSubscriber = this.eventManager.subscribe('gogListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
