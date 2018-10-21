/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { InheritanceTestModule } from '../../../test.module';
import { AnimalMySuffixUpdateComponent } from 'app/entities/animal-my-suffix/animal-my-suffix-update.component';
import { AnimalMySuffixService } from 'app/entities/animal-my-suffix/animal-my-suffix.service';
import { AnimalMySuffix } from 'app/shared/model/animal-my-suffix.model';

describe('Component Tests', () => {
    describe('AnimalMySuffix Management Update Component', () => {
        let comp: AnimalMySuffixUpdateComponent;
        let fixture: ComponentFixture<AnimalMySuffixUpdateComponent>;
        let service: AnimalMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InheritanceTestModule],
                declarations: [AnimalMySuffixUpdateComponent]
            })
                .overrideTemplate(AnimalMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AnimalMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnimalMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AnimalMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.animal = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AnimalMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.animal = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
