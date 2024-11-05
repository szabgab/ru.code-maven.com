var templates = {};

function display_template(tmpl, data) {
    console.log('display');
    if (templates[tmpl] === undefined) {
      return;
    }

    var template = templates[tmpl];
    var html    = template(data);
   $("#msg").html(html);
}

$(document).ready(function() {
    $("#show").click(function () {
      console.log('click');
      var name = 'show';
      var data = { time: new Date };

       if (templates[name] === undefined) {
         console.log("need");
         jQuery.get("/try/examples/js/handlebars_template_" + name + ".htm", function(resp) {
             console.log(resp);
             templates[name] = Handlebars.compile(resp);
             display_template(name, data);
         });
       } else {
          display_template(name, data);
       }
   });
});
