
const data1 = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    series: [
        [5, 2, 4, 2, 0]
    ]
};

const data2 = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    series: [
        [2, 3, 1, 5, 6]
    ]
};

const data3= {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    series: [
        [1, 6, 4, 5, 3]
    ]
};

new Chartist.Line('#chart1', data1);

new Chartist.Line('#chart2', data2);

new Chartist.Line('#chart3', data3);