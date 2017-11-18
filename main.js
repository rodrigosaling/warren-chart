var cdi100Performance = [];
var cdi90Performance = [];
var cdi110Performance = [];
var cdi120Performance = [];
var cdi130Performance = [];
var warrenRF1Performance = [];
var warrenMM1Performance = [];
var warrenMM2Performance = [];
var warrenMM3Performance = [];
var warrenMM4Performance = [];

// Build the performance arrays
for (var i = 0; i < warrenFundPerformance.chart.label.length; i++) {
  var monthlyValue = _.findLast(cdiValueChanges, function(item) {
    return item.date <= warrenFundPerformance.chart.label[i];
  });
  // http://minhaseconomias.com.br/blog/investimentos/como-calcular-o-rendimento-de-seu-investimento-em-de-cdi
  // http://estatisticas.cetip.com.br/astec/di_documentos/metodologia2_i1.htm
  cdi100Performance.push(
    Decimal(100).div(100).times(
      Decimal(monthlyValue.value).div(100).plus(1).pow(Decimal(1).div(252)).minus(1).toDecimalPlaces(8)
    ).plus(1).toDecimalPlaces(16, Decimal.ROUND_DOWN).toString()
  );
  cdi90Performance.push(
    Decimal(90).div(100).times(
      Decimal(monthlyValue.value).div(100).plus(1).pow(Decimal(1).div(252)).minus(1).toDecimalPlaces(8)
    ).plus(1).toDecimalPlaces(16, Decimal.ROUND_DOWN).toString()
  );
  cdi110Performance.push(
    Decimal(110).div(100).times(
      Decimal(monthlyValue.value).div(100).plus(1).pow(Decimal(1).div(252)).minus(1).toDecimalPlaces(8)
    ).plus(1).toDecimalPlaces(16, Decimal.ROUND_DOWN).toString()
  );
  cdi120Performance.push(
    Decimal(120).div(100).times(
      Decimal(monthlyValue.value).div(100).plus(1).pow(Decimal(1).div(252)).minus(1).toDecimalPlaces(8)
    ).plus(1).toDecimalPlaces(16, Decimal.ROUND_DOWN).toString()
  );
  cdi130Performance.push(
    Decimal(130).div(100).times(
      Decimal(monthlyValue.value).div(100).plus(1).pow(Decimal(1).div(252)).minus(1).toDecimalPlaces(8)
    ).plus(1).toDecimalPlaces(16, Decimal.ROUND_DOWN).toString()
  );

  // Warren
  warrenRF1Performance.push(warrenFundPerformance.chart.data.FWRF1[i] - warrenFundPerformance.chart.data.FWRF1[i-1] || 0);
  warrenMM1Performance.push(warrenFundPerformance.chart.data.FWMM1[i] - warrenFundPerformance.chart.data.FWMM1[i-1] || 0);
  warrenMM2Performance.push(warrenFundPerformance.chart.data.FWMM2[i] - warrenFundPerformance.chart.data.FWMM2[i-1] || 0);
  warrenMM3Performance.push(warrenFundPerformance.chart.data.FWMM3[i] - warrenFundPerformance.chart.data.FWMM3[i-1] || 0);
  warrenMM4Performance.push(warrenFundPerformance.chart.data.FWMM4[i] - warrenFundPerformance.chart.data.FWMM4[i-1] || 0);
}

moment.locale('pt-br');
var chartStartDate = moment(warrenFundPerformance.chart.startDate);
var chartEndDate = moment(warrenFundPerformance.chart.endDate);

$('#startDate').attr({
  value: chartStartDate.format('YYYY-MM-DD'),
  min: chartStartDate.format('YYYY-MM-DD'),
  max: moment(chartEndDate).subtract(1, 'days').format('YYYY-MM-DD')
});
$('#endDate').attr({
  value: chartEndDate.format('YYYY-MM-DD'),
  min: moment(chartStartDate).add(1, 'days').format('YYYY-MM-DD'),
  max: chartEndDate.format('YYYY-MM-DD')
});

$('#chartStartDate').html(chartStartDate.format('D [de] MMMM [de] YYYY'));
$('#chartEndDate').html(chartEndDate.format('D [de] MMMM [de] YYYY'));
$('#updatedOn').html(chartEndDate.format('D [de] MMMM [de] YYYY'));

drawChart();

$('#chartDates').on('submit', function(event) {
  event.preventDefault();
  drawChart();
});


function drawChart() {
  var chartData = [];
  var cdi100 = 1;
  var cdi90 = 1;
  var cdi110 = 1;
  var cdi120 = 1;
  var cdi130 = 1;
  var warrenRF1 = 0;
  var warrenMM1 = 0;
  var warrenMM2 = 0;
  var warrenMM3 = 0;
  var warrenMM4 = 0;
  var startDate = document.getElementById('startDate').value;
  var endDate = document.getElementById('endDate').value;

  for (var i = 0; i < warrenFundPerformance.chart.label.length; i++) {

    if (warrenFundPerformance.chart.label[i] >= startDate && warrenFundPerformance.chart.label[i] <= endDate) {
      chartData.push({
        date: warrenFundPerformance.chart.label[i],
        FWRF1: +((warrenRF1) * 100),
        FWMM1: +((warrenMM1) * 100),
        FWMM2: +((warrenMM2) * 100),
        FWMM3: +((warrenMM3) * 100),
        FWMM4: +((warrenMM4) * 100),
        CDI100: Decimal(cdi100).minus(1).toDecimalPlaces(8).times(100).toNumber(),
        CDI90: Decimal(cdi90).minus(1).toDecimalPlaces(8).times(100).toNumber(),
        CDI110: Decimal(cdi110).minus(1).toDecimalPlaces(8).times(100).toNumber(),
        CDI120: Decimal(cdi120).minus(1).toDecimalPlaces(8).times(100).toNumber(),
        CDI130: Decimal(cdi130).minus(1).toDecimalPlaces(8).times(100).toNumber()
      });
      if (i < warrenFundPerformance.chart.label.length - 1) {
        cdi100 = Decimal(cdi100).times(cdi100Performance[i + 1]).toDecimalPlaces(16, Decimal.ROUND_DOWN);
        cdi90 = Decimal(cdi90).times(cdi90Performance[i + 1]).toDecimalPlaces(16, Decimal.ROUND_DOWN);
        cdi110 = Decimal(cdi110).times(cdi110Performance[i + 1]).toDecimalPlaces(16, Decimal.ROUND_DOWN);
        cdi120 = Decimal(cdi120).times(cdi120Performance[i + 1]).toDecimalPlaces(16, Decimal.ROUND_DOWN);
        cdi130 = Decimal(cdi130).times(cdi130Performance[i + 1]).toDecimalPlaces(16, Decimal.ROUND_DOWN);
      }
      warrenRF1 += warrenRF1Performance[i];
      warrenMM1 += warrenMM1Performance[i];
      warrenMM2 += warrenMM2Performance[i];
      warrenMM3 += warrenMM3Performance[i];
      warrenMM4 += warrenMM4Performance[i];
    }
  }



  var chart = AmCharts.makeChart( 'chartdiv', {
    type: 'serial',
    dataProvider: chartData,
    "categoryField": "date",
    "dataDateFormat": "YYYY-MM-DD",
    "chartScrollbar": {
      "enabled": true
    },
    'mouseWheelZoomEnabled':true,
    'chartCursor': {
      "enabled": true
    },
    "legend": {
      "enabled": true,
      "useGraphSettings": true
    },
    "graphs": [
      {
        "bullet": "round",
        "id": "AmGraph-1",
        "title": "RF1",
        "valueField": "FWRF1",
        'bulletSize': 5,
        'hideBulletsCount': 50,
        lineColor: '#ee2e5d',
        precision: 2,
        lineThickness: 2
      },
      {
        "bullet": "round",
        "id": "AmGraph-2",
        "title": "MM1",
        "valueField": "FWMM1",
        'bulletSize': 5,
        'hideBulletsCount': 50,
        lineColor: '#ff9001',
        precision: 2,
        lineThickness: 2
      },
      {
        "bullet": "round",
        "id": "AmGraph-3",
        "title": "MM2",
        "valueField": "FWMM2",
        'bulletSize': 5,
        'hideBulletsCount': 50,
        lineColor: '#00b563',
        precision: 2,
        lineThickness: 2
      },
      {
        "bullet": "round",
        "id": "AmGraph-4",
        "title": "MM3",
        "valueField": "FWMM3",
        'bulletSize': 5,
        'hideBulletsCount': 50,
        lineColor: '#0581ff',
        precision: 2,
        lineThickness: 2
      },
      {
        "bullet": "round",
        "id": "AmGraph-5",
        "title": "MM4",
        "valueField": "FWMM4",
        'bulletSize': 5,
        'hideBulletsCount': 50,
        lineColor: '#6960da',
        precision: 2,
        lineThickness: 2
      },
      {
        "bullet": "round",
        "id": "AmGraph-6",
        "title": "CDI 100%",
        "valueField": "CDI100",
        'bulletSize': 5,
        'hideBulletsCount': 50,
        lineColor: '#000000',
        precision: 2,
        lineThickness: 2
      },
      {
        "bullet": "round",
        "id": "AmGraph-7",
        "title": "CDI 90%",
        "valueField": "CDI90",
        'bulletSize': 3,
        'hideBulletsCount': 50,
        lineColor: '#999999',
        precision: 2,
        lineThickness: 1,
        hidden: true
      },
      {
        "bullet": "round",
        "id": "AmGraph-8",
        "title": "CDI 110%",
        "valueField": "CDI110",
        'bulletSize': 3,
        'hideBulletsCount': 50,
        lineColor: '#999999',
        precision: 2,
        lineThickness: 1,
        hidden: true
      },
      {
        "bullet": "round",
        "id": "AmGraph-9",
        "title": "CDI 120%",
        "valueField": "CDI120",
        'bulletSize': 3,
        'hideBulletsCount': 50,
        lineColor: '#999999',
        precision: 2,
        lineThickness: 1,
        hidden: true
      },
      {
        "bullet": "round",
        "id": "AmGraph-10",
        "title": "CDI 130%",
        "valueField": "CDI130",
        'bulletSize': 3,
        'hideBulletsCount': 50,
        lineColor: '#999999',
        precision: 2,
        lineThickness: 1,
        hidden: true
      }
    ]
  });
}
