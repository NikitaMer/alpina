<?require_once($_SERVER['DOCUMENT_ROOT']."/bitrix/modules/main/include/prolog_before.php");?>
<?
   /* $url='http://api.boxberry.de/json.php?token='.BOXBERRY_TOKEN.'&method=CourierListCities&Region';
 // $url='http://api.boxberry.de/json.php?token='.BOXBERRY_TOKEN.'&method=DeliveryCosts&weight=500&ordersum=0&paysum=0&targetstart=010&zip=624000';
      http://api.boxberry.de/json.php?token=21585.rvpqfebe&CourierListCities
    $handle = fopen($url, "rb");
    $contents = stream_get_contents($handle);
    fclose($handle);
    $data = json_decode($contents,true);
    arshow($data);
    die();     */


    //$postdata = http_build_query($_POST);

    if($_POST["method"] == 'DeliveryCosts'){
        $url='http://api.boxberry.de/json.php?token='.BOXBERRY_TOKEN.'&method='.$_POST["method"].'&weight='.$_POST["weight"].'&zip='.$_POST["zip"];

    } else {
        $url='http://api.boxberry.de/json.php?token='.BOXBERRY_TOKEN.'&method='.$_POST["method"];
    }

    $handle = fopen($url, "rb");
    $contents = stream_get_contents($handle);
    fclose($handle);

    echo $contents;
   // $data=json_decode($contents,true);


?>