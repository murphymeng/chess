<?php
function pr($v) {
    echo "<pre>";
    print_r($v);
    echo "</pre>";
}

function redirect($path) {
	header("Location:" . $path);
}