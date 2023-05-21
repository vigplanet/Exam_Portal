import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { TimerComponent } from './components/timer/timer.component';
import { FormsModule } from '@angular/forms';
import { MyLoaderComponent } from './components/my-loader/my-loader.component';
import { LoaderService } from './service/loader.service';
import { LoaderInterceptor } from './service/loader-interceptor.service';
import { NgInitDirective } from './directive/ng-init';
import { IndexComponent } from './view/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimerComponent,
    MyLoaderComponent,
    NgInitDirective,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule 
  ],
  exports:[TimerComponent,NgInitDirective],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
