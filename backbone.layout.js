(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["underscore","backbone"], function(_, Backbone) {
      // Use global variables if the locals are undefined.
      return factory(_ || root._, Backbone || root.Backbone);
    });
  }
  else if (typeof exports === 'object') {
    // Commonjs module
    module.exports = factory(require("underscore"), require("backbone"));
  } 
  else {
    // RequireJS isn't being used. Assume underscore and backbone are loaded in <script> tags
    factory(_, Backbone);
  }
}(this, function(_, Backbone) {

  var Layout = Backbone.View.extend({

    initialize: function (options) {
      this.options = options || {};
    },

    closeView: function (view) {
      if (view && view.close) {
        view.close();
      }
    },

    openView: function (view) {
      this.el.appendChild(view.render().el);
      if (view.onShow) {
        view.onShow();
      }
    },

    show: function (view) {
      this.closeView(this.currentView);
      this.currentView = view;
      this.openView(this.currentView);
    },

    empty: function () {
      this.closeView(this.currentView);
    }

  });

  return Layout;
}));