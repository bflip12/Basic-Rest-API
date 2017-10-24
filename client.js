//"StAuth10065: I Bobby Filippopoulos, 000338236 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."

var http = require('http');

writeResponseToConsole = function(response)
{
	var str = '';
	response.on('data',function(chunk)
						{str += chunk;});
	response.on('end', function()
						{console.log(str);});
}

var optionsGet =
{
	host : 'localhost',
	path : '/api',
	port : '8081',
	method : 'get'
};

var optionsGetIndividual =
{
	host : 'localhost',
	path : '/api/1',
	port : '8081',
	method : 'get'
};

var optionsDeleteIndividual =
{
	host : 'localhost',
	path : '/api/1',
	port : '8081',
	method : 'delete'
};

var optionsDeleteCollection =
{
	host : 'localhost',
	path : '/api',
	port : '8081',
	method : 'delete'
};

var optionsPost =
{
	 host : 'localhost',
	 path : '/api',
	 port :  '8081',
	 method: 'post',
	 headers: {
      'Content-Type': 'application/json'
  }
};

var optionsPutIndividual =
{
	 host : 'localhost',
	 path : '/api/1',
	 port :  '8081',
	 method: 'put',
	 headers: {
      'Content-Type': 'application/json'
  }
};

var optionsPutCollection =
{
	 host : 'localhost',
	 path : '/api',
	 port :  '8081',
	 method: 'put',
	 headers: {
      'Content-Type': 'application/json'
  }
};





callbackGetCollection = function(response)
{
	writeResponseToConsole(response);

	var req = http.request(optionsPost, callbackPost);
  req.on('error', function(e) {
 	 console.log('problem with request: ' + e.message);
  });
  req.write('{"name": "kevin", "email": "kevin@hotmail.com", "phone": "1231231234"}');
  req.end();
}

callbackPost = function(response)
{
	writeResponseToConsole(response);

 //http.request(optionsGet, callbackGetCollection).end();
 var reqtwo = http.request(optionsPost, callbackPostTwo);
	reqtwo.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});
	reqtwo.write('{"name": "bobby", "email": "bobby@hotmail.com", "phone": "1231231234"}');
	reqtwo.end();
}

callbackPostTwo = function(response)
{
	writeResponseToConsole(response);
 http.request(optionsGet, callbackGetCollectionAfterPost).end();
}

callbackGetCollectionAfterPost = function(response)
{
	writeResponseToConsole(response);

	//PUT Collection
	var reqPutCollection = http.request(optionsPutCollection, callbackPutCollection)
	reqPutCollection.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});
	reqPutCollection.write('[{"userid" : 1, "name": "putone", "email": "utone@hotmail.com", "phone": "6786786789"}, {"userid" : 2, "name": "puttwo", "email": "puttwo@hotmail.com", "phone": "8908908901"}]');
	reqPutCollection.end();
}

callbackPutCollection = function(response)
{
	writeResponseToConsole(response);
	// GET Collection
	http.request(optionsGet, callbackGetCollectionAfterPut).end();
}

callbackGetCollectionAfterPut = function(response)
{
	writeResponseToConsole(response);
	//Delete Collection
	http.request(optionsDeleteCollection, callbackDeleteCollection).end();

}


callbackDeleteCollection = function(response)
{
	writeResponseToConsole(response);
	http.request(optionsGet, callbackGetCollectionAfterDelete).end();

}

callbackGetCollectionAfterDelete = function(response)
{
	writeResponseToConsole(response);
	//Post Collection
	var reqthree = http.request(optionsPost, callbackPostThree);
	 reqthree.on('error', function(e) {
		 console.log('problem with request: ' + e.message);
	 });
	 reqthree.write('{"name": "mike", "email": "mike@hotmail.com", "phone": "1231231234"}');
	 reqthree.end();

}

callbackPostThree = function(response)
{
	writeResponseToConsole(response);
	//GET Individual
	http.request(optionsGetIndividual, callbackGetIndividual).end();
}

callbackGetIndividual = function(response)
{
	writeResponseToConsole(response);
	//PUT Individual
  var reqPutIndividual = http.request(optionsPutIndividual, callbackPutIndividual)
  reqPutIndividual.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  reqPutIndividual.write('{"name": "larry", "email": "larry@hotmail.com", "phone": "3213214321"}');
  reqPutIndividual.end();
}

callbackPutIndividual = function(response)
{
	writeResponseToConsole(response);
	//GET Collection
	http.request(optionsGet, callbackGetCollectionAfterIndividualPut).end();
}

callbackGetCollectionAfterIndividualPut = function(response)
{
	writeResponseToConsole(response);
	//Delete Individual
	http.request(optionsDeleteIndividual, callbackDeleteIndividual).end();
}

callbackDeleteIndividual = function(response)
{
	writeResponseToConsole(response);
	//GET Collection
	http.request(optionsGet, callbackGetCollectionAfterIndividualDelete).end();
}

callbackGetCollectionAfterIndividualDelete = function(response)
{
	writeResponseToConsole(response);
	console.log("ALL TESTS SUCCESSFUL");
}

// ~~~~~~~~~~~~~ Start Test Harness ~~~~~~~~~~~~~~~~~~
http.request(optionsGet, callbackGetCollection).end();


// POST Collection
// var req = http.request(optionsPost, callbackPost);
// req.on('error', function(e) {
//   console.log('problem with request: ' + e.message);
// });
// req.write('{"name": "kevin", "email": "kevin@hotmail.com", "phone": "1231231234"}');
// req.end();

//Delete Individual
// http.request(optionsDeleteIndividual, callbackDeleteIndividual).end();

//Delete Collection
//http.request(optionsDeleteCollection, callbackDeleteCollection).end();

//GET Collection
// http.request(optionsGet, callbackGetCollection).end();

//GET Individual
// http.request(optionsGetIndividual, callbackGetIndividual).end();

//PUT Individual
// var reqPut = http.request(optionsPutIndividual, callbackPutIndividual)
// reqPut.on('error', function(e) {
//   console.log('problem with request: ' + e.message);
// });
// reqPut.write('{"name": "Bobby", "email": "bob@hotmail.com", "phone": "3213214321"}');
// reqPut.end();

//PUT Collection
// var reqPutCollection = http.request(optionsPutCollection, callbackPutCollection)
// reqPutCollection.on('error', function(e) {
//   console.log('problem with request: ' + e.message);
// });
// reqPutCollection.write('[{"userid" : 1, "name": "putone", "email": "utone@hotmail.com", "phone": "6786786789"}, {"userid" : 2, "name": "puttwo", "email": "puttwo@hotmail.com", "phone": "8908908901"}]');
// reqPutCollection.end();
