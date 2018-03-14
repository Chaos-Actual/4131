// http is a core module provided by Node.js
// it is required if the application involves server and client
// more details can be found at: https://nodejs.org/api/http.html
const http = require('http');

// file system is a core module provided by Node.js
// more details can be found at: https://nodejs.org/api/fs.html
const fs = require('fs');

// path module
const path = require('path');

// local host
const hostname = '127.0.0.1';

// port on which server runs
const port = 9007;

// createServer method creates the http server
// req, res objects are created automatically by Node.js
const httpServer = http.createServer(function (req, res) {
  switch(req.method) {

    case 'GET':
      // request for the home page
      if(req.url === '/') {
        getWelcomePage(req, res);

        // request for favourites.html page
      } else if(req.url === '/favourites.html') {
        getFavouritesPage(req, res);

        // request for addPlace.html page
      } else if(req.url === '/addPlace.html') {
        getAddPlacePage(req, res);

        // request for getListOfFavPlaces API
      } else if(req.url === '/getListOfFavPlaces') {
        getListOfFavPlaces(req, res);

        // request for css files
      } else if (req.url.match(/.css$/)) {
        var pathName = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(pathName, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);

        // request for javascript files
      } else if (req.url.match(/.js$/)) {
        var pathName = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(pathName, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/javascript"});
        fileStream.pipe(res);
      } else {

        // request for an unknown page
        get404(req, res);
      }
      break;

    case 'POST':
      if(req.url === '/postPlace') {
        var reqBody = '';
        // server starts receiving the form data
        req.on('data', function(data) {
          reqBody += data;
        });
        // server has received all the form data
        req.on('end', function() {
          // function to add details of a new place to places.json file
          addPlaceFunction(req, res, reqBody);
        });
      }
      break;

    default:
      // method not supported
      get405(req, res);
      break;
  }
});

httpServer.listen(port, hostname, () => {
  console.log('Server started on port', port);
})

// function to return the welcome.html page back to the client
function getWelcomePage(req, res) {
  fs.readFile('client/welcome.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}

// function to return the favourites.html page back to the client
function getFavouritesPage(req, res) {
  // Complete this function to return the favourites.html page present in client folder
  fs.readFile('client/favourites.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
  fs.readFile('places.json', function(err, places) {
    if(err) {
      throw err;
    }
    var jsonPlaces = JSON.parse(places);

  });

}

// function to return the addPlace.html page back to the client
function getAddPlacePage(req, res) {
  // Complete this function to return the addPlace.html page present in client folder
  fs.readFile('client/addPlace.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}

// function to return the list of favourite places
// The function reads places.json file and sends the response back to client
// In this application, this function is called from script.js file present in client/js folder
function getListOfFavPlaces(req, res) {
  fs.readFile('places.json', function(err, content) {
      if(err) {
        throw err;
      }
      parseJson = JSON.parse(content);
      var response = {res: parseJson};
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(response));
      res.end();
  });
}

// TO DO: YOU NEED TO COMPLETE THIS FUNCTION
// function to add details of a new place to places.json file
// In this application, this function is called after submitting the form in addPlace.html
function addPlaceFunction(req, res, reqBody) {
  // TO DO: Complete this function to add details of a new place to places.json file
  // TO DO: After successful addition of the new place, redirect the user to favourites.html page.
  // TO DO: The status code associated with re-direction is 302
  // Hint: You can use querystring module for parsing form data
  fs.readFile('places.json', function(err, content) {
      if(err) {
        throw err;
      }

      //Parse string from add places form
      var inputs = reqBody.replace(/\+/g, ' ');
      inputs = decodeURIComponent(inputs);
      console.log(inputs);

      var regex = /\w*=/;
      inputs  = inputs.split(regex);
      inputs.shift();
      for (i = 0; i < inputs.length; i++){
        inputs[i] = inputs[i].replace(/&/g,'');
      }
      // Add form inputs to JSON string
      parseJson = JSON.parse(content);
      parseJson.placeList.push({"placename": inputs[0],
      "addressline1": inputs[1],
      "addressline2": inputs[2],
      "opentime": inputs[3],
      "closetime": inputs[4],
      "additionalinfo": inputs[5],
      "additionalinfourl": inputs[6]});
      //Write updates places JSON to file
      var jsonString = JSON.stringify(parseJson);
      fs.writeFile('places.json',jsonString,function (err) {
        if (err) {throw err;}
      });
      res.writeHead(302, {Location: "http://localhost:9007/favourites.html"});
      res.end();
    });
}
// function to return the 404 page back to the client
function get404(req, res) {
  //  Complete this function to return the 404.html page provided with the assignment
  //  The returned status code should be 404
  fs.readFile('client/404.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 404;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}

// function to return the 405 page back to the client
function get405(req, res) {
  //  Complete this function to return the 405.html page provided with the assignment
  //  The returned status code should be 405
  fs.readFile('client/405.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 405;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}
