
var chartData2 = [];
var cdi = 0;
var cdiPerformance = [];

// Build the CDI array
for (var i = 0; i < warrenFundPerformance.chart.label.length; i++) {
  var monthlyValue = _.findLast(cdiValueChanges, function(item) {
    return item.date <= warrenFundPerformance.chart.label[i];
  });
  // http://minhaseconomias.com.br/blog/investimentos/como-calcular-o-rendimento-de-seu-investimento-em-de-cdi
  cdiPerformance.push((Math.pow((1+monthlyValue.value/100), 1/252)-1)*100);
}


for (var i = 0; i < warrenFundPerformance.chart.label.length; i++) {
  chartData2.push({
    date: warrenFundPerformance.chart.label[i],
    // https://stackoverflow.com/a/12830454/785985
    FWRF1: +(warrenFundPerformance.chart.data.FWRF1[i]*100),
    FWMM1: +(warrenFundPerformance.chart.data.FWMM1[i]*100),
    FWMM2: +(warrenFundPerformance.chart.data.FWMM2[i]*100),
    FWMM3: +(warrenFundPerformance.chart.data.FWMM3[i]*100),
    FWMM4: +(warrenFundPerformance.chart.data.FWMM4[i]*100),
    CDI: +(cdi)
  });
  // cdi += 0.031059;
  cdi += cdiPerformance[i];
}

var chart2 = AmCharts.makeChart( 'chartdiv2', {
  type: 'serial',
  dataProvider: chartData2,
  "categoryField": "date",
  "dataDateFormat": "YYYY-MM-DD",
  "chartScrollbar": {
    "enabled": true
  },
  'mouseWheelZoomEnabled':true,
  'chartCursor': {
    "enabled": true
    // 'pan': true,
    // 'valueLineEnabled': true,
    // 'valueLineBalloonEnabled': true,
    // 'cursorAlpha':1,
    // 'cursorColor':'#258cbb',
    // 'limitToGraph':'g1',
    // 'valueLineAlpha':0.2,
    // 'valueZoomable':true
  },
  "legend": {
    "enabled": true,
    "useGraphSettings": true
  },
  "graphs": [
    {
      "bullet": "round",
      "id": "AmGraph-1",
      "title": "graph 1",
      "valueField": "FWRF1",
      'bulletSize': 5,
      'hideBulletsCount': 50
    },
    {
      "bullet": "round",
      "id": "AmGraph-2",
      "title": "graph 2",
      "valueField": "FWMM1",
      'bulletSize': 5,
      'hideBulletsCount': 50
    },
    {
      "bullet": "round",
      "id": "AmGraph-3",
      "title": "graph 3",
      "valueField": "FWMM2",
      'bulletSize': 5,
      'hideBulletsCount': 50
    },
    {
      "bullet": "round",
      "id": "AmGraph-4",
      "title": "graph 4",
      "valueField": "FWMM3",
      'bulletSize': 5,
      'hideBulletsCount': 50
    },
    {
      "bullet": "round",
      "id": "AmGraph-5",
      "title": "graph 5",
      "valueField": "FWMM4",
      'bulletSize': 5,
      'hideBulletsCount': 50
    },
    {
      "bullet": "round",
      "id": "AmGraph-6",
      "title": "graph 6",
      "valueField": "CDI",
      'bulletSize': 5,
      'hideBulletsCount': 50
    }
  ]
});


