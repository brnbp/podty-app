import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PodcastsPage } from '../pages/podcasts/podcasts';
import { FriendsPage } from '../pages/friends/friends';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';

import { HttpModule } from '@angular/http';
import { NativeAudio } from '@ionic-native/native-audio';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PodcastsPage,
    FriendsPage,
    TabsControllerPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PodcastsPage,
    FriendsPage,
    TabsControllerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeAudio
  ]
})
export class AppModule {}