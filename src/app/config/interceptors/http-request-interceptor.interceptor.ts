import{
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs';

export class HttpRequestIntercept implements HttpInterceptor{


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Cualquier petición que se haga en la aplicación pasará por aquí tanto en la entrada como en la salida

    //tres intentos de petición
    const retryNumber = 3;
    return next.handle(request)
        .pipe(
          retry(retryNumber),
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if(error.status){ //Para los errores en el servidor
              errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
            }else{//Errores en local
              errorMessage = `Error: ${error.message}`;
            }
            console.log(errorMessage);
            return throwError(() => error);
          })
        )
  }

}
