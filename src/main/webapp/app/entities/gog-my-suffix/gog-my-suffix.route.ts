import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GogMySuffix } from 'app/shared/model/gog-my-suffix.model';
import { GogMySuffixService } from './gog-my-suffix.service';
import { GogMySuffixComponent } from './gog-my-suffix.component';
import { GogMySuffixDetailComponent } from './gog-my-suffix-detail.component';
import { GogMySuffixUpdateComponent } from './gog-my-suffix-update.component';
import { GogMySuffixDeletePopupComponent } from './gog-my-suffix-delete-dialog.component';
import { IGogMySuffix } from 'app/shared/model/gog-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class GogMySuffixResolve implements Resolve<IGogMySuffix> {
    constructor(private service: GogMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((gog: HttpResponse<GogMySuffix>) => gog.body));
        }
        return of(new GogMySuffix());
    }
}

export const gogRoute: Routes = [
    {
        path: 'gog-my-suffix',
        component: GogMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gogs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gog-my-suffix/:id/view',
        component: GogMySuffixDetailComponent,
        resolve: {
            gog: GogMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gogs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gog-my-suffix/new',
        component: GogMySuffixUpdateComponent,
        resolve: {
            gog: GogMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gogs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'gog-my-suffix/:id/edit',
        component: GogMySuffixUpdateComponent,
        resolve: {
            gog: GogMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gogs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gogPopupRoute: Routes = [
    {
        path: 'gog-my-suffix/:id/delete',
        component: GogMySuffixDeletePopupComponent,
        resolve: {
            gog: GogMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Gogs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
