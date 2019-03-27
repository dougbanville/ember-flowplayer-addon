import Component from "@ember/component";
import layout from "../templates/components/player-range";
import { inject as service } from "@ember/service";

export default Component.extend({
  layout,

  myFlowplayer: service("rteFlowplayer"),

  actions: {
    sliderEvent(event) {
      console.log(event.target.value);
      //this.set("value", event.target.value);
    },
    select() {
      //this.set("value", event.target.value);
      this.myFlowplayer.player.seek(event.target.value);
    }
  }
});
