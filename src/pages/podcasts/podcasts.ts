import { Component } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-podcasts',
  templateUrl: 'podcasts.html'
})
export class PodcastsPage {
  selectedPodcast: any;
  podcasts: Array<{name: string, image: string, total_episodes: string}>;

  constructor(http: Http, public navCtrl: NavController, public navParams: NavParams) {

    this.selectedPodcast = navParams.get('podcast');

    const headerDict = {
      'Authorization': 'Basic',
    }
    const options = {
      headers: new Headers(headerDict),
      withCredentials: true,
    }
    http.get('https://api.podty.co/v1/feeds/top', options)
        .forEach(a => {
          let podcasts = [];
          a.json().data.forEach(function(a){
            podcasts.push({
              name: a.name,
              image: a.thumbnail_100,
              total_episodes: a.total_episodes,
            })
          })
          this.podcasts = podcasts
        })
  }

  podcastTapped(event, podcast) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(PodcastsPage, {
      podcast: podcast
    });
  }

}
