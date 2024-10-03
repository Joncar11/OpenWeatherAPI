// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Add an event listener to the weather form for the submit event
    document.getElementById('weatherForm').addEventListener('submit', async function(event) {
        // Prevent the default form submission behavior
        event.preventDefault(); 

        // Get the value of the city input field
        const city = document.getElementById('city').value;
        
        // API key for accessing OpenWeather API (placeholder, replace with your own)
        const apiKey = ''; // Replace with your OpenWeather API key
        
        // Div element where the weather data will be displayed
        const weatherDataDiv = document.getElementById('weatherData');
        
        try {
            // Fetch weather data from OpenWeather API
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);
            
            // Check if the response is ok (status in the range 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            // Parse the JSON data from the response
            const data = await response.json();

            // Clear any previous weather data displayed
            weatherDataDiv.innerHTML = '';

            // Check for a 404 error (city not found)
            if (data.cod === '404') {
                weatherDataDiv.innerHTML = `<p>City not found.</p>`;
                return;
            }

            // Display the current temperature and city information
            weatherDataDiv.innerHTML = `
                <h2>Current Temperature in ${data.name}, ${data.sys.country}</h2>
                <p>${data.main.temp} °F</p>
            `;
        } catch (error) {
            // Log any errors to the console
            console.error('Fetch error:', error);
            // Display an error message in the weather data div
            weatherDataDiv.innerHTML = `<p>There was an error fetching the weather data.</p>`;
        }
    });
});

       