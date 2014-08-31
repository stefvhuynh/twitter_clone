TwitterClone.Collections.Users = Backbone.Collection.extend({
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
      if (callback) callback(user);
      user.fetch();
    }
    
    return user;
  }
});