var myConfig1 = {
    "type": "gauge",
    title: {
        text: 'Jauge',
        backgroundColor: 'none',
        fontColor: '#A4A4A4',
        fontFamily: 'Arial',
        fontSize: '18px',
      },
      
    
    "scale-r": {
        "aperture": 200, 
        "values": "0:100:10", //le type augmentation des valeur du jayge
        "center": {// aiguille du jauge
          "size": 5,
          "background-color": "#66CCFF #FFCCFF",
          "border-color": "none"
        },

        "ring": {
          "size": 10,
          "rules": [

            {
              "rule": "%v >= 80 && %v <=100",
              "background-color": "red"
            }
          ]
        },
        "guide": { //Specify your gauge chart's background color(s).
          "background-color": "#66CCFF #FFCCFF",
          "alpha": 0.2
        }
      },
    
    "series": [{
      "values": [87],
    }]
  };
   
  zingchart.render({
    id: 'myChart',
    data: myConfig1,
    height: "110%",
    width: "100%"
  });

  //graphique de milieu 3




  var myConfig = {
    type: "bar",
    refresh: {
      interval: 1000, //values assumed ass milliseconds unless the value is less than 50
      type: "feed",
      adjustScale: false,
      maxTicks: 15, //max number of data points painted in chart others will be pushed off
      url: "https://us-central1-zingchart-com.cloudfunctions.net/public_http_feed?min=0&max=40&plots=1"
    },
    series: [{
      values: []
    }]
  };
   
  zingchart.render({
    id: 'myDonnes3',
    data: myConfig,
    width: '99%'
  });