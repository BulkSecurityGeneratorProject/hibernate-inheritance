import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatMySuffix } from 'app/shared/model/cat-my-suffix.model';
import { CatMySuffixService } from './cat-my-suffix.service';
import { CatMySuffixComponent } from './cat-my-suffix.component';
import { CatMySuffixDetailComponent } from './cat-my-suffix-detail.component';
import { CatMySuffixUpdateComponent } from './cat-my-suffix-update.component';
import { CatMySuffixDeletePopupComponent } from './cat-my-suffix-delete-dialog.component';
import { ICatMySuffix } from 'app/shared/model/cat-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class CatMySuffixResolve implements Resolve<ICatMySuffix> {
    constructor(private service: CatMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((cat: HttpResponse<CatMySuffix>) => cat.body));
        }
        return of(new CatMySuffix());
    }
}

export const catRoute: Routes = [
    {
        path: 'cat-my-suffix',
        component: CatMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cats'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cat-my-suffix/:id/view',
        component: CatMySuffixDetailComponent,
        resolve: {
            cat: CatMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cats'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cat-my-suffix/new',
        component: CatMySuffixUpdateComponent,
        resolve: {
            cat: CatMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cats'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cat-my-suffix/:id/edit',
        component: CatMySuffixUpdateComponent,
        resolve: {
            cat: CatMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cats'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const catPopupRoute: Routes = [
    {
        path: 'cat-my-suffix/:id/delete',
        component: CatMySuffixDeletePopupComponent,
        resolve: {
            cat: CatMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cats'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
