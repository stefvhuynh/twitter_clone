TwitterClone.Collections.Users = Backbone.Collection.extend({
  model: TwitterClone.Models.User,
  
  getOrFetch: function(id) {
    var user = this.get(id);
    
    if (!user) {
      user = new this.model({ id: id });
      user.fetch({
        success: function(model, response) {
          this.add(model);
        }.bind(this)
      });
    } else {
      user.fetch();
    }
    
    return user;
  }
});