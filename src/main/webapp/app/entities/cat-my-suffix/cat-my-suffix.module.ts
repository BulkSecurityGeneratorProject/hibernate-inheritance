import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InheritanceSharedModule } from 'app/shared';
import {
    CatMySuffixComponent,
    CatMySuffixDetailComponent,
    CatMySuffixUpdateComponent,
    CatMySuffixDeletePopupComponent,
    CatMySuffixDeleteDialogComponent,
    catRoute,
    catPopupRoute
} from './';

const ENTITY_STATES = [...catRoute, ...catPopupRoute];

@NgModule({
    imports: [InheritanceSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CatMySuffixComponent,
        CatMySuffixDetailComponent,
        CatMySuffixUpdateComponent,
        CatMySuffixDeleteDialogComponent,
        CatMySuffixDeletePopupComponent
    ],
    entryComponents: [CatMySuffixComponent, CatMySuffixUpdateComponent, CatMySuffixDeleteDialogComponent, CatMySuffixDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InheritanceCatMySuffixModule {}
