// https://www.euqueroinvestir.com/cdi-certificado-de-deposito-interbancario/
var cdiValueChanges = [
  {date: '2016-10-13', value: 0}, // Everything starts at zero
  {date: '2016-10-14', value: 14.13},
  {date: '2016-10-20', value: 13.88},
  {date: '2016-12-01', value: 13.63},
  {date: '2017-01-12', value: 12.88},
  {date: '2017-02-23', value: 12.13},
  {date: '2017-04-13', value: 11.13},
  {date: '2017-06-01', value: 10.14},
  {date: '2017-07-27', value: 9.14},
  {date: '2017-09-08', value: 8.14}
];

// How to calculate CDI: (Math.pow((1+<monthly_value>/100), 1/252)-1)*100
