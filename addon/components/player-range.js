import Component from "@ember/component";
import layout from "../templates/components/player-range";
import { inject as service } from "@ember/service";
import { debounce } from "@ember/runloop";

export default Component.extend({
  layout,

  myFlowplayer: service("rteFlowplayer"),

  actions: {
    sliderEvent(event) {
      if (!this.myFlowplayer.sliding) {
        this.myFlowplayer.setSliderState(true);
      }
      this.set("value", event.target.value);
      //debounce(this.myFlowplayer.setSliderState(true));
      //debounce(this.set("value", event.target.value));
    },
    select(event) {
      //this.set("value", event.target.value);
      this.myFlowplayer.player.seek(event.target.value);
      this.myFlowplayer.setSliderState(false);
    },
    focusOut() {
      console.log("DON");
    }
  }
});
