TwitterClone.Views.UserEdit = Backbone.View.extend({
  template: JST['users/edit'],

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'submit form': 'submit'
  },

  render: function() {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var userData = $(event.target).serializeJSON().user;
    TwitterClone.users.get(this.model.id).save(userData);
    // NOT UPDATING HOME PAGE & GETTING SERVER ERROR
  }
});