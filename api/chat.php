<?php

include "./VirtualSocket_server_0.1.php";
    
    VirtualSocket::limitItterations(5);
    //default is 10

    //render callback allows to check modifications
    //if there is modification than you can generate new response array 
    //and pushResponse to client

    VirtualSocket::renderCallback( function($i){
        //$i reffers current itteration

        $serverTime = time();
        $ar = array('message' => $i);

            //pushing response array to client;
            VirtualSocket::pushResponse($ar);
    });

?>
