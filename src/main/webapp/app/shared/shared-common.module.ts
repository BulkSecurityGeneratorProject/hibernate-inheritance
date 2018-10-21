import { NgModule } from '@angular/core';

import { InheritanceSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [InheritanceSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [InheritanceSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class InheritanceSharedCommonModule {}
