import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGogMySuffix } from 'app/shared/model/gog-my-suffix.model';
import { GogMySuffixService } from './gog-my-suffix.service';

@Component({
    selector: 'jhi-gog-my-suffix-delete-dialog',
    templateUrl: './gog-my-suffix-delete-dialog.component.html'
})
export class GogMySuffixDeleteDialogComponent {
    gog: IGogMySuffix;

    constructor(private gogService: GogMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gogService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gogListModification',
                content: 'Deleted an gog'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gog-my-suffix-delete-popup',
    template: ''
})
export class GogMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ gog }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GogMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.gog = gog;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
