TwitterClone.Views.UserEdit = Backbone.View.extend({
  template: JST['users/edit'],
  tagName: 'main',
  className: 'edit-user clear-fix',

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'submit form': 'submit',
    'change #edit-avatar': 'fileSelect'
  },

  render: function() {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();

    var that = this;
    var userData = $(event.target).serializeJSON().user;

    this.model.save(userData, {
      success: function() {
        delete that.model.attributes['avatar'];
      }
    });
  },

  fileSelect: function(event) {
    var that = this;
    var imageFile = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      that.model.set('avatar', this.result);
    };

    if (imageFile) reader.readAsDataURL(imageFile);
  }
});







