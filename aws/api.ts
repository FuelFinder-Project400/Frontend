import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Define the base URL for your API (adjust it accordingly)
const API_URL = process.env.EXPO_PUBLIC_API_URL; // Replace with your actual URL

// Post a new user
export const postUserFromStorage = async () => {
    try {
      // Fetch values from AsyncStorage
      const user_id = await AsyncStorage.getItem('userID');
      const fuelType = await AsyncStorage.getItem('fuelType');
      const searchRadius = await AsyncStorage.getItem('searchRadius');
      console.log(user_id, fuelType,searchRadius);
      // Check if all values are available
      if (!user_id || !fuelType || !searchRadius) {
        console.error('Missing required data from AsyncStorage');
        throw new Error('Missing required data from AsyncStorage');
      }
  
      // Create the JSON object for the API request
      const userData = {
        user_id,
        fuelType,
        searchRadius,
      };
  
      // Get the idToken from AsyncStorage for Authorization header
      const idToken = await AsyncStorage.getItem('idToken');
      if (!idToken) {
        console.error('No idToken found in AsyncStorage');
        throw new Error('No idToken found');
      }
  
      // Set the Authorization header
      const headers = {
        'Authorization': `Bearer ${idToken}`,
      };
  
      // Send the POST request to the API
      const response = await axios.post(`${API_URL}/user`, userData, { headers });
  
      if (response.status === 201) {
        console.log('User created successfully:', response.data);
        return true; // Return data or handle it as needed
      } else {
        console.error('Error creating user:', response.data.message);
        return false;
      }
    } catch (error) {
      console.error('Error posting user data:', error);
      throw new Error('Failed to post user data');
    }
  };

  // Get User Data and Store it Locally
  export const GetUserToStorage = async (userId: string) => {
    try {
      // Get the idToken from AsyncStorage for Authorization header
      const idToken = await AsyncStorage.getItem('idToken');
      if (!idToken) {
        console.error('No idToken found in AsyncStorage');
        throw new Error('No idToken found');
      }
  
      // Set the Authorization header
      const headers = {
        'Authorization': `Bearer ${idToken}`,
      };
  
      // Make the GET request to the API
      const response = await axios.get(`${API_URL}/user/${userId}`, {
        headers,
      });
  
      console.log('\n\n\nUser info:', response.data);
  
      // Store the fetched user data in AsyncStorage
      await AsyncStorage.setItem('xp', response.data.xp);
      await AsyncStorage.setItem('fuelType', response.data.fuelType);
      await AsyncStorage.setItem('searchRadius', response.data.searchRadius);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };