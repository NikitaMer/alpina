//Создание точек на карте------
function maps_init_GURU(points, center_1, center_2){
	if (center_1=='') {
		var center_1=55.755768;
		var center_2=37.617671;
	}
	
	ymaps.ready(init);
	
	function init() {
		var myMap = new ymaps.Map('YMapsID', {
		    center: [center_1, center_2],
		    zoom: 8,
		    behaviors: ["default", "scrollZoom"]
		}),
		
		collection = new ymaps.GeoObjectCollection();
		myMap.controls.add(
		   new ymaps.control.ZoomControl()
		);    
		myMap.geoObjects.add(collection);
		
		for(var i = 0, len = points.length; i < len; i++) {
		    collection.add(
		        new ymaps.Placemark(points[i].coords, {
			            balloonContentHeader: points[i].label+' ',
			            balloonContentBody: ''+points[i].way_desc+'<div>Время работы: <b>'+points[i].time+'</b><br>'+points[i].params+'Срок доставки в днях: <b>'+points[i].days+'</b><br><input style="padding:8px;" type="button" pf="'+points[i].pf+'" value="Выбрать" class="select-point" rel="'+points[i].id+'" city="'+points[i].city+'" name="'+points[i].label+'" region="'+points[i].region+'"  date="'+points[i].date+'"> </div>',
			            balloonContentFooter: '<b>Точный адрес:</b> <i>'+points[i].desc+'</i>',
			            hintContent: points[i].label,
			            searchStr: '<b>'+points[i].label+'</b> '+points[i].desc+'<br>'
			        },
					{
						iconLayout: 'default#image',
						iconImageHref: 'http://dostavka.guru/map_icon2.png',
						iconImageSize: [31, 40],
						iconImageOffset: [-20, -20],
						// Определим интерактивную область над картинкой.
						iconShape: {
						    type: 'Circle',
						    coordinates: [0, 0],
						    radius: 20
						}
					}            
		        )
		    );
		}
		document.getElementById('message-map-link').onclick = function () {        
			if($('.geo_class').val()){
				var myGeocoder = ymaps.geocode($('.geo_class').val()+' Россия');
			    var ccc=myGeocoder.then(
			        function (res) {
			            if(res.geoObjects.get(0).geometry.getCoordinates()!=''){
			                myMap.setCenter(res.geoObjects.get(0).geometry.getCoordinates(), 11, {
			                    checkZoomRange: true
			                });
			            }        
			        },
			        function (err) {
			            alert('Ошибка: объект на карте не найден!');
			        }
			    );    
			}
		};    
	}
}
//---------------------------------------
//ОТКРЫТЬ КАРТУ
function open_GURU_map(){
    $('#YMapsID').css('top', '100px');
    $('#close_map').css('top', '110px');
    return false;
}
//------------
//ЗАКРЫТЬ КАРТУ
function close_GURU_map(){
    $('#YMapsID').css('top', '-2000px');
    $('#close_map').css('top', '-2000px');
    return false;
}
//------------
//создание карты
function new_map_new_center(){
    $.post("http://api.dostavka.guru/client/get_pvz_codes_2.php",
    {init: 'get_pvz' }).success(function(data) {
        var center_1='37.617671';
        var center_2='55.755768';
            var points = eval("obj = " + data);
            if(data==''){
                alert('Нет соединения с сервером пунктов выдачи!');
                return false;
            }
            maps_init_GURU(points, center_1, center_2);
            open_GURU_map();
    });
}

/**
 * 
 * Получение стоимости доставки. После возврата результата происходит установка значений.
 * 
 * @param int point_id - id постамата
 * @link http://dostavka.guru/docs/GURU_api_pdf_2_0.pdf
 */
function getDeliveryCost(point_id) {
	// window.THIS_TEMPLATE_PATH сеттится в /sale.order.ajax/order/template.php
	var href   = window.location.origin + window.THIS_TEMPLATE_PATH + "/include/guru/ajax/get_delivery_cost.php",
		weight = parseInt($('.order_weight').text()) / 1000,
		sum    = parseFloat($('.items_sum').text());
	$.post(
		href,
    	{
    		weight: weight,
    		sum: sum,
    		point_id: point_id,
    	}
    ).success(function(data) {
    	console.log(data);
    	// ответ приходит в виде  475::7 дн.::only_paid=0::acquiring=0
    	var delivery_data = data.split("::");
		fitDeliveryData(delivery_data[1], delivery_data[0]);	
    });
}

/**
 * 
 * Подстановка полученных значений в верстку
 * 
 * @param string delivery_time
 * @param int delivery_price
 * @link http://dostavka.guru/docs/GURU_api_pdf_2_0.pdf
 */
function fitDeliveryData(delivery_time, delivery_price) {
	// установка цен внизу страницы
	document.querySelector('.deliveryPriceTable').innerHTML = delivery_price + ' руб.';
    finalSumWithoutDiscount = parseFloat($('.SumTable').html().replace(" ", "")) + parseFloat(delivery_price);
    $('.finalSumTable').html(finalSumWithoutDiscount.toFixed(2) + ' руб.');
    // установка значений для блока с самой доставкой
    $(".ID_DELIVERY_ID_" + window.GURU_DELIVERY_ID).html(delivery_price + ' руб.');
    $("#guru_cost").val(delivery_price);
    $("#guru_delivery_time").show();
    $("#guru_delivery_time span").html(delivery_time);
}

/**
 * 
 * Подстановка данных об адресе в верстку
 * 
 * @param object delivery_data
 */
function setAddressData(delivery_data) {
	// адрес доставки в блоке самой доставки
	$(".guru_point_addr").html(delivery_data.addr);
	// далее подставляем инфу в скрытые инпуты, для передачи дальше
	$("#guru_delivery_data").val(delivery_data.code + "|" + delivery_data.delivery_date);
}

$(document).ready(function(){
    $.post("http://api.dostavka.guru/client/get_pvz_codes_2.php",
    {init: 'get_pvz' }).success(function(data) {
        var center_1='';
        var center_2='';
            var points = eval("obj = " + data);
            if(data==''){
                alert('Нет соединения с сервером пунктов выдачи!');
                return false;
            }
            maps_init_GURU(points, center_1, center_2);
    });
});
//--------------
$(document).ready(function(){
    //ТРИГЕРЫ
    $('.message-map-link').live('click', function(){
        open_GURU_map();//открыть каррту
        return false;
    });
    
    $("#close_map").live('click', function(){
        close_GURU_map();//закрыть карту
        return false;
    });
    //ПОЛУЧИТЬ ДАННЫЕ ПО ВЫБОРУ ПУНКТА
    $('.select-point').live('click', function(){
        /*var code=$(this).attr('rel');//Код пвз
        var city=$(this).attr('city');//Город пвз
        var name=$(this).attr('name');//Наименование пвз
        var region=$(this).attr('region');//Регтон пвз
        var date_pvz=$(this).attr('date');//Ближайшая дата доставки
        */
        var address = $(this).attr('region') + ", " + $(this).attr('city') + ", " + $(this).attr('name'),
        	delivery_data = {
	        	code: $(this).attr('rel'),
	        	addr: address,
	        	delivery_date: $(this).attr('date')
	        };
        
        // немного кривовато, но т.к. все скрипты готовые, то оставим так
        getDeliveryCost(delivery_data.code);
        setAddressData(delivery_data);
        //Здесь код, который заполнит нужные поля Вашей информационной системы
        //-------------------------------------------------------------------
        close_GURU_map();//закрыть карту
        return false;
    });
});    