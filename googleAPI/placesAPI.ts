import { useState, useEffect } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetStationPrice } from "@/aws/api";

// Define the type for Fuel Station
interface FuelStation {
  id: string;
  station_name: string;
  address: string;
  petrol: string;
  diesel: string;
  stars: string;
  distance: string;
  lastUpdated: string;
  verifications: number;
}

// Custom Hook to fetch fuel stations
export function useFuelStations() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null); // User location state
  const [searchRadius, setSearchRadius] = useState<number | null>(null); // Search radius
  const [stations, setStations] = useState<FuelStation[]>([]);  // State to store stations
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Fetch user's location and search radius
  useEffect(() => {
    const fetchLocationAndRadius = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);

      const radius = await AsyncStorage.getItem('searchRadius');
      if (radius) {
        setSearchRadius(parseInt(radius, 10));
      }
    };

    fetchLocationAndRadius();
  }, []);

  // Fetch stations from AsyncStorage or API when location and radius are set
  useEffect(() => {
    const fetchStations = async () => {
      if (!location || !location.coords) {
        setErrorMsg("Location data is not available.");
        return;
      }

      const storedStations = await AsyncStorage.getItem('stations');
      if (storedStations) {
        setStations(JSON.parse(storedStations)); // Use stored data if available
      } else {
        if (searchRadius) {
          const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
          const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=${searchRadius}000&type=gas_station&key=${apiKey}`;
          
          try {
            const response = await fetch(url);
            const data = await response.json();

            const searchedStations: FuelStation[] = await Promise.all(
              data.results.map(async (station: any) => {
                // Use place_id to get more detailed information (address)
                const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${station.place_id}&key=${apiKey}`;
                const placeDetailsResponse = await fetch(placeDetailsUrl);
                const placeDetailsData = await placeDetailsResponse.json();
                const placeDetails = placeDetailsData.result;

                const fullAddress = placeDetails.formatted_address || station.vicinity;
                const eircode = extractEircode(fullAddress);
                const address = eircode || fullAddress;
                
                const locationURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
                const locationRes = await fetch(locationURL);
                const locationData = await locationRes.json();
                const s_location = locationData.results[0].geometry.location;
                
                //Try and pull other information from API
                const info = await GetStationPrice(station.place_id);

                return {
                  id: station.place_id,
                  station_name: station.name,
                  address: address, // Use eircode if available, else use full address
                  petrol: info?.data.petrolPrice || "",
                  diesel: info?.data.dieselPrice || "",
                  stars: station.rating || "",
                  distance: calculateDistance(location.coords.latitude, location.coords.longitude, s_location.lat, s_location.lng),
                  lastUpdated: info?.data.reported_at || "",
                  verifications: info?.data.verifications || 0,
                  user_id: info?.data.user_id,
                  location: {
                    lat: s_location.lat,
                    lng: s_location.lng
                  },
                };
              })
            );

            setStations(searchedStations);
            await AsyncStorage.setItem('stations', JSON.stringify(searchedStations)); // Store the data
          } catch (error) {
            console.error('Error fetching fuel stations:', error);
          }
        }
      }
    };

    fetchStations();
  }, [location, searchRadius]);

  // Function to calculate distance between two points (Haversine formula)
  function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): string {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(1); // Rounded to one decimal place
  }

  const extractEircode = (address: string) => {

  const eircodeRegex = /\b[A-Za-z][0-9]{2}\s[A-Za-z0-9]{4}\b/;

  // Search for the regex in the address
  const index = address.search(eircodeRegex);

  if (index !== -1) {
    // Extract the Eircode using the index of the match
    const match = address.slice(index, index + 8);
    return match;  // Return the matched Eircode
  } else {
    return null;  // Return null if no match
  }
};

  const refreshStations = async () => {
    if (!location || !location.coords) {
      setErrorMsg("Location data is not available.");
      return;
    }

    if (searchRadius) {
      const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=${searchRadius}000&type=gas_station&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        const searchedStations: FuelStation[] = await Promise.all(
          data.results.map(async (station: any) => {
            // Use place_id to get more detailed information (address)
            const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${station.place_id}&key=${apiKey}`;
            const placeDetailsResponse = await fetch(placeDetailsUrl);
            const placeDetailsData = await placeDetailsResponse.json();
            const placeDetails = placeDetailsData.result;

            const fullAddress = placeDetails.formatted_address || station.vicinity;
            const eircode = extractEircode(fullAddress);
            const address = eircode || fullAddress;
            
            const locationURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
            const locationRes = await fetch(locationURL);
            const locationData = await locationRes.json();
            const s_location = locationData.results[0].geometry.location;
            
            //Try and pull other information from API
            const info = await GetStationPrice(station.place_id);
            return {
              id: station.place_id,
              station_name: station.name,
              address: address, // Use eircode if available, else use full address
              petrol: info?.data.petrolPrice || "",
              diesel: info?.data.dieselPrice || "",
              stars: station.rating || "",
              distance: calculateDistance(location.coords.latitude, location.coords.longitude, s_location.lat, s_location.lng),
              lastUpdated: info?.data.reported_at || "",
              verifications: info?.data.verifications || 0,
              user_id: info?.data.user_id,
              location: {
                lat: s_location.lat,
                lng: s_location.lng
              },
            };
          })
        );

        setStations(searchedStations);
        await AsyncStorage.setItem('stations', JSON.stringify(searchedStations)); // Store the updated data
      } catch (error) {
        console.error('Error fetching fuel stations:', error);
      }
    }
  };

  return { stations, errorMsg, refreshStations };
}
