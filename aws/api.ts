import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cognito from '../aws/cognito';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Post a new user
export const postUserFromStorage = async () => {
    try {
      // Fetch values from AsyncStorage
      const user_id = await AsyncStorage.getItem('userID');
      const fuelType = await AsyncStorage.getItem('fuelType');
      const searchRadius = await AsyncStorage.getItem('searchRadius');
      const push_token = await AsyncStorage.getItem('push_token') || "";
      console.log(user_id, fuelType,searchRadius, push_token);
      // Check if all values are available
      if (!user_id || !fuelType || !searchRadius) {
        console.error('Missing required data from AsyncStorage');
      }
  
      // Create the JSON object for the API request
      const userData = {
        user_id,
        fuelType,
        searchRadius,
        push_token
      };
  
      // Get the idToken from AsyncStorage for Authorization header
      const idToken = await AsyncStorage.getItem('idToken');
      if (!idToken) {
        console.error('No idToken found in AsyncStorage');
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
      Cognito.tryAutoRefresh();
    }
  };

  // Get User Data and Store it Locally
  export const GetUserToStorage = async (userId: string) => {
    try {
      // Get the idToken from AsyncStorage for Authorization header
      const idToken = await AsyncStorage.getItem('idToken');
      if (!idToken) {
        console.error('No idToken found in AsyncStorage');
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
      const parsed = JSON.parse(response.data.favourite_stations);
      console.log(parsed);
      // Store the fetched user data in AsyncStorage
      await AsyncStorage.setItem('xp', `${response.data.xp}` || "0");
      await AsyncStorage.setItem('fuelType', response.data.fuelType);
      await AsyncStorage.setItem('searchRadius', response.data.searchRadius);
      await AsyncStorage.setItem('profilePic', response.data.profilePic);
      await AsyncStorage.setItem('favourite_stations', JSON.stringify(parsed));
      await AsyncStorage.setItem('push_token', response.data.push_token || "");
    } catch (error) {
      console.error('Error fetching user info:', error);
      Cognito.tryAutoRefresh();
    }
  };

  // Update User From Storage
export const UpdateUserFromStorage = async () => {
  try {
    // Fetch values from AsyncStorage
    const user_id = await AsyncStorage.getItem('userID');
    const fuelType = await AsyncStorage.getItem('fuelType');
    const searchRadius = await AsyncStorage.getItem('searchRadius');
    const xpString = await AsyncStorage.getItem('xp') || "0";
    const xp = parseInt(xpString, 10);
    const push_token = await AsyncStorage.getItem('push_token') || "";
    console.log(user_id, fuelType,searchRadius, xp);
    // Check if all values are available
    if (!user_id || !fuelType || !searchRadius || !xp) {
      console.error('Missing required data from AsyncStorage');
    }

    // Create the JSON object for the API request
    const userData = {
      fuelType,
      searchRadius,
      xp,
      push_token
    };

    // Get the idToken from AsyncStorage for Authorization header
    const idToken = await AsyncStorage.getItem('idToken');
    if (!idToken) {
      console.error('No idToken found in AsyncStorage');
    }

    // Set the Authorization header
    const headers = {
      'Authorization': `Bearer ${idToken}`,
    };

    // Send the PUT request to the API
    const response = await axios.put(`${API_URL}/user/${user_id}`, userData, { headers });

    if (response.status === 200) {
      console.log('User Updated successfully:', response.data);
      return true; // Return data or handle it as needed
    } else {
      console.error('Error updating user:', response.data.message);
      return false;
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    Cognito.tryAutoRefresh();
  }
};

// Upload Profile Pic
export const UploadProfilePic = async (image: string) => {
  try {
    // Fetch values from AsyncStorage
    const user_id = await AsyncStorage.getItem('userID');

    // Create the JSON object for the API request
    const userData = {
      image
    };

    // Get the idToken from AsyncStorage for Authorization header
    const idToken = await AsyncStorage.getItem('idToken');
    if (!idToken) {
      console.error('No idToken found in AsyncStorage');
    }

    // Set the Authorization header
    const headers = {
      'Authorization': `Bearer ${idToken}`,
    };

    // Send the POST request to the API
    const response = await axios.post(`${API_URL}/user/${user_id}/img`, userData, { headers });

    if (response.status === 200) {
      console.log('User created successfully:', response.data);
      await AsyncStorage.setItem('profilePic', response.data.imageUrl);
      return true; // Return data or handle it as needed
    } else {
      console.error('Error creating user:', response.data.message);
      return false;
    }
  } catch (error) {
    console.error('Error posting user data:', error);
    Cognito.tryAutoRefresh();
  }
};
// Post a new price
export const postPrice = async (petrolPrice:any, dieselPrice:any, station_id:string, station_name:string
) => {
  try {
    // Fetch values from AsyncStorage
    const user_id = await AsyncStorage.getItem('userID');
    
    if (!user_id || !petrolPrice || !dieselPrice || !station_id ||!station_name) {
      console.error('Missing required data');
    }

    // Create the JSON object for the API request
    const priceData = {
      user_id,
      petrolPrice,
      dieselPrice,
      station_id,
      station_name
    };

    // Get the idToken from AsyncStorage for Authorization header
    const idToken = await AsyncStorage.getItem('idToken');
    if (!idToken) {
      console.error('No idToken found in AsyncStorage');
    }

    // Set the Authorization header
    const headers = {
      'Authorization': `Bearer ${idToken}`,
    };

    // Send the POST request to the API
    const response = await axios.post(`${API_URL}/price`, priceData, { headers });

    if (response.status === 201) {
      console.log('User created successfully:', response.data);
      return true; // Return data or handle it as needed
    } else {
      console.error('Error creating user:', response.data.message);
      return false;
    }
  } catch (error) {
    console.error('Error posting user data:', error);
    Cognito.tryAutoRefresh();
  }
};
// Get User Data and Store it Locally
export const GetStationPrice = async (station_id: string) => {
  try {
    // Get the idToken from AsyncStorage for Authorization header
    const idToken = await AsyncStorage.getItem('idToken');
    if (!idToken) {
      console.error('No idToken found in AsyncStorage');
    }

    // Set the Authorization header
    const headers = {
      'Authorization': `Bearer ${idToken}`,
    };
    // Make the GET request to the API
    const response = await axios.get(`${API_URL}/station/${station_id}`, {
      headers,
    });

    if (response.status === 200){
      return response;
    }
    else{
      return null;
    }
  } catch (error) {
    Cognito.tryAutoRefresh();
  }
};

// Post a new report
export const postReport = async (petrolPrice:any, dieselPrice:any, station_id:string, user_id: string, reportReason: string
) => {
  try {
    console.log(user_id, petrolPrice, dieselPrice, reportReason, station_id);
    // Fetch values from AsyncStorage
    const reported_by = await AsyncStorage.getItem('userID');
    
    if (!user_id || !petrolPrice || !dieselPrice || !station_id || !reportReason) {
      console.error('Missing required data');
    }
    console.log('I made it here');
    // Create the JSON object for the API request
    const reportData = {
      user_id,
      petrolPrice,
      dieselPrice,
      station_id,
      reported_by,
      reportReason
    };
    console.log(reportData);
    // Get the idToken from AsyncStorage for Authorization header
    const idToken = await AsyncStorage.getItem('idToken');
    if (!idToken) {
      console.error('No idToken found in AsyncStorage');
    }

    // Set the Authorization header
    const headers = {
      'Authorization': `Bearer ${idToken}`,
    };

    // Send the POST request to the API
    const response = await axios.post(`${API_URL}/report`, reportData, { headers });

    if (response.status === 201) {
      console.log('Report created successfully:', response.data);
      return true; // Return data or handle it as needed
    } else {
      console.error('Error creating Report:', response.data.message);
      return false;
    }
  } catch (error) {
    console.error('Error posting report data:', error);
    Cognito.tryAutoRefresh();
  }
};

// Update User From Storage
export const updateFavouriteStationsToDB = async () => {
  try {
    // Fetch values from AsyncStorage
    const user_id = await AsyncStorage.getItem('userID');
    const favourite_stations = await AsyncStorage.getItem('favourite_stations');
    console.log(user_id, favourite_stations);
    // Check if all values are available
    if (!user_id || !favourite_stations) {
      console.error('Missing required data from AsyncStorage');
    }

    // Create the JSON object for the API request
    const userData = {
      favourite_stations
    };

    // Get the idToken from AsyncStorage for Authorization header
    const idToken = await AsyncStorage.getItem('idToken');
    if (!idToken) {
      console.error('No idToken found in AsyncStorage');
    }

    // Set the Authorization header
    const headers = {
      'Authorization': `Bearer ${idToken}`,
    };

    // Send the PUT request to the API
    const response = await axios.put(`${API_URL}/user/${user_id}`, userData, { headers });

    if (response.status === 200) {
      console.log('User Updated successfully:', response.data);
      return true; // Return data or handle it as needed
    } else {
      console.error('Error updating user:', response.data.message);
      return false;
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    Cognito.tryAutoRefresh();
  }
};

 // Get User Notifications
 export const GetUserNotifications = async () => {
  try {
    const userId = await AsyncStorage.getItem('userID');
    if(!userId){
      console.error('No User ID found in AsyncStorage');
    }
    // Get the idToken from AsyncStorage for Authorization header
    const idToken = await AsyncStorage.getItem('idToken');
    if (!idToken) {
      console.error('No idToken found in AsyncStorage');
    }

    // Set the Authorization header
    const headers = {
      'Authorization': `Bearer ${idToken}`,
    };

    // Make the GET request to the API
    const response = await axios.get(`${API_URL}/user/${userId}/notifications`, {
      headers,
    });

    if(response.status === 200){
        return response.data;
    }

  } catch (error) {
    Cognito.tryAutoRefresh();
  }
};
// Delete User Notifications
export const DeleteUserNotifications = async (notification_id:string) => {
  try {
    const userId = await AsyncStorage.getItem('userID');
    if(!userId){
      console.error('No User ID found in AsyncStorage');
    }
    // Get the idToken from AsyncStorage for Authorization header
    const idToken = await AsyncStorage.getItem('idToken');
    if (!idToken) {
      console.error('No idToken found in AsyncStorage');
    }

    // Set the Authorization header
    const headers = {
      'Authorization': `Bearer ${idToken}`,
    };

    // Make the DELETE request to the API
    const response = await axios.delete(`${API_URL}/notification/${notification_id}/${userId}`, {
      headers,
    });

    if(response.status === 200){
      console.log(response.data.message);  
      return true;
    }

  } catch (error) {
    Cognito.tryAutoRefresh();
  }
};
// Verify Price
export const VerifyPrice = async (station_id:string) => {
  try {
    const userId = await AsyncStorage.getItem('userID');
    if(!userId){
      console.error('No User ID found in AsyncStorage');
    }
    // Get the idToken from AsyncStorage for Authorization header
    const idToken = await AsyncStorage.getItem('idToken');
    if (!idToken) {
      console.error('No idToken found in AsyncStorage');
    }

    // Set the Authorization header
    const headers = {
      'Authorization': `Bearer ${idToken}`,
    };

    // Make the PUT request to the API
    const response = await axios.put(`${API_URL}/price/${station_id}/${userId}`, {}, {
      headers,
    });

    if(response.status === 200){
      console.log(response.data.message);  
      return true;
    }

  } catch (error) {
    console.log(error);
    Cognito.tryAutoRefresh();
    return false;
  }
};
 // Get Trends
 export const GetTrends = async () => {
  try {

    // Get the idToken from AsyncStorage for Authorization header
    const idToken = await AsyncStorage.getItem('idToken');
    if (!idToken) {
      console.error('No idToken found in AsyncStorage');
    }

    // Set the Authorization header
    const headers = {
      'Authorization': `Bearer ${idToken}`,
    };

    // Make the GET request to the API
    const response = await axios.get(`${API_URL}/trends`, {
      headers,
    });

    if(response.status === 200){
        return response.data;
    }

  } catch (error) {
    Cognito.tryAutoRefresh();
  }
};
// Delete User Account
export const DeleteAccount = async () => {
  try {
    const userId = await AsyncStorage.getItem('userID');
    if(!userId){
      console.error('No User ID found in AsyncStorage');
    }
    const email = await AsyncStorage.getItem('email');
    if(!userId){
      console.error('No Email found in AsyncStorage');
    }
    // Get the idToken from AsyncStorage for Authorization header
    const idToken = await AsyncStorage.getItem('idToken');
    if (!idToken) {
      console.error('No idToken found in AsyncStorage');
    }

    // Set the Authorization header
    const headers = {
      'Authorization': `Bearer ${idToken}`,
    };

    // Make the GET request to the API
    const response = await axios.delete(`${API_URL}/user/${userId}/${email}`, {
      headers,
    });

    if(response.status === 200){
        return response.data;
    }

  } catch (error) {
    Cognito.tryAutoRefresh();
  }
};