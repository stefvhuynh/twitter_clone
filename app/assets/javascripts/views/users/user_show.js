TwitterClone.Views.UserShow = Backbone.View.extend({
  tagName: 'main',

  className: 'user-main clear-fix',

  template: JST['users/show'],

  tweetsTemplate: JST['tweets/tweets'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    // Maybe listen to the model's tweets for updates...
  },

  render: function() {
    var content = this.template({ 
      user: this.model,
      tweetsTemplate: this.tweetsTemplate
    });
    
    this.$el.html(content);
    return this;
  }
});


