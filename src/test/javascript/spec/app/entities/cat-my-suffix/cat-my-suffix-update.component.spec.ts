/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { InheritanceTestModule } from '../../../test.module';
import { CatMySuffixUpdateComponent } from 'app/entities/cat-my-suffix/cat-my-suffix-update.component';
import { CatMySuffixService } from 'app/entities/cat-my-suffix/cat-my-suffix.service';
import { CatMySuffix } from 'app/shared/model/cat-my-suffix.model';

describe('Component Tests', () => {
    describe('CatMySuffix Management Update Component', () => {
        let comp: CatMySuffixUpdateComponent;
        let fixture: ComponentFixture<CatMySuffixUpdateComponent>;
        let service: CatMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InheritanceTestModule],
                declarations: [CatMySuffixUpdateComponent]
            })
                .overrideTemplate(CatMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CatMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CatMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CatMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cat = entity;
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
                    const entity = new CatMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cat = entity;
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
