import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Alert, Text, TouchableOpacity, Platform, Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Geocoder from 'react-native-geocoding';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FuelMapView({ stations }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [selectedStation, setSelectedStation] = useState(null);
  const mapRef = useRef(null);
  const router = useRouter();
  
  Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const rad = (x) => (x * Math.PI) / 180;
    const R = 6371; 
    const dLat = rad(lat2 - lat1);
    const dLon = rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; 
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    })();
  }, []);

  useEffect(() => {
    if (mapRef.current && stations.length > 0 && location) {
      const coordinates = [
        ...stations.map((s) => ({
          latitude: s.location.lat,
          longitude: s.location.lng,
        })),
        { latitude: location.latitude, longitude: location.longitude },
      ];
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [stations, location]);

  const handleMarkerPress = (station) => {
    setSelectedStation(station);
  };

  const handleMapPress = () => {
    if (selectedStation) {
      setSelectedStation(null);
    }
  };

  const getMarkerColor = (station) => {
    if (!location) return "gray"; 
    const distance = calculateDistance(
      location.latitude,
      location.longitude,
      station.location.lat,
      station.location.lng
    );
    const closestStation = stations.reduce((prev, curr) =>
      calculateDistance(location.latitude, location.longitude, prev.location.lat, prev.location.lng) <
      calculateDistance(location.latitude, location.longitude, curr.location.lat, curr.location.lng)
        ? prev
        : curr
    );
    const cheapestStation = stations.reduce((prev, curr) =>
      (prev.petrol < curr.petrol || prev.diesel < curr.diesel) ? prev : curr
    );
    if (station.id === closestStation.id) return "blue"; 
    if (station.id === cheapestStation.id) return "green"; 
    return "red"; 
  };

  if (errorMsg) {
    Alert.alert("Location Error", errorMsg);
  }


  const openMaps = (dirName, dirAddress) => {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${dirName},${dirAddress}`;
        const appleMapsUrl = `maps://?daddr=${dirName},${dirAddress}`;
        const url = Platform.OS === "ios" ? appleMapsUrl : googleMapsUrl;
    
        Linking.canOpenURL(url)
          .then((supported) => {
            if (supported) {
              Linking.openURL(url);
            } else {
              Alert.alert("Error", "Could not open maps.");
            }
          })
          .catch((err) => console.error("An error occurred", err));
    };



  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={location}
        showsUserLocation={true}
        onPress={handleMapPress}
      >
        {stations.map((station, index) => {
          const isSelected = selectedStation?.id === station.id;
          const markerColor = getMarkerColor(station);
          return (
            <Marker
              key={station.id || index}
              coordinate={{
                latitude: station.location.lat,
                longitude: station.location.lng,
              }}
              pinColor={isSelected ? "orange" : markerColor}
              onPress={() => handleMarkerPress(station)}
            >
              <MaterialCommunityIcons
                name="fuel"
                size={30}
                color={isSelected ? "orange" : markerColor}
                style={{ backgroundColor: '#FFF', padding: 5, borderRadius: 30 }}
              />
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.legend}>
        <Text style={styles.legendText}>
          <Text style={{ color: "green" }}>●</Text> Cheapest
        </Text>
        <Text style={styles.legendText}>
          <Text style={{ color: "blue" }}>●</Text> Closest
        </Text>
        <Text style={styles.legendText}>
          <Text style={{ color: "red" }}>●</Text> Other Stations
        </Text>
      </View>

      {selectedStation && (
        <View style={styles.selectedStationInfo}>
          <Text style={styles.stationTitle}>{selectedStation.station_name}</Text>
          <Text>{`Address: ${selectedStation.address}`}</Text>
          <Text>{`Petrol: ${selectedStation.petrol || "N/A"}`}</Text>
          <Text>{`Diesel: ${selectedStation.diesel || "N/A"}`}</Text>
          <TouchableOpacity
            style={styles.viewStationButton}
            onPress={() => router.push({
              pathname: '/station',
              params: {
                name: selectedStation.station_name,
                address: selectedStation.address,
                petrol: selectedStation.petrol,
                diesel: selectedStation.diesel,
                distance: selectedStation.distance,
                stars: selectedStation.stars,
                lastUpdated: selectedStation.lastUpdated,
                verifications: selectedStation.verifications,
              }
            })}
          >
            <Text style={styles.viewStationButtonText}>Go to Station Page</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewStationButton}
            onPress={() => openMaps(selectedStation.station_name, selectedStation.address)}
          >
            <Text style={styles.viewStationButtonText}>Directions</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  legend: {
    position: "absolute",
    bottom: 20,
    left: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 10,
  },
  legendText: {
    fontSize: 14,
    marginBottom: 5,
  },
  selectedStationInfo: {
    position: "absolute",
    bottom: 80,
    left: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 15,
    borderRadius: 10,
    width: 200,
  },
  stationTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  viewStationButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  viewStationButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});