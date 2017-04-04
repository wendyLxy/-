<?php
'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
		$user = $_POST["username"];
		$psw = $_POST["password"];
		$psw_confirm = $_POST["confirm"];
		if($user == "" || $psw == "" || $psw_confirm == ""){
			echo "4";
		}else{
			if($psw == $psw_confirm){
				mysql_connect("localhost","root");
				mysql_select_db("miya");
				$sql = "select username,password from register where username = '$user'";
				$result = mysql_query($sql);
				$num = mysql_num_rows($result);
				if($num){
					echo "<script>alert('用户名已存在');</script>";
				}else{
					$sql_insert = "insert into register (username,password) values('$user','$psw')";
					$res_insert = mysql_query($sql_insert);
					if($res_insert){
						echo "<script>alert('注册成功！');</script>";
					}else{
						echo "<script>alert('系统繁忙，请稍候！');</script>";
					}
				}
			}else{
				echo "<script>alert('密码不一致！');</script>"; 
			}
		}
?>