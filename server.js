//"StAuth10065: I Bobby Filippopoulos, 000338236 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."

var express = require('express');
var sqlite3 = require("sqlite3").verbose();
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var dbFile = "api.db";

app.use(bodyParser.json());

//-------------------------------Create Database -->

if (!fs.existsSync(dbFile))
{
	var db = new sqlite3.Database(dbFile);
	console.log('Creating DB file');
	fs.openSync(dbFile, 'w');
	db.run('CREATE TABLE users (userid INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL)');
	console.log('The user table has been created');
}
else
{
	var db = new sqlite3.Database(dbFile);
	db.serialize(function()
	{
		console.log('Database has already been created');

		db.run('DROP TABLE users');
		console.log('The user table has been dropped');

		db.run('CREATE TABLE users (userid INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT NOT NULL)');
		console.log('The user table has been created');
	});
	db.close((err) =>
	{
		if (err) {
			return console.error(err.message);
		}
		console.log('Close the database connection.');
	});
}





var server = app.listen(8081, function()
{
	console.log("listening");
});

// var fs = require('fs');
// var file = 'C:/sqlite3' + '/' + 'test.db';
// var exists = fs.existsSync(file);
//
// if(!exists){
//   console.log('Creating DB file');
//   fs.openSync(file,'w');
// }
//
//
// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(file);

//------------------------------------- NOTES -->
//running db operations in sequence
//db.serialize(function())
//{
//	query
//});

// db.serialize(function() {
// 	db.run("CREATE TABLE Stuff (thing TEXT)");										executing statement
// 	var stmt = db.prepare("INSERT INTO Stuff VALUES (?)"); 				prepare statement
// 	var rnd;
// 	for (var i = 0; i < 10; i++)
// 	{
// 		rnd = Math.floor(Math.random() * 10000000);
// 		stmt.run("Thing #" + rnd); 																	run statement
// 	}
// 	stmt.finalize(); 																							close statement
// 	db.each("SELECT rowid AS id, thing FROM Stuff", 							process each statement
// 	function(err, row)
// 	{
// 		console.log(row.id + ": " + row.thing);
// 	});
// });

// app.get('/api', function(req, res)
// {
// 	userdata =
// 	[{'userid' : 1,
// 	  'name': 'Kevin',
// 	},
// 	{'userid' : 2,
// 	 'name' : 'Johnny',
// 	}
// 	];
// 	res.send(JSON.stringify(userdata));
// });
//
// app.get('/api/1', function(req, res)
// {
// 	userdata =
// 	[{'userid' : 1,
// 	  'name': 'Kevin',
// 	}];
// 	res.send(JSON.stringify(userdata));
// });
//
// app.delete('/api/1', function(req, res)
// {
// 	userdata =
// 	[{'userid' : 3,
// 	  'name': 'Mike',
// 	}];
// 	res.send(JSON.stringify(userdata));
// });

//app.call('route', function(requestObject, responseObject))
//get param name req.params.paramName


//--------------------------- Collection Post -->
app.post('/api', function(req, res)
{
	var db = new sqlite3.Database(dbFile);
	db.serialize(function()
	{
		let sqlStmt = "INSERT INTO users(name, email, phone) VALUES (?,?,?)";
		db.run(sqlStmt, [req.body.name, req.body.email, req.body.phone], function(err)
		{
		    if (err) {
		      return console.log(err.message);
		    }
		    // get the last insert id
		    console.log("A row has been inserted with Name: ", req.body.name ," Email: ", req.body.email ," Phone: ",req.body.phone);
		 });

		res.send("CREATE ENTRY SUCCESSFUL");
		res.status("202");
	});

	db.close((err) =>
	{
		if (err) {
			return console.error(err.message);
		}
		console.log('Close Post Collection connection.');
	});
});

//--------------------------- Collection Get -->
app.get('/api', function(req, res)
{
	var db = new sqlite3.Database(dbFile);
	db.serialize(function()
	{
		let sqlStmt = "SELECT userid, name, email, phone FROM users ORDER BY userid";
		var usersList = [];
		db.all(sqlStmt, [], (err, rows) =>
		{
			if (err) {
		    return console.error(err.message);
		  }

		  rows.forEach((row) =>
			{
		    console.log(row.userid, row.name, row.email, row.phone);
				userdata =
				[{'userid' : row.userid,
				  'name': row.name,
					'email': row.email,
					'phone': row.phone
				}];

				usersList.push(userdata);
		  });
			res.send(JSON.stringify(usersList));
			console.log(JSON.stringify(usersList));
		});
	});

	db.close((err) =>
	{
		if (err) {
			return console.error(err.message);
		}
		console.log('Close collection get connection.');
	});
});

	// userdata =
	// [
	// {'userid' : 1, 'name' : 'kevin'}
	//
	// ];
	// res.send(JSON.stringify(userdata));
	// res.status("202");

//--------------------------- Individual Get -->
app.get('/api/:id', function(req, res)
{
	var db = new sqlite3.Database(dbFile);
	db.serialize(function()
	{
		var sql = `SELECT userid,
	                  name,
										email,
										phone
	           FROM users
	           WHERE userid  = ?`;

		var userid = req.params.id;

		db.get(sql, [userid], (err, row) =>
		{
		  if (err) {
		    return console.error(err.message);
		  }
			else
			{
				if(row != undefined)
				{
				console.log(row);
				res.send("CREATE ENTRY SUCCESSFUL" + row);
				}
				else
				{
					var useridString = (userid).toString();
					console.log("No user found with the id: ", userid);
					res.status(200).send("No user found with the id "+userid);
				}
			}

		});
	});

		db.close((err) =>
		{
			if (err) {
				return console.error(err.message);
			}
			console.log('Close collection get connection.');
		});
});


	//--------------------------- Individual Delete -->
app.delete('/api/:id', function(req, res)
{
	console.log(req.params);
	var db = new sqlite3.Database(dbFile);
	db.serialize(function()
	{
		var sql = `DELETE FROM users WHERE userid  = ?`;

			var userid = req.params.id;
		// var userid = 1;

		db.run(sql, [userid], function(err)
		{
			if (err)
			{
				return console.error(err.message);
			}
			else
			{
				res.send("DELETE ITEM SUCCESSFUL");
				console.log(`Row(s) deleted ${this.changes}`);
			}
		});
	});

	db.close((err) =>
	{
		if (err) {
			return console.error(err.message);
		}
		console.log('Close individual delete connection.');
	});
});

//--------------------------- Collection Delete -->
app.delete('/api', function(req, res)
{
	var db = new sqlite3.Database(dbFile);
	db.serialize(function()
	{
		var sql = `DELETE FROM users`;

		db.run(sql, [], function(err)
		{
			if (err)
			{
				return console.error(err.message);
			}
			else
			{
				res.send("DELETE COLLECTION SUCCESSFUL");
				console.log(`Row(s) deleted ${this.changes}`);
			}
		});
	});

	db.close((err) =>
	{
		if (err) {
			return console.error(err.message);
		}
		console.log('Close collection delete connection.');
	});
});

//--------------------------- Collection Update -->
app.put('/api', function(req, res)
{
	var userdata = req.body;
	console.log(userdata);
	var db = new sqlite3.Database(dbFile);

		db.serialize(function()
		{
			for (var i = 0; i < userdata.length; i++)
			{
				let data = [userdata[i].name, userdata[i].email, userdata[i].phone, userdata[i].userid];
				let sql = `UPDATE users
				            SET name = ?, email = ?, phone = ?
				            WHERE userid = ?`;

				db.run(sql, data, function(err)
				{
					if (err)
					{
						return console.error(err.message);
					}
					else
					{
						console.log(`Row(s) updated ${this.changes}`);
					}
				});
			}
			res.status(200).send('REPLACE COLLECTION SUCCESSFUL. Row(s) updated ');
			//res.status(200).send('REPLACE COLLECTION SUCCESSFUL. Row(s) updated ' + JSON.stringify(userdata));
		});



	db.close((err) =>
	{
		if (err) {
			return console.error(err.message);
		}

		console.log('Close collection put connection.');
	});
});

//--------------------------- Individual Update -->
app.put('/api/:id', function(req, res)
{
	var userdata = req.body;
	var db = new sqlite3.Database(dbFile);
	db.serialize(function()
	{
		let data = [req.body.name, req.body.email, req.body.phone, req.params.id];
		let sql = `UPDATE users
		            SET name = ?, email = ?, phone = ?
		            WHERE userid = ?`;

		db.run(sql, data, function(err)
		{
			if (err)
			{
				return console.error(err.message);
			}
			else
			{
				console.log(`Row(s) updated: ${this.changes}`);
				res.send("UPDATE ITEM SUCCESSFUL")
			}
		});
	});


	db.close((err) =>
	{
		if (err) {
			return console.error(err.message);
		}
		console.log('Close individual put connection.');
	});
});
