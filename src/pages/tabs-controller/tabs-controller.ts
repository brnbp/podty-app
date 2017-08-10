import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PodcastsPage } from '../podcasts/podcasts';
import { FriendsPage } from '../friends/friends';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {

  tab1Root: any = HomePage;
  tab2Root: any = PodcastsPage;
  tab3Root: any = FriendsPage;
  constructor(public navCtrl: NavController) {
  }
  
}
