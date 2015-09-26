<?php 
/*!
 * VirtualSocket Server Library v0.1 (php)
 *
 * Copyright 2015, Jigar Bhatt, Jimish Fotariya
 * Depenencies : VirtualSocket Client Library v0.1 ( A Javascript Library ) 
 * Date: Wed Sept 10:25:15 2015 -0500
 */

header('Content-Type: text/octet-stream');
header('Cache-Control: no-cache'); 
     
     /*
     * virtual socket class
     */
    
     class VirtualSocket
     {
         
         private static $i;
         private static $limit;
         
            function __construct()
                self::$i = 0;
                self::$limit = 10;
            }
            
                public static function limitItterations($l){
                {
                    self::$limit = $l;
                }

                public static function renderCallback($fn){
                   
                    if(self::$i == self::$limit){

                        return true;
                    }else{
                        self::$i++;
                    }

                        sleep(1);           
                        $fn(self::$i);
                 
                    return self::renderCallback($fn);
                }


                public static function pushResponse($ar){

                    echo json_encode($ar);            
                        if( self::$i == self::$limit ){
                            echo '{finished}';
                        }
                        ob_flush();
                        flush();
                } 

      }


?>