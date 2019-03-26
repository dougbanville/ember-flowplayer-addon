"use strict";

module.exports = {
  name: require("./package").name,

  included(app) {
    this._super.included.apply(this, arguments);
    app.import("vendor/flowplayer.min.js", {
      type: "vendor",
      exports: { flowplayer: ["default"] }
    });
    app.import("vendor/flowplayer.audio.min.js");
    app.import("vendor/flowplayer.hlsjs.light.min.js");
  }
};
