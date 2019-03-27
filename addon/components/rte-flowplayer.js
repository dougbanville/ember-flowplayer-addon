import Component from "@ember/component";
import layout from "../templates/components/rte-flowplayer";
import { inject as service } from "@ember/service";

export default Component.extend({
  layout,
  currentTime: 0,
  ajax: service(),
  clipId: 9,

  myFlowplayer: service("rteFlowplayer"),

  didInsertElement() {
    let url = `https://feeds.rasset.ie/livelistings/playlist/?source=rte.ie&platform=webradio&channelid=9&id=9&autoStart=false&thumbnail=&playertype=flash&header=auto&mainHeader=progTitle&subHeader=broadcastDate&highlightHeader=off&radioUI=true&callback=dummy`;
    if (this.clipId > 100) {
      url = `https://feeds.rasset.ie/rteavgen/getplaylist/?format=jsonp&id=${
        this.clipId
      }&callback=t`;
    }

    this.get("ajax")
      .request(url, {
        dataType: "jsonp",
        jsonpCallback: "dummy"
      })
      .then(r => {
        if (this.clipId > 100) {
          let audioUrl =
            r.shows[0]["media:group"][0].hls_server +
            r.shows[0]["media:group"][0].hls_url;
          this.set("audioUrl", audioUrl);
        } else {
          this.set("audioUrl", r[0].fullUrl);
        }

        let api = flowplayer("#player", {
          clip: {
            splash: false,
            audioOnly: true,
            autoplay: false,
            live: false,
            sources: [
              {
                type: "application/x-mpegurl",
                src: this.audioUrl
              }
            ]
          }
        });
        this.myFlowplayer.set("player", api);

        this.set("rteFlowplayer", api);
        this.myFlowplayer.player.load();

        this.myFlowplayer.player.on("ready", (e, api) => {
          console.log(api.video);
          this.set("duration", api.video.duration);
        });

        this.myFlowplayer.player.on("resume", () => {
          this.set("playing", true);
          this.myFlowplayer.toggle(true);
        });
        this.myFlowplayer.player.on("pause", () => {
          this.set("playing", false);
          this.myFlowplayer.toggle(false);
        });
        this.myFlowplayer.player.on("error", (e, api, arg) => {
          console.log(arg);
        });

        this.myFlowplayer.player.on("progress", (e, api) => {
          console.log(api.video.time);
          this.set("currentTime", api.video.time);
        });
      });
  },

  actions: {
    play() {
      this.myFlowplayer.player.toggle();
    },
    pause() {
      this.myFlowplayer.player.pause();
    }
  }
});
