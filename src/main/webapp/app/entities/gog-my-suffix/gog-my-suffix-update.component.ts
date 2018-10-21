import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGogMySuffix } from 'app/shared/model/gog-my-suffix.model';
import { GogMySuffixService } from './gog-my-suffix.service';

@Component({
    selector: 'jhi-gog-my-suffix-update',
    templateUrl: './gog-my-suffix-update.component.html'
})
export class GogMySuffixUpdateComponent implements OnInit {
    gog: IGogMySuffix;
    isSaving: boolean;

    constructor(private gogService: GogMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ gog }) => {
            this.gog = gog;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.gog.id !== undefined) {
            this.subscribeToSaveResponse(this.gogService.update(this.gog));
        } else {
            this.subscribeToSaveResponse(this.gogService.create(this.gog));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGogMySuffix>>) {
        result.subscribe((res: HttpResponse<IGogMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
