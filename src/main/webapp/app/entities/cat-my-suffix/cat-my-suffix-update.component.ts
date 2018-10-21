import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICatMySuffix } from 'app/shared/model/cat-my-suffix.model';
import { CatMySuffixService } from './cat-my-suffix.service';

@Component({
    selector: 'jhi-cat-my-suffix-update',
    templateUrl: './cat-my-suffix-update.component.html'
})
export class CatMySuffixUpdateComponent implements OnInit {
    cat: ICatMySuffix;
    isSaving: boolean;

    constructor(private catService: CatMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cat }) => {
            this.cat = cat;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cat.id !== undefined) {
            this.subscribeToSaveResponse(this.catService.update(this.cat));
        } else {
            this.subscribeToSaveResponse(this.catService.create(this.cat));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICatMySuffix>>) {
        result.subscribe((res: HttpResponse<ICatMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
