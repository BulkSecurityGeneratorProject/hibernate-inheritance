/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { InheritanceTestModule } from '../../../test.module';
import { AnimalMySuffixDeleteDialogComponent } from 'app/entities/animal-my-suffix/animal-my-suffix-delete-dialog.component';
import { AnimalMySuffixService } from 'app/entities/animal-my-suffix/animal-my-suffix.service';

describe('Component Tests', () => {
    describe('AnimalMySuffix Management Delete Component', () => {
        let comp: AnimalMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<AnimalMySuffixDeleteDialogComponent>;
        let service: AnimalMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InheritanceTestModule],
                declarations: [AnimalMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(AnimalMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AnimalMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnimalMySuffixService);
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
