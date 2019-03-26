import Service from "@ember/service";

export default Service.extend({
  player: null,

  isPlaying: false,

  currentTime() {
    this.player.on("progress", (e, api) => {
      console.log("FUCK ME");
    });
  },

  toggle(playing) {
    this.set("isPlaying", playing);
  }
});
