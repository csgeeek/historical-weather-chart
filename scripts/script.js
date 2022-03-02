const prepY = async (latv, lonv) => {
    const ydata = [];
    const APPID = config.SECRET_API_KEY;    
    if(myChart != undefined){
        myChart.destroy();
    }
    for(let i = 1; i <= 12; i++){
        let URL = `https://history.openweathermap.org/data/2.5/aggregated/month?month=${i}&lat=${latv}&lon=${lonv}&appid=${APPID}`;
        const res = await fetch(URL);
        const data = await res.json();
        const temp = await data["result"]["temp"]["median"];
        ydata.push(parseFloat(temp) - 273);
    }
    return ydata;
}

const myform = document.querySelector('#myform');

myform.addEventListener('submit',async (e) => {
    e.preventDefault();
    console.log('Clicked');
    document.querySelector('.message').innerHTML = '<p id="test">Wait for 15 seconds</p>';
    const lat = document.querySelector('#lat');
    const lon = document.querySelector('#lon');
    const latv = lat.value;
    const lonv = lon.value;
    if((latv >= -90 && latv <= 90) && (lonv >= -180 && lonv <= 180)) {   
        const ydata = await prepY(latv, lonv);
        await chartIt(ydata);
        document.querySelector('#test').remove();
        scrollTo(0, 1000);
    }
});


const xlabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let myChart;

const ctx = document.getElementById('chart').getContext('2d');
const chartIt = async (ydata) => {
    myChart = await new Chart(ctx, {
        type: 'line',
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
                beginAtZero: false,
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        return value + '°C';
                    }
                }
              }
            }
          },
    });
}
