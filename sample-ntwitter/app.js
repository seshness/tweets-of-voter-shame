
/**
 * Module dependencies.
 Added
 1. ntwitter - package for using Twitter API
 2. url - used to parse out different parts of URLs
 */

 var express = require('express')
 , routes = require('./routes')
 , http = require('http')
 , path = require('path')
 , ntwitter = require('ntwitter')
 , url = require('url');

 var app = express();

 app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('secretsession'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

 app.configure('development', function(){
  app.use(express.errorHandler());
});

  /**
   * Above this line are Express Defaults.   */

   app.get('/', routes.index);

  /**
    * This demonstrates a use case where the Application itself is making all of the API calls on its
    * own behalf.
    */

    app.get('/single', function(req, res){
      console.log("Entering Single User Example...");

  /* Be sure to include all 4 tokens.
   * Default keys don't work. I am leaving them to make it easier to compare to screenshots found at
   * https://github.com/drouillard/sample-ntwitter
   * NOTE: In a real application do not embedd your keys into the source code
   * TODO: Fill in your Application information here
   */
   var twit = new ntwitter({
    consumer_key: 'qYjZUoIoJwXRedj26ctLQ',
    consumer_secret: 'oOVZgomKBJ9MYnZ8oBU68GOLrgMYh6370DWWWHC5wo',
    access_token_key: '16045553-FlegTqoHVGSyVpTmoES1a5yMqTQ1J4bD3pSeSwbnb',
    access_token_secret: 'uivFtrmgxKZ2KZeI6NcnAf2ZLqr7U54W27Lm93Re78'
  });

   twit
   .verifyCredentials(function (err, data) {
    console.log("Verifying Credentials...");
    if(err)
      console.log("Verification failed : " + err)
  })
   .getHomeTimeline('',
    function (err, data) {
      console.log("Timeline Data Returned....");
      // console.log(data);

      var view_data = {
        "timeline" : JSON.stringify(data)
      }

      console.log("Exiting Controller.");
      res.render('single',view_data);
    });
 });

app.get('/signin_with_twitter', function(req, res){
  console.log("Entering Sign-in With Twitter Example...");
  
  /** 
   * Include only Application Specific Tokens. User Sign-in with Twitter to get Ouath tokens
   * Default keys don't work. I am leaving them to make it easier to compare to screenshots found at
   * https://github.com/drouillard/sample-ntwitter
   * NOTE: In a real application do not embedd your keys into the source code
   * TODO: Fill in your Application information here
   */
   var twit = new ntwitter({
    consumer_key: 'EibJRBO1NGcJvpxAIZnXjQ',
    consumer_secret: '4etBzAdBXqe2uzHR4BN1fut1DBeGeyR0PEFuLCB1YzU'});

   var path = url.parse(req.url, true);
   twit.login(path.pathname,"/twitter_callback")(req,res);

    /** 
     * Do NOT include any sort of template rendering here
     * If you do so, it will prevent the redirect to Twitter from happening
     * res.render('do_not_enable ');
     */
   });

app.get('/twitter_callback', function(req, res){
  console.log("Sucessfully Authenticated with Twitter...");

  /** 
   * Include only Application Specific Tokens. User Sign-in with Twitter to get Ouath Tokens
   * Default keys don't work. I am leaving them to make it easier to compare to screenshots found at
   * https://github.com/drouillard/sample-ntwitter
   * NOTE: In a real application do not embedd your keys into the source code
   * TODO: Fill in your Application information here
   */

   var twit = new ntwitter({
    consumer_key: 'EibJRBO1NGcJvpxAIZnXjQ',
    consumer_secret: '4etBzAdBXqe2uzHR4BN1fut1DBeGeyR0PEFuLCB1YzU'});

   twit.gatekeeper()(req,res,function(){
    req_cookie = twit.cookie(req);
    twit.options.access_token_key = req_cookie.access_token_key;
    twit.options.access_token_secret = req_cookie.access_token_secret; 

    twit.verifyCredentials(function (err, data) {
      console.log("Verifying Credentials...");
      if(err)
        console.log("Verification failed : " + err)
    })
    .getHomeTimeline('',
      function (err, data) {
        console.log("Timeline Data Returned...");
        // console.log(data);

        var view_data = {
          "timeline" : JSON.stringify(data)
        }

        console.log("Exiting Controller.");
        res.render('signin_with_twitter',view_data);
      });
  });
 });


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

