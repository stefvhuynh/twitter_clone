TwitterClone.Views.Header = Backbone.View.extend({
  template: JST['pages/header'],

  events: {
    'submit #search-form': 'submit',
    'click #sign-out-button': 'signOut'
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var searchData = $(event.target).serializeJSON().query;
    Backbone.history.navigate('search?query=' + escape(searchData), {
      trigger: true
    });
  },
  
  signOut: function(event) {
    event.preventDefault();
    $.ajax({
      type: 'DELETE',
      url: '/session',
      success: function() {
        Backbone.history.navigate('');
        window.location.reload();
      }
    });
  }
});


