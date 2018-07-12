/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var limitstart = 3;
var jsonapple;

$("a#backward").css("visibility", "hidden");

GetJsonApple();


function GetJsonApple()
{
    var artits = 'Porter';

    if (GetURLParameter('search') !== undefined) {
        artits = GetURLParameter('search');
    }
    $.getJSON('https://itunes.apple.com/search?term=' + artits + '&callback=?', function (data) {

        jsonapple = data;

    });

}


function GetListArtist(limit)
{
    var limtnumber=1;
     
   
    $.each(jsonapple, function (key, val) {
        if (key !== 'resultCount') {
            var arr = $.makeArray(val);
            if(arr.length==0)
            {
                $('#myModal').modal('show');
            }
            $.each(arr, function (index, value) {
                if (index >= limit - 3 && index < limit)
                {
                    $('#list'+(limtnumber)).empty();    
                    var obj = JSON.parse(JSON.stringify(value));
                    var htmlcomplete = '';

                    //htmlcomplete += '<li class="page-item">';
                    if (index === (limit - 2)) {
                        htmlcomplete += '<div class="plan plan-tall">';
                    } else {
                        htmlcomplete += '<div class="plan">';
                    }
                    htmlcomplete += '<h2 class="plan-title">' + obj.artistName + '</h2>';
                    htmlcomplete += '<img class="plan-price" src="' + obj.artworkUrl100 + '"</img>';
                    htmlcomplete += '<ul class="plan-features">';
                    htmlcomplete += '<strong>Name: </strong>' + obj.collectionCensoredName + '<br>';
                    htmlcomplete += '<strong>Country: </strong>' + obj.country + '<br>';
                    htmlcomplete += '<strong>Genere: </strong> ' + obj.primaryGenreName + '<br>';
                    htmlcomplete += '</ul>';
                    htmlcomplete += '<a href="' + obj.trackViewUrl + '" class="plan-button">'+obj.trackCensoredName+'</a>';
                    htmlcomplete += '</div>';
                   // htmlcomplete += '</li>';
                    $('#list'+(limtnumber)).append(htmlcomplete);
                    limtnumber++;

                }

            });
        }
    });



}

$(window).on('load', function () {

    GetListArtist(limitstart);
    GetDelayTable();
   
    $("a#forward").click(function () {
        if (limitstart < 45) {
            limitstart = limitstart + 3;
            $("a#forward").css("visibility", "visible");
            $("a#backward").css("visibility", "visible");


        } else {
            limitstart = 48;
            $("a#forward").css("visibility", "hidden");
            $("a#backward").css("visibility", "visible");


        }

       
        GetListArtist(limitstart);
    });


    $("a#backward").click(function () {

        if ((limitstart - 3) > 3) {
            limitstart = limitstart - 3;
            $("a#backward").css("visibility", "visible");
            $("a#forward").css("visibility", "visible");


        } else {
            limitstart = 3;
            $("a#backward").css("visibility", "hidden");
            $("a#forward").css("visibility", "visible");

        }

        GetListArtist(limitstart);
    });
});

function GetDelayTable()
{
     $('li.page-item').hover(function () {
        $('div.plan.plan-tall').removeClass('plan-tall');
        $(this).find('div').addClass('plan-tall');

        //$('div.plan').addClass('plan-tall');

    });
}

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}
