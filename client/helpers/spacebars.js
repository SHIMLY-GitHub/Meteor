/**
 * Created by iMuse on 15-7-17.
 */
UI.registerHelper('pluralize',function(n,thing){
  if(n===1){
      return '1'+thing;
  }  else{
      return n+' '+thing;
  }
});