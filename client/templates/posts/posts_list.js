Template.postsList.helpers({
  posts: function() {
    return Posts.find({},{sort:{submitted:-1}});
  }
});
Template.postsList.onRendered(function(){
  this.find('.wrapper')._uihooks = {

    insertElement: function(node,next){

      $(node)
          .hide()
          .insertBefore(next)
          .fadeIn();

    },
    removeElement:function(node,next){
      $(node).fadeOut(function(){
        $(this).remove();

      });
    },


    moveElement:function(node,next){
      var $node = $(node), $next = $(next);
      var oldTop = $node.offset().top;

      var height = $node.outerHeight(true);
      //找出next于node之间的所有元素
      var $inBetween = $next.nextUntil(node);
      if($inBetween.length===0)
         $inBetween = $node.nextUntil(next);
      //把node放在预定位置
      $node.insertBefore(next);
      //测量新的top偏移坐标
      var newTop = $node.offset().top;
      //讲node 移回至原始所在位置
      $node
          .removeClass('animate')
          .css('top',oldTop - newTop);
      $inBetween
          .removeClass('animate')
          .css('top',oldTop<newTop?height:-1*height);
      //强制重绘
      $node.offset();
      //动画，重置所有元素的top坐标为0
      $node.addClass('animate').css('top',0);
      $inBetween.addClass('animate').css('top',0);

    }
  }

});