//-----------------------------
// Closure
(function(){

  /**
   * Decimal adjustment of a number.
   *
   * @param	{String}	type	The type of adjustment.
   * @param	{Number}	value	The number.
   * @param	{Integer}	exp		The exponent (the 10 logarithm of the adjustment base).
   * @returns	{Number}			The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }

})();
//-----------------------------
// https://stackoverflow.com/a/22468007/785985
Math.truncate = function(number, places) {
  var shift = Math.pow(10, places);

  return ((number * shift) | 0) / shift;
};

Number.prototype.truncate = function(digits) {
  var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
    m = this.toString().match(re);
  return m ? parseFloat(m[1]) : this.valueOf();
};
//-----------------------------

var chartData2 = [];
var cdi = 1;
var cdiPerformance = [];

// Build the CDI array
for (var i = 0; i < warrenFundPerformance.chart.label.length; i++) {
  var monthlyValue = _.findLast(cdiValueChanges, function(item) {
    return item.date <= warrenFundPerformance.chart.label[i];
  });
  // http://minhaseconomias.com.br/blog/investimentos/como-calcular-o-rendimento-de-seu-investimento-em-de-cdi
  // http://estatisticas.cetip.com.br/astec/di_documentos/metodologia2_i1.htm
  cdiPerformance.push(
    (1 + (Math.pow((monthlyValue.value/100+1), 1/252)-1) * 100/100).truncate(16)
    );
}

cdi = (Math.round10(cdiPerformance[0], -8));

for (var i = 0; i < warrenFundPerformance.chart.label.length; i++) {

  chartData2.push({
    date: warrenFundPerformance.chart.label[i],
    // +().toFixed() from https://stackoverflow.com/a/12830454/785985
    FWRF1: +(warrenFundPerformance.chart.data.FWRF1[i]*100),
    FWMM1: +(warrenFundPerformance.chart.data.FWMM1[i]*100),
    FWMM2: +(warrenFundPerformance.chart.data.FWMM2[i]*100),
    FWMM3: +(warrenFundPerformance.chart.data.FWMM3[i]*100),
    FWMM4: +(warrenFundPerformance.chart.data.FWMM4[i]*100),
    CDI: (cdi-1)*100
  });
  if (i < warrenFundPerformance.chart.label.length-1) {
    cdi *= (cdiPerformance[i + 1]).truncate(16);
    cdi = cdi.truncate(16);
  }
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
    "useGraphSettings": true,
    // data: [
    //   {title: 'RF 1'},
    //   {title: 'MM 1'},
    //   {title: 'MM 2'},
    //   {title: 'MM 3'},
    //   {title: 'MM 4'},
    //   {title: 'CDI'}
    // ]
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
      "title": "CDI",
      "valueField": "CDI",
      'bulletSize': 5,
      'hideBulletsCount': 50,
      lineColor: '#000000',
      precision: 8,
      lineThickness: 2
    }
  ]
});


