<?php
$un = $_POST["uname"];
$pw = $_POST["pwd"];
$conn = new mysqli("localhost","root","root","mypro",3304);
$sql = "select * from users where username = '$un'";
$res = $conn->query($sql);
$num = $res->num_rows;
if($num == 1){
    echo '{"regist":false,"msg":"账号已被注册！请换一个账号！"}';
}else{
    $sqq = "select * from users";
    $nun = $conn->query($sqq)->num_rows;
    $nun++;
    $ssq = "insert into users(userID,username,password) value('$nun','$un','$pw')";
    $conn->query($ssq);
    echo '{"regist":true,"msg":"账号可用！注册成功！"}';
}

$conn->close();