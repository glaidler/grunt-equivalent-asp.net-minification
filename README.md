# grunt-equivalent-asp.net-minification
Being a newbe to Grunt/bower from the world of ASP.net Web Optimization, I had a major ball-ache getting a grunt workflow that was reasonably equivalent to ASP.net minification with release and development builds, so I thought someone may benefit from my gruntfile.js

Packages used:

* bower-concat: Concatenates all bower js and css files in the right order.
* concat: concatenates all your js files into a managable handful.  The example here is angular-opinionated, but you get the idea.
* ngAnnotate: Ignore if you're not using angular, but makes the dependency injection minfication-safe.
* cssmin: minifies css files.
* uglify: minfies js.
* injector: injects the appropriate entries into an HTML/View page.  Equivalent to what @Script.Render did.


I have 2 Task aliases: Dev and Prod.

"dev" basically injects the raw un-minified js & css into the appropriate places in the view.

"prod" does all the concatenation, minification etc and injects these generated versions rather than the raw css/js.

NB: None of this will make sense if you don't have:

     <!-- injector:js -->

and 

     <!--endinjector-->

in an html/view page somewhere - as this is where the links to all the magic gets put.  Put these where you used to have @Script.Render/@Style.Render

#Finally

In your Pre-build command line, have the following:

    if $(ConfigurationName) == Debug call grunt dev
    if $(ConfigurationName) == Release call grunt prod


