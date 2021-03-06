<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");

	CModule::IncludeModule("iblock");
	CModule::IncludeModule("sale");

$ids = array(
8190,
6627,
7475,
7365,
6355,
7988,
7659,
7018,
6037,
8214,
8624,
8434,
65392,
7851,
7928,
6551,
7587,
8638,
8204,
6994,
7679,
8636,
8582,
6219,
8550,
8722,
68998,
80512,
7932,
5769,
66427,
8032,
6737,
7944,
7837,
7954,
8342,
5893,
6485,
7720,
60927,
6405,
6625,
8602,
66444,
7849,
8079,
8430,
6829,
8640,
8556,
7657,
5891,
7767,
6605,
7525,
8382,
8013,
66452,
6273,
5841,
7946,
8292,
5669,
6747,
8314,
7032,
7006,
6537,
7726,
7819,
6541,
7750,
6269,
6743,
7694,
6849,
7970,
7877,
8826,
7373,
6777,
7286,
7491,
8598,
5787,
7821,
5587,
7190,
8572,
6385,
7942,
8103,
8008,
8530,
7432,
7030,
7575,
6745,
7775,
8454,
7487,
75968,
7746,
80687,
8256,
7787,
7968,
7643,
8330,
8506,
6267,
8161,
7343,
7825,
7736,
8224,
7813,
7683,
7783,
8392,
6009,
8163,
7073,
7481,
8642,
7716,
8746,
66489,
7855,
7061,
6159,
6307,
8654,
6793,
8075,
8516,
8133,
8004,
8632,
8456,
8522,
8101,
7889,
7885,
8276,
8212,
8402,
8322,
7909,
8040,
8228,
8702,
8248,
7351,
7495,
62229,
5873,
7827,
6341,
6413,
7799,
6087,
8474,
8312,
7940,
6984,
7143,
7513,
8202,
7962,
6313,
7952,
67411,
8268,
8097,
8165,
7509,
6545,
7771,
7857,
8788,
8218,
75445,
7424,
6966,
8002,
6996,
8386,
8318,
7345,
5833,
7689,
8137,
6671,
8410,
5553,
6147,
6685,
7891
);
$table = '<table border="1"><tbody><tr>';
$table .='<td style="font-weight:700">name</td>';
$table .='<td style="font-weight:700">description</td>';
$table .='<td style="font-weight:700">oldprice</td>';
$table .='<td style="font-weight:700">price</td>';
$table .='<td style="font-weight:700">currencyId</td>';
$table .='<td style="font-weight:700">discount</td>';
$table .='<td style="font-weight:700">vendor</td>';
$table .='<td style="font-weight:700">category</td>';
$table .='<td style="font-weight:700">promo</td>';
$table .='<td style="font-weight:700">url</td>';
$table .='<td style="font-weight:700">picture</td>';
$table .='</tr>';
foreach ($ids as $book)	{
	$book = CCatalogProduct::GetByIDEx($book);
	$table .='<tr>';
	$table .='<td>'.$book[NAME].'</td>';
	$table .='<td>'.substr(strip_tags($book[PREVIEW_TEXT]),0,800).'</td>';
	$table .='<td></td>';
	$table .='<td></td>';
	$table .='<td>RUR</td>';
	$table .='<td></td>';
	$table .='<td>'.$book[PROPERTIES][PUBLISHER][VALUE_ENUM].'</td>';
	$table .='<td>Книги</td>';
	$table .='<td></td>';
	$table .='<td></td>';
	$table .='<td>https://www.alpinabook.ru'.CFile::GetPath($book[DETAIL_PICTURE]).'</td>';
	$table .='</tr>';
	
	
}
$table .= '</tbody></table>';
echo $table;
?>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_after.php");?>