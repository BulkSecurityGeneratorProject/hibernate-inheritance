import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICatMySuffix } from 'app/shared/model/cat-my-suffix.model';

type EntityResponseType = HttpResponse<ICatMySuffix>;
type EntityArrayResponseType = HttpResponse<ICatMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CatMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/cats';

    constructor(private http: HttpClient) {}

    create(cat: ICatMySuffix): Observable<EntityResponseType> {
        return this.http.post<ICatMySuffix>(this.resourceUrl, cat, { observe: 'response' });
    }

    update(cat: ICatMySuffix): Observable<EntityResponseType> {
        return this.http.put<ICatMySuffix>(this.resourceUrl, cat, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICatMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICatMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
