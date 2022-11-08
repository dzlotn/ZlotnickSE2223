//Graph CSV data using chart.js

async function getData() {
    const response = await fetch('ResAccel.csv');
    const data = await response.text(); //CSV in TEXT format
    const table = data.split('\n').slice(1);  //split by line and cut 0th row
    const xTimes = []; //x-axis labels = time values 
    const yAccelVCT = []; //y-axis values = accel values
    const yAccelVS = [];
    const yAccelLN = [];
    const yAccelLVT= [];

    //console.log(table);
    table.forEach(row => {                //operate on each row
        const columns = row.split(','); //split each row into col.
        const time = columns[0];        //assign time val
        xTimes.push(time);              //push times value into  array xTimes

        const VCT = parseFloat(columns[1]);         
        yAccelVCT.push(VCT);              //push VCT values into array yAccelVCT

        const VS = parseFloat(columns[2]);      //Vinyl Sheet accel
        yAccelVS.push(VS)
        const LN = parseFloat(columns[3]);      //Linoleum accel,
        yAccelLN.push(LN)
        const LVT = parseFloat(columns[4]);      //LVT accel
        yAccelLVT.push(LVT)
    });
    return { xTimes, yAccelVCT, yAccelVS, yAccelLN, yAccelLVT };
}
async function createChart() {

    const data = await getData();                    //createchart() will wait until getData processesF 

    // Configured for chart.JS 3.x and above

    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'line',
        
        data: {
            labels: data.xTimes,
            datasets: [{
                label: 'Acceleration of Head on Impact with VCT in m/s²',
                data: data.yAccelVCT,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Acceleration of Head on Impact with Vinyl Sheet in m/s²',
                data: data.yAccelVS,
                backgroundColor: 'rgba(1, 99, 132, 0.2)',
                borderColor: 'rgba(1, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Acceleration of Head on Impact with Linoleum in m/s²',
                data: data.yAccelLN,
                backgroundColor: 'rgba(1, 200, 132, 0.2)',
                borderColor: 'rgba(1, 200, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Acceleration of Head on Impact with LVT in m/s²',
                data: data.yAccelLVT,
                backgroundColor: 'rgba(1, 18, 50, 0.2)',
                borderColor: 'rgba(1, 18, 50, 1)',
                borderWidth: 1
            }]
            


        },

        options: {
            responsive: true,                   // Re-size based on screen size
            scales: {                           // x & y axes display options
                x: {
                    title: {
                        display: true,
                        text: 'Time (ms)',
                        font: {
                            size: 20
                        },
                    },
                    ticks:{
                        callback:function(val,index){
                            return index % 5 === 0 ? this.getLabelForValue(val) : '';
                        },
                        font:{
                            size:16
                        }
                    }
                    
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Resultant Acceleration (m/s²)',
                        font: {
                            size: 20
                        },
                    },
                    ticks:{
                        maxTicksLimit: data.yAccelVCT.length/2,
                        font:{
                            size:12
                        },
                    }
                }
            },
            plugins: {                          // title and legend display options
                title: {
                    display: true,
                    text: 'Acceleration of an Anthroporphic Head over Impacts with Different Flooring Materials',
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    position: 'top'
                }
            }
        }
    });
}
createChart();


