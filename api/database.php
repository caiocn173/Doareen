<?php

class database {
	var $x;
	function __construct() {
		$this->x=mysqli_connect("localhost","root","75489873","doareen");
		
		mysqli_set_charset($this->x,"utf8");
		

	}
	
	
	function __destruct() {
		@mysqli_close($this->x);
	}
	function query($q) {
		return(mysqli_query($this->x,$q));
	}
	
}

?>