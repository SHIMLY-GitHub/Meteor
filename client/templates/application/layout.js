/**
 * Created by iMuse on 15-7-20.
 */
Template.layout.onRendered(function(){
    this.find('#main')._uihooks = {
      insertElement:function(node,next){
        $(node)
            .hide()
            .insertBefore(next)
            .fadeIn();
      },

      removeElement:function(node){
          $(node).fadeOut(function(){
             $(this).remove();
          });
      }
    }

});