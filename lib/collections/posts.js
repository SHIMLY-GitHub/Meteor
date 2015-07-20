Posts = new Mongo.Collection('posts');
Posts.allow({
update:function(userId,post){return ownsDocument(userId,post);},
remove: function(userId, post) { return ownsDocument(userId, post); }
});

Posts.deny({
  update:function(userId,post,filedNames)
  {
     return (_.without(fieldNames,'url','title').length>0);
  }

});

validatePost = function(post)
{
  var errors = {};
  if(!post.title)
  errors.title = "请填写标题";
  if(!post.url)
  errors.url = "填写 URL";
  
  return errors;
}

Posts.deny({
  update: function(userId,post,filedNames,modifier){
     var errors = validatePost(modifier.$set);
     
     return errors.title || errors.url;
  
  }
 
});


Meteor.methods({

	upvote:function(postId){
		check(this.userId, String);
		check(postId, String);

		var post = Posts.findOne(postId);
		if(!post)
		throw  new Meteor.Error('invalid','post not find');
		if(_.include(post.upvoters,this.userId))
		throw  new Meteor.Error('invalid','alread upvoted this post');
		Posts.update(post._id,{
			$addToSet:{upvoters:this.userId},
			$inc:{votes:1}
		});
	},

	postInsert:function(postAttributes){
	  check(Meteor.userId(),String);
	  check(postAttributes,{
	       title:    String,
	       url  :    String
	  });
	  var errors = validatePost(postAttributes);
	  if(errors.title || errors.url)
        throw new Meteor.Error('invalid-post','你必须为你的帖子添加标题和URL');
   
   	  
	  var postWithSameLink = Posts.findOne({url:postAttributes.url});
	  if(postWithSameLink){
	  
	  return {
	   postExists:true,
	   _id:postWithSameLink._id
	  }
	  }
	var user = Meteor.user();
	var post = _.extend(postAttributes,{
	
	     userId: user._id,
	     author: user.username,
	     submitted: new Date(),
	     commentsCount:0,
		 upvoters:[],
		 votes:0
	});
	
	var postId = Posts.insert(post);
	
	return {
	  _id : postId
	};
	
	}
});

