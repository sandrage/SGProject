<?php
if(ISSET($_POST["send"]))
{
	$nome=$_POST["nome"];
    $email=$_POST["email"];
    $oggetto=$_POST["oggetto"];
    $text=$_POST["text"];
    
    if(strlen($nome)==0 || strlen($email)==0 || strlen($text)==0)
    {
    	header("location: /contactme.html");
    }
    else{
    	//controllo mail
        $k=0;
        for($i=0;$i<(strlen($email));$i=$i+1)
        {
        	if(substr($email,$i+1,1)=='.')
            {
            	$k=$k+1;
            }
        }
        if(strpos($email,'@')>1 && $k>=1)
        {
        	
        	if(mail("sandragergawi@hotmail.com",$oggetto,"Mail: ".$email."\n Nome: ".$nome."\n Messaggio: ".$text))
            {
            	header("location: /success.html");
            }
        }
        else
        {
        	header("location: /contactme.html");
        }
    }
	
}

?>