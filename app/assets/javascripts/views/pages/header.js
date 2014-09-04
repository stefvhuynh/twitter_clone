TwitterClone.Views.Header = Backbone.View.extend({
  template: JST['pages/header'],

  events: {
    'submit #search-form': 'submit'
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
  }
});