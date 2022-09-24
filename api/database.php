<?php

class database {
	var $x;
	function __construct() {
		$this->x=mysqli_connect("sql10.freemysqlhosting.net","sql10522028","2qTSZeEq1S","sql10522028");
		
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