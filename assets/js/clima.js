$(document).ready(function(){
    const apiKey ="c6701bddb4f395659f4d7a26615dbbac";

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(ubicacion =>{
            const lat = ubicacion.coords.latitude;
            const lon = ubicacion.coords.longitude;

            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            
            $.ajax({
                url: apiUrl,
                type: "GET",
                dataType:"json",
                success:function(data){
                    const temperatura = `${data.main.temp} °C`;
                    const lugar = data.name;
                    const humedad = `${data.main.humidity} %`;
                    const vViento = `${data.wind.speed} m/s`;
                    const icono = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

                    $("#lug").text(lugar);
                    $("#tem").text(temperatura);
                    $("#hum").text(humedad);
                    $("#vie").text(vViento);
                    $("#tiempoIcon").attr("src", icono);            
                },
                error:function(error){
                    console.error("Error al consumir la API: ",error);
                    alert("No se pudo obtener la información del clima")
                }
            });
        }, error => {
            console.error("Error al obtener la ubicación:", error);
            alert("No se pudo obtener la ubicación.");
        });
    } else {
        alert("Geolocalización no soportada en este navegador.");
    }
});