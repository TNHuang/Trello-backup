TrelloClone.Views.BoardShow = Backbone.View.extend({
  template: JST["boards/show"],

  initialize: function (options) {
    $('body').toggleClass("inside");
    this.listenTo(this.model, "sync remove change", this.render);
  },

  render: function () {
    var content = this.template({board: this.model});
    this.$el.html(content);
    // var listsView = new TrelloClone.Views.Lists({model: this});
    // this.$el.append(listsView)
    return this;
  },

  events: {
    "click .back-to-index": "goToIndex",
    "submit .card-form": "submitCard",
    "submit .list-form": "submitList",
    "click div.new-card": "toggleCreateCard",
    "click div.new-list": "toggleCreateList"
  },

  goToIndex: function (event) {
    Backbone.history.navigate("/", {trigger: true});
  },

  toggleCreateCard: function (event) {

    $(event.currentTarget).toggleClass("not-active");
    $(event.currentTarget).next().toggleClass("not-active");
  },
  submitCard: function (event) {
    event.preventDefault();
    var parentForm = $(event.currentTarget).parent();
    var newCard = parentForm.prev();

    parentForm.toggleClass("not-active");
    newCard.toggleClass("not-active");

    // var formData = $(event.currentTarget).serializeJSON();
    // var card = new TrelloClone.Models.Card(formData["card"]);
      //   card.save({}, {
      //     success: function () {
      //       this.collection.add(board);
      //       Backbone.history.navigate("#/boards/"+board.id, {trigger: true});
      //     }.bind(this),
      //     error: function () {
      //       $(".wrapper").remove();
      //       $(".new-board").append("Create new board...");
      //     },
      //     // wait: true
      //   })
  },

  toggleCreateList: function (event) {
    $(event.currentTarget).toggleClass("not-active");
    $(event.currentTarget).next().children().toggleClass("not-active");

  },

  submitList: function (event) {
    event.preventDefault();
    var form = $(event.target);
    var newCard = form.parent().prev();
    form.toggleClass("not-active");
    newCard.toggleClass("not-active");

    var formData = $(event.currentTarget).serializeJSON();
    var list = new TrelloClone.Models.List(formData["list"]);

    list.save({}, {
      success: function () {
        this.model.lists.add(list)
      }.bind(this)
    })
  }


  // createBoard: function (event) {
  //   event.preventDefault();
  //   var formData = $(event.currentTarget).serializeJSON();
  //
  //   var board = new TrelloClone.Models.Board(formData["board"]);
  //   board.save({}, {
  //     success: function () {
  //       this.collection.add(board);
  //       Backbone.history.navigate("#/boards/"+board.id, {trigger: true});
  //     }.bind(this),
  //     error: function () {
  //       $(".wrapper").remove();
  //       $(".new-board").append("Create new board...");
  //     },
  //     // wait: true
  //   })
  // }


})