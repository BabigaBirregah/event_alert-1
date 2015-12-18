$(function() {

    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            period: '2010 Q1',
            commission: 2666,
            annonce: null,
            reservation: 2647
        }, {
            period: '2010 Q2',
            commission: 2778,
            annonce: 2294,
            reservation: 2441
        }, {
            period: '2010 Q3',
            commission: 4912,
            annonce: 1969,
            reservation: 2501
        }, {
            period: '2010 Q4',
            commission: 3767,
            annonce: 3597,
            reservation: 5689
        }, {
            period: '2011 Q1',
            commission: 6810,
            annonce: 1914,
            reservation: 2293
        }, {
            period: '2011 Q2',
            commission: 5670,
            annonce: 4293,
            reservation: 1881
        }, {
            period: '2011 Q3',
            commission: 4820,
            annonce: 3795,
            reservation: 1588
        }, {
            period: '2011 Q4',
            commission: 15073,
            annonce: 5967,
            reservation: 5175
        }, {
            period: '2012 Q1',
            commission: 10687,
            annonce: 4460,
            reservation: 2028
        }, {
            period: '2012 Q2',
            commission: 8432,
            annonce: 5713,
            reservation: 1791
        }],
        xkey: 'period',
        ykeys: ['commission', 'annonce', 'reservation'],
        labels: ['Commission', 'Annonce', 'Reservation'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Reservation",
            value: 12
        }, {
            label: "Annnonce",
            value: 30
        }, {
            label: "Commission",
            value: 20
        }],
        resize: true
    });

    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            y: 'Janvier 2015',
            a: 100,
            b: 90
        }, {
            y: 'Février 2015',
            a: 75,
            b: 65
        }, {
            y: 'Mars 2015',
            a: 50,
            b: 40
        }, {
            y: 'Avril 2015',
            a: 75,
            b: 65
        }, {
            y: 'Mai 2015',
            a: 50,
            b: 40
        }, {
            y: 'Juin 2015',
            a: 75,
            b: 65
        }, {
            y: 'Juillet 2015',
            a: 100,
            b: 90
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Commission', 'Annonce'],
        hideHover: 'auto',
        resize: true
    });

});
