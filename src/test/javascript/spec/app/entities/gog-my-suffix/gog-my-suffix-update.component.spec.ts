/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { InheritanceTestModule } from '../../../test.module';
import { GogMySuffixUpdateComponent } from 'app/entities/gog-my-suffix/gog-my-suffix-update.component';
import { GogMySuffixService } from 'app/entities/gog-my-suffix/gog-my-suffix.service';
import { GogMySuffix } from 'app/shared/model/gog-my-suffix.model';

describe('Component Tests', () => {
    describe('GogMySuffix Management Update Component', () => {
        let comp: GogMySuffixUpdateComponent;
        let fixture: ComponentFixture<GogMySuffixUpdateComponent>;
        let service: GogMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [InheritanceTestModule],
                declarations: [GogMySuffixUpdateComponent]
            })
                .overrideTemplate(GogMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GogMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GogMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new GogMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.gog = entity;
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
                    const entity = new GogMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.gog = entity;
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
