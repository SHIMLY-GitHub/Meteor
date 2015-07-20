Template.foodList.helpers({
  food: function() {
    return Posts.find();
  }
});