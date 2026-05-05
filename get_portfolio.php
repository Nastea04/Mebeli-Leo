<?php
header('Content-Type: application/json');

$baseDir = 'mebeli';
$categories = ['kitchen', 'bedroom', 'livingroom', 'bathroom', 'establishment', 'cabinet', 'corridor'];
$result = [];

foreach ($categories as $cat) {
    $path = $baseDir . '/' . $cat;
    if (is_dir($path)) {
        $files = glob("$path/*.{png,jpg,jpeg}", GLOB_BRACE);
        
         $result[$cat] = array_map(function($file) use ($cat) {
            preg_match('/(\d+)\.(png|jpg|jpeg)$/i', $file, $matches);
            return isset($matches[1]) ? (int)$matches[1] : 1;
        }, $files);
        
        sort($result[$cat]);
    } else {
        $result[$cat] = [];
    }
}

echo json_encode($result);
?>