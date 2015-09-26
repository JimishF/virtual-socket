/*!
 * VirtualSocket Client Library v0.1
 *
 * Copyright 2015, Jigar Bhatt, Jimish Fotariya
 * Depenencies : VirtualSocket Server Library v0.1 (Server Platform : php) 
 * Date: Tues Sept 21 22:12:05 2015 -0500
 */

/*
    Function VirtualSocket is a singleton object so it will be called once only at a time.
    Second request for other pull channel cant be called when one is running.
    if it s called than it will be executed after first VirtualSocket execution completes its all itterations.
 */

 function VirtualSocket (url){
    
    var self = this;    
    
    //receivedData obhect will be injected to user callback function 
    //this functon has 4 properties 
    /*
            ** new recieved data
            response.newObject;
            
            ** whole response text
            response.whole;

            ** number of iterations of functions
            response.iterations;

            ** status (receiving, or finished) 
            response.status;
    */

        var receivedData = {
            status : undefined,        
            new : "",
            whole : "",
            iterations :0
        }

        // this is a temparary function allows to connect user callack function with readyStatechange
            var alignCallback = function( receData ){
                self.userCallback( receData );
            }

    //This is function that receives users function and sets as current callback function  
    self.onReceive = function( fn ){
        self.userCallback = fn ;
    }

    //xhr
            if (!window.XMLHttpRequest)
            {
                console.log("Your browser does not support the native XMLHttpRequest object.");
                return;
            }             
            try
            {
                var xhr = new XMLHttpRequest();  
                
                xhr.onreadystatechange = function()
                {

                         if (xhr.readyState > 2 && xhr.readyState!=4)
                        {

                                receivedData.new = xhr.responseText.substring( receivedData.whole.length ) ;
                                receivedData.whole = xhr.responseText;

                                    //checking for if reciving has finished ? than change status                         
                                    
                                    if (receivedData.new.substring(receivedData.new.length-10,receivedData.new.length) == "{finished}"){
                                        receivedData.status = "finished";
                                        receivedData.new = receivedData.new.replace('{finished}',"");
                                        receivedData.whole = xhr.responseText.replace('{finished}',"");
                                    }
                                    else{
                                        receivedData.status = "receiving";
                                    }

                                // increment iterations for looping purpose
                                receivedData.iterations++;

                                if ( self.userCallback != undefined )
                                {
                                    // inject receivedData object and call that temparary connecter function 
                                    alignCallback( receivedData );
                                }
                        }              
                     
                };
         

                xhr.open("GET",url, true);
                xhr.send("Making request...");      
            }
            catch (e)
            {
                console.log("Exception: " + e );
            }

        //return self refference for configuration purpose
        return self;
}

