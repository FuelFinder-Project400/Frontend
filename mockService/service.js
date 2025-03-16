const API_URL = 'http://192.168.0.17:3000/stations'; // Adjust if using a different base URL

// Function to fetch all fuel stations from the backend API
export const fetchFuelStations = async () => {
    try {
        const response = await fetch(API_URL);
        
        // Check if the response is OK (status 200-299)
        if (!response.ok) {
            throw new Error('Failed to fetch fuel stations');
        }

        // Parse the response data as JSON
        const data = await response.json();

        // Return the data (fuel stations)
        return data;
    } catch (error) {
        console.error('Error fetching fuel stations:', error);
        throw error; // Rethrow the error to be handled elsewhere
    }
};