const myform = document.querySelector('#myform');

const prepY = async (latv, lonv) => {
    const ydata = [];
    const APPID = config.SECRET_API_KEY;    
        // api.openweathermap.org/data/2.5/weather?lat=34&lon=35&appid=7c09a72a41d8ffdfba52c2614e152903
        // https://history.openweathermap.org/data/2.5/aggregated/year?lat=35&lon=139&appid=4ba8b09cf4e53728e05a7b348f31fdeb
        // 
        // const URL = `https://history.openweathermap.org/data/2.5/aggregated/year?lat=${latv}&lon=${lonv}&appid=${APPID}`;
        
        // console.log(lat.value);
        // console.log(lon.value);
        
        for(let i = 1; i <= 12; i++){
            let URL = `https://history.openweathermap.org/data/2.5/aggregated/month?month=${i}&lat=${latv}&lon=${lonv}&appid=${APPID}`;
            const res = await fetch(URL);
            const data = await res.json();
            const temp = await data["result"]["temp"]["record_max"];
            ydata.push(parseFloat(temp) - 273);
        }
    return ydata;
}

// let myychart;
myform.addEventListener('submit',async (e) => {
    e.preventDefault();
    console.log('Clicked');
    // document.querySelector(".chart-container").innerHTML = '<canvas id="chart"></canvas>';
    const lat = document.querySelector('#lat');
    const lon = document.querySelector('#lon');
    const latv = lat.value;
    const lonv = lon.value;
    if((latv >= -90 && latv <= 90) && (lonv >= -180 && lonv <= 180)) {   
        const ydata = await prepY(latv, lonv);
        await chartIt(ydata);
        // destroyChart();
        // console.log(ydata2);
    }
});

// console.log(ydata2);
// btn.addEventListener('click', (e) => {
//     e.preventDefault();
//     console.log('e.value');
// });

const xlabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// const temperatures = async () => {
//     const res = await fetch('/dataset.csv');
//     const data = await res.text();

//     const table = data.split('\n');
//     // console.log(table);
//     table.forEach( row => {
//         const col = row.split(',');
//         const year = col[0];
//         xlabels.push(year);
//         const temperature = col[1];
//         ydata.push(parseFloat(temperature) + 14);
//         // console.log(year, temperature);
//     })
// }



const ctx = document.getElementById('chart').getContext('2d');
const chartIt = async (ydata) => {
    // await temperatures();
    if(window.myChart != undefined)
        window.myChart.destroy();
    const myChart = await new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xlabels,
            datasets: [{
                label: 'Global Temperatures',
                data: ydata,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                fill: true,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
              y: {
                beginAtZero: false
              }
            }
          },
    });

    // return myChart;
    // myChart.destroy();
    // document.querySelector("#chart-container").innerHTML = '<canvas id="chart"></canvas>';
}
// temperatures();
// chartIt();