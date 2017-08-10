import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http, Headers} from '@angular/http';

import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  player = {
    key: '' // Holds a last active track
  }
  episodes: Array<{title: string}>
  podcast: Array<{name: string, image: string, episodes: Array<{title: string}>}>;

  constructor(http: Http, public navCtrl: NavController, protected nativeAudio: NativeAudio) {
    const headerDict = {
      'Authorization': 'Basic',
    }
    const options = {
      headers: new Headers(headerDict),
      withCredentials: true,
    }
    http.get('https://api.podty.co/v1/feeds/15/episodes?limit=70', options)
        .forEach(a => {
          this.podcast = a.json().data
          let episodes = []
          this.podcast['episodes'].forEach(function(episode){
            episodes.push({
              id: episode.id,
              title: episode.title,
              image: episode.image,
              duration: episode.duration,
              published_date: episode.published_at,
              media: episode.media_url,
              summary: episode.summary,
            })
          })
          this.episodes = episodes
        })


  }

  playTrack = function(track, key) {
        // Preload an audio track before we play it
    this.nativeAudio.preloadComplex(key, track, 1, 1, 0);

    console.log(key)
    if (this.player.key.length > 0) {
      console.log('already playing')
      this.nativeAudio.stop(this.player.key); // Stop audio track
      this.nativeAudio.unload(this.player.key); // Unload audio track
    }
    console.log('now playing')
    console.log(key)
    this.nativeAudio.play(key); // Play audio track
    this.player.key = key; // Set a current audio track so we can close it if needed
  };

  stopTrack = function(key) {

    // If this is not a first playback stop and unload previous audio track
    //if (this.player.key.length > 0) {

      if (this.player.key != key) {
        return
      }
      this.nativeAudio.stop(key); // Stop audio track
      this.nativeAudio.unload(key); // Unload audio track
      this.player.key = ''; // Remove a current track on unload, it will break an app if we try to unload it again in playTrack function
    //}
  };

}
