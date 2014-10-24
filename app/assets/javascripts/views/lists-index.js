TrelloClone.Views.Lists = Backbone.View.extend({
  template: JST["lists/index"],

  initialize: function (options) {
    this.model = options.model;
    this.lists = this.model.lists();
  },

  render: function () {
    var context = this.template({lists: this.collection});
    this.$el.html(context);
    return this;
  }
})