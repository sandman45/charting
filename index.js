
const data1 = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    series: [
        [5, 2, 4, 2, 0]
    ]
};

const options1 = {
    low: 0,
    showArea: true,
};

const data2 = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    series: [
        [2, 3, 1, 5, 6]
    ]
};

const options2 = {
    low: 0,
};


const data3 = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    series: [
        [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
        [4,  5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
        [5,  3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
        [3,  4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3]
    ]
};

const options3 = {
    low: 0,
};

new Chartist.Line('#chart1', data1, options1);

new Chartist.Line('#chart2', data2, options2);

const chart3 = new Chartist.Line('#chart3', data3, options3);

// animation
let seq = 0;
let delays = 80;
let durations = 500;

chart3.on('created', () => {
   seq = 0;
});

chart3.on('draw', (data) => {
    seq++;

    if(data.type === 'line') {
        data.element.animate({
            opacity: {
                begin: seq * delays + 1000,
                dur: durations,
                from: 0,
                to: 1,
            }
        });
    } else if(data.type === 'label' && data.axis === 'x') {
        data.element.animate({
            y: {
                begin: seq * delays,
                dur: durations,
                from: data.y + 100,
                to: data.y,
                // We can specify an easing function from Chartist.Svg.Easing
                easing: 'easeOutQuart'
            }
        });
    } else if(data.type === 'label' && data.axis === 'y') {
        data.element.animate({
            x: {
                begin: seq * delays,
                dur: durations,
                from: data.x - 100,
                to: data.x,
                easing: 'easeOutQuart'
            }
        });
    } else if(data.type === 'point') {
        data.element.animate({
            x1: {
                begin: seq * delays,
                dur: durations,
                from: data.x - 10,
                to: data.x,
                easing: 'easeOutQuart'
            },
            x2: {
                begin: seq * delays,
                dur: durations,
                from: data.x - 10,
                to: data.x,
                easing: 'easeOutQuart'
            },
            opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'easeOutQuart'
            }
        });
    } else if(data.type === 'grid') {
        // Using data.axis we get x or y which we can use to construct our animation definition objects
        const pos1Animation = {
            begin: seq * delays,
            dur: durations,
            from: data[data.axis.units.pos + '1'] - 30,
            to: data[data.axis.units.pos + '1'],
            easing: 'easeOutQuart'
        };

        const pos2Animation = {
            begin: seq * delays,
            dur: durations,
            from: data[data.axis.units.pos + '2'] - 100,
            to: data[data.axis.units.pos + '2'],
            easing: 'easeOutQuart'
        };

        const animations = {};
        animations[data.axis.units.pos + '1'] = pos1Animation;
        animations[data.axis.units.pos + '2'] = pos2Animation;
        animations['opacity'] = {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'easeOutQuart'
        };

        data.element.animate(animations);
    }
});

chart3.on('created', function() {
    if(window.__exampleAnimateTimeout) {
        clearTimeout(window.__exampleAnimateTimeout);
        window.__exampleAnimateTimeout = null;
    }
    window.__exampleAnimateTimeout = setTimeout(chart3.update.bind(chart3), 12000);
});