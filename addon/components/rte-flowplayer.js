import Component from "@ember/component";
import layout from "../templates/components/rte-flowplayer";
import { inject as service } from "@ember/service";

export default Component.extend({
  layout,
  currentTime: 0,

  myFlowplayer: service("rteFlowplayer"),

  didInsertElement() {
    var api = flowplayer("#player", {
      clip: {
        splash: false,
        audioOnly: true,
        autoplay: true,
        live: false,
        sources: [
          {
            type: "audio/mpeg",
            src:
              "http://podcast.rasset.ie/podcasts/audio/2019/0325/20190325_rteradio1-liveline-toolsstole_c21529627_21529630_232_/20190325_rteradio1-liveline-toolsstole_c21529627_21529630_232_.mp3"
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
