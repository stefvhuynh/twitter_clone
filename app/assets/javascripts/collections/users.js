TwitterClone.Collections.Users = Backbone.Collection.extend({
  url: '/api/users',
  model: TwitterClone.Models.User,

  getOrFetch: function(id, callback) {
    var user = this.get(id);

    if (!user) {
      user = new this.model({ id: id });
      user.fetch({
        success: function(model, response) {
          this.add(model);
          if (callback) callback(model);
        }.bind(this)
      });
    } else {
      user.fetch({
        success: function(model, response) {
          if (callback) callback(model);
        }
      });
      // if (callback) callback(user);
    }

    return user;
  }
});