import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAnimalMySuffix } from 'app/shared/model/animal-my-suffix.model';
import { AnimalMySuffixService } from './animal-my-suffix.service';

@Component({
    selector: 'jhi-animal-my-suffix-delete-dialog',
    templateUrl: './animal-my-suffix-delete-dialog.component.html'
})
export class AnimalMySuffixDeleteDialogComponent {
    animal: IAnimalMySuffix;

    constructor(private animalService: AnimalMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.animalService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'animalListModification',
                content: 'Deleted an animal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-animal-my-suffix-delete-popup',
    template: ''
})
export class AnimalMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ animal }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AnimalMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.animal = animal;
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
