/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { InheritanceTestModule } from '../../../test.module';
import { CatMySuffixDeleteDialogComponent } from 'app/entities/cat-my-suffix/cat-my-suffix-delete-dialog.component';
import { CatMySuffixService } from 'app/entities/cat-my-suffix/cat-my-suffix.service';

describe('Component Tests', () => {
    describe('CatMySuffix Management Delete Component', () => {
        let comp: CatMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CatMySuffixDeleteDialogComponent>;
        let service: CatMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InheritanceTestModule],
                declarations: [CatMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(CatMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CatMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CatMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
