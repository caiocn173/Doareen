<?php

ini_set( 'error_reporting', E_ALL );
ini_set( 'display_errors', true );

class database {
	var $x;
	function __construct() {
		$this->x=mysqli_connect("localhost", "jdgjtiwu_doareen", "75489873", "jdgjtiwu_doareen") or
		die ("Não foi possível conectar ao servidor");
	}
	
	function __destruct() {
		@mysqli_close($this->x);
	}
	function query($q) {
		return(mysqli_query($this->x,$q));
	}
	
}

?>