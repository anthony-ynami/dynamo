var express=require('express');
var app=express();
var cat=0;
var dog=0;

var counter=0;


var q = ["refresh pls","pick a music genre", "sticks or yarn?", "Last one: Dog or Cat?"];
var adog=["","DUBSTEP", "stick", "Dog"];
var acat=["","v a p o r w a v e ","yarn"," Cat"]
var ahuh=["","i like all genres","why not both","either's fine i guess"]

app.get('/', function (req, res) {
	res.send('are you a cat or dog person? (answer "/a" or "/b" in the url) Go Out or Stay in? a) go out b) stay in c) do i have to choose?')
})



app.get('/a', function(req, res) {

	if (counter<4){

		res.send( q[counter]+" " +"   a)"+adog[counter]  +"   b)"+acat[counter]  +"   c)"+ahuh[counter] );
		counter++;
		cat++ 

	}else if (dog>1){
		res.send(" You're a Dog Person " );
		cat=0;
		dog=0;
		huh=0;
		counter=0;
	}else if (cat>1) {
		res.send(" You're a Cat Person " );   
		cat=0;
		dog=0;
		huh=0;
		counter=0;
	} else{
		res.send(" You're too indecisive! " ); 		
	}        

});

app.get('/b', function(req, res) {

	if (counter<4){

		res.send(q[counter]+" " +"   a)"+adog[counter]  +"   b)"+acat[counter]  +"   c)"+ahuh[counter] );
		counter++;
		dog++; 

	}else if (dog>1){
		res.send(" You're a Dog Person  " );
		cat=0;
		dog=0;
		huh=0;
		counter=0;		 
	}else if (cat>1) {
		res.send(" You're a Cat Person  " );

		cat=0;
		dog=0;
		huh=0;
		counter=0;
		
	} else{
		res.send(" You're too indecisive!" ); 		
	}        

});


app.get('/c', function(req, res) {

	if (counter<4){

		res.send(q[counter]+" " +"   a)"+adog[counter]  +"   b)"+acat[counter]  +"   c)"+ahuh[counter] );
		counter++;
		huh++ 
	}else if (dog>1){
		res.send(" You're a Dog Person " ); 
		cat=0;
		dog=0;
		huh=0;
		counter=0;		 
	}else if (cat>1) {
		res.send(" You're a Cat Person " );  
		cat=0;
		dog=0;
		huh=0;
		counter=0;		
	} else{
		res.send(" You're too indecisive! " ); 		
	}        

});



app.listen(process.env.PORT || 3000);