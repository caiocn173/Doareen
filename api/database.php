<?php

class database {
	var $x;
	function __construct() {
		$this->x=pg_connect("host=ec2-23-23-151-191.compute-1.amazonaws.com dbname=d96t37t1e8l25b user=jlnrrtrcncxdri password=ed6ead83f589868ba10d5c1dd33199883daaaad7f50eadb48f9935d3819d13a4") or
		die ("Não foi possível conectar ao servidor PostGreSQL");	
	}
	
	
	function __destruct() {
		@pg_close($this->x);
	}
	function query($q) {
		return(pg_query($this->x,$q));
	}
	
}

?>