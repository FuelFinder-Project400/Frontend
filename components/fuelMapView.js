import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Alert, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function FuelMapView({ stations }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);

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
          latitude: s.location.latitude,
          longitude: s.location.longitude,
        })),
        { latitude: location.latitude, longitude: location.longitude },
      ];
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [stations, location]);

  if (errorMsg) {
    Alert.alert("Location Error", errorMsg);
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
        >
          {stations?.map((station, index) => {
            if (station.location?.latitude && station.location?.longitude) {
              return (
                <Marker
                  key={station.id || index}
                  coordinate={{
                    latitude: station.location.latitude,
                    longitude: station.location.longitude,
                  }}
                  title={station.station_name || "Fuel Station"}
                  description={`Petrol: ${station.petrol || "N/A"} | Diesel: ${station.diesel || "N/A"}`}
                />
              );
            }
            return null;
          })}
        </MapView>
      ) : (
        <View style={styles.loading}>
          <Text>Loading map...</Text>
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
});
