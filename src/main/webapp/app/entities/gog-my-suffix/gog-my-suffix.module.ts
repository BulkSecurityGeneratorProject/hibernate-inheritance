import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InheritanceSharedModule } from 'app/shared';
import {
    GogMySuffixComponent,
    GogMySuffixDetailComponent,
    GogMySuffixUpdateComponent,
    GogMySuffixDeletePopupComponent,
    GogMySuffixDeleteDialogComponent,
    gogRoute,
    gogPopupRoute
} from './';

const ENTITY_STATES = [...gogRoute, ...gogPopupRoute];

@NgModule({
    imports: [InheritanceSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GogMySuffixComponent,
        GogMySuffixDetailComponent,
        GogMySuffixUpdateComponent,
        GogMySuffixDeleteDialogComponent,
        GogMySuffixDeletePopupComponent
    ],
    entryComponents: [GogMySuffixComponent, GogMySuffixUpdateComponent, GogMySuffixDeleteDialogComponent, GogMySuffixDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InheritanceGogMySuffixModule {}
