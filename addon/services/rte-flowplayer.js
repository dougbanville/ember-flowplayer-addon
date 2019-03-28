import Service from "@ember/service";

export default Service.extend({
  player: null,

  isPlaying: false,

  sliding: false,

  toggle(playing) {
    this.set("isPlaying", playing);
  },
  setSliderState(sliding) {
    this.set("sliding", sliding);
  }
});
