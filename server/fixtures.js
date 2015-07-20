if (Posts.find().count() === 0) {
  var now = new Date().getTime();
  
  var tomId = Meteor.users.insert({
     profile: {name:'陈凯歌'}
  });
  
  var tom = Meteor.users.findOne(tomId);
  var sachaId = Meteor.users.insert({
       profile:{name:'大鹏'}
  });
  
  var sacha = Meteor.users.findOne(sachaId);
  var telescopeId = Posts.insert({
      title:"霸王别姬",
      userId:sacha._id,
      author:sacha.profile.name,
      url:'http://baike.baidu.com/link?url=ETRxnE_gwAxXShSzr9QvzjOPwb0DlU2SooL2St2bLm10Y-7joVbG0wKw7kpxDYtnOB8mrkrXYXp98T9v51oycfSN0SAR1R5ZmSCFuxWTrZ3',
      submitted:new Date(now - 7*3600*1000),
      commentsCount:2,
      upvoters:[],
      votes:0
  
  });
  
  Comments.insert({
    postId:telescopeId,
    userId:tom._id,
    author:tom.profile.name,
    submitted: new Date(now -5 * 3600*1000),
    body:"如果陈凯歌拍这部电影就死了 那么他就不朽了"
  });
  Comments.insert({
     postId:telescopeId,
     userId:sacha._id,
     author:sacha.profile.name,
     submitted: new Date(now -3 *3600*1000),
     body:"霸王别姬 千古绝唱"
  });
 

  Posts.insert({
    title: '道士下山',
    userId:tom._id,
    author:tom.profile.name,
    url: 'http://sachagreif.com/introducing-telescope/',
    submitted: new Date(now-10 *3600*1000),
    commentsCount:0,
      upvoters:[],
      votes:0
   
  });
  for(var i=0;i<10;i++){
   Posts.insert({
     title:'道士下山' + i,
     author:sacha.profile.name,
     userId:sacha._id,
     url:"http://www.baidu.com",
     submitted:new Date(now-i*3600*1000),
     commentsCount:0,
       upvoters:[],
       votes:0
   
   });
  }

  Posts.insert({
    title: '栀子花开',
    userId:tom._id,
    author:tom.profile.name,
    url: 'http://baidu.com',
    submitted:new Date(now-12*3600*1000),
     commentsCount:0,
      upvoters:[],
      votes:0
  });
}