//graphique1 principale 

window.onload =function () {
  var dataPoints2 =[];
  var stockChart = new CanvasJS.StockChart('chartContainer1',{
    title:{
      text :'graphiques principal',
      valueFormatString:  "#,##0.##",
    },
    axisX: {
      crosshair: {
        enabled: true,
        valueFormatString: "HH:mm:ss"//"MMM DD, YYYY HH:mm:ss" a ajouter devant
      }
		},
    animationEnabled:true,
    animationDurée: 1500,
    theme: 'light2',
    charts:[{
      data :[{
        xValueType: "dateTime",
        xValueFormatString: "HH:mm:ss",//"MMM DD, YYYY HH:mm:ss",
        type:'area', //type de garphique
        dataPoints: dataPoints2,
      },
    ]
    }
    ],
    rangeSelector: {
      buttons:[
        {
          range :1,
          rangeType: "minute",
          label : "5 seconds"
        },
        { 
          rangeType: "all",
          label : "Tout"
        }
      ],
      inputFields: {
        valueType: "dateTime",
        valueFormatString: "HH:mm:ss",
      
      }
    },
  });
  $.getJSON('https://mocki.io/v1/a9106819-3b9f-4f63-b956-94827afaf549',function (data) {
    //http://api.tenezis.pro:8080/iot/monitoring/user1/device1/courant/1663837258000/1663839058034
    for (let i= 0; i < data.length; i++) {
      dataPoints2.push({x: new Date(data[i].timestamp), y:Number(data[i].value)})   
    }
    stockChart.render();
  });
  

//graphique etat
  var dataPoints = [];

  var chart = new CanvasJS.Chart("chartContainer2", {
    theme: "light2",
    title: {
      text: ""
    },
    data: [{
      type: "line",
      dataPoints: dataPoints
    }]
  });
  updateData();
  
  // Initial Values
  var xValue = 0;
  var yValue = 10;
  var newDataCount = 6;
  
  function addData(data) {
    if(newDataCount != 1) {
      $.each(data, function(key, value) {
        dataPoints.push({x: value[0], y: parseInt(value[1])});
        xValue++;
        yValue = parseInt(value[1]);
      });
    } else {
      //dataPoints.shift();
      dataPoints.push({x: data[0][0], y: parseInt(data[0][1])});
      xValue++;
      yValue = parseInt(data[0][1]);
    }
    
    newDataCount = 1;
    chart.render();
    setTimeout(updateData, 1500);
  }
  
  function updateData() {
    $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart="+xValue+"&ystart="+yValue+"&length="+newDataCount+"type=json", addData);
  }
  //fin

  
  //graphique donnes 

  var coordx = [];
  var coordy=[1,2,2,,3,5,4,5]
  var chart1 = new CanvasJS.StockChart("chartContainerdonnes2",{
    charts: [{      
      data: [{        
        type: "line", //Change it to "spline", "area", "column"
        dataPoints : [
          {
            y :coordy, x:coordx,
          }
        ]
      }]
    }],
  }); 
  $.getJSON("https://mocki.io/v1/80b5671f-7fd3-438b-af57-691ef299e1c7", function(data) {  
    for(var i = 0; i < data.length; i++){
      coordx.push({x: Number(data[i].results.series.values[i]),});
    }
	
    chart1.render();
  });

 
 
 
 
 //donnes 2
 
 var chart3 = new CanvasJS.Chart("chartContainerdonnes3", {

  theme: "light2",
      

  data: [  //array of dataSeries     
  { //dataSeries - first quarter
/*** Change type "column" to "bar", "area", "line" or "pie"***/        
   type: "column",
   dataPoints: [
   { label: "1", y: 58 },
   { label: "2", y: 69 },
   { label: "3", y: 80 },                                    
   { label: "4", y: 74 },
   { label: "5", y: 64 }
   ]
 },

 { 
  //dataSeries - second quarter

  type: "column",
  name: "Second Quarter", 
  showInLegend: true,               
  dataPoints: [
  { label: "donn1", y: 63 },
  { label: "donne2", y: 73 },
  { label: "donne3", y: 88 },                                    
  { label: "donne4", y: 77 },
  { label: "donne5", y: 60 }
  ]
}
],
/** Set axisY properties here*/
axisY:{
  prefix: "volt ",
}    
});
chart3.render();
}

//recuperation des donnes
$.ajax({
  url: "http://api.tenezis.pro:8080/iot/monitoring/user1/device1/courant/1663837258000/1663839058034",
  //force to handle it as text
  dataType: "text",
  success: function(data) {

      //data downloaded so we call parseJSON function 
      //and pass downloaded data
      var json = $.parseJSON(data);
      //now json variable contains data in json format
      //let's display a few items
      for (var i=0;i<json.length;++i)
      {
          $('#appareil').append('<div class="name">'+json[i].hits+'</>' );
          $('#etats').append('<div class="name">'+json[i].device+'</>' );
          $('#valeur').append('<div class="name">'+json[i].kpi+'</>' );
      }
  }
});

