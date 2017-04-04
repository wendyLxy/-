<?php
	'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
		$user = $_POST["user"];
		if($user == ""){
			echo "<script>alert('请输入手机号');</script>";
		}else{
			mysql_connect("localhost","root");
			mysql_select_db("miya");
			$sql="select username,password from register where username='$user'";  
            //$sql = "select username from aa";  
            $result = mysql_query($sql);  
            $num = mysql_num_rows($result);  
            if($num)  
            {  
                echo "1";  
            }  
            else  
            {  
                echo "0"; 
            }  
       }
?>