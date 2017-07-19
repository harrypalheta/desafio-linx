<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: json");

echo file_get_contents("challenge.json");
