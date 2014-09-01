TwitterClone.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    // Maybe listen to the model's tweets for updates...
  },

  render: function() {
    var content = this.template({
      user: this.model
    });

    this.$el.html(content);
    return this;
  }
});


