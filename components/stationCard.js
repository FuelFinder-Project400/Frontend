import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Platform, Modal,TextInput, TouchableWithoutFeedback, Keyboard, ActivityIndicator} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Heading from './headings';
import { router } from 'expo-router';
import { postPrice, postReport, UpdateUserFromStorage } from '@/aws/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateFavouriteStationsToDB, VerifyPrice} from '@/aws/api';
import { sendThankYouNotification, sendReportSentNotification } from '@/notifications/notification-templates';
const StationCard = ({ id }) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [isAddPriceModalVisible, setAddPriceModalVisible] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [pError, setPError] = useState("");
    const [dError, setDError] = useState("");
    const [favouriteStations, setFavouriteStations] = useState([]);
    const [isFavorited, setIsFavorited] = useState(false);
    const [petrolPrice, setPetrolPrice] = useState('');
    const [dieselPrice, setDieselPrice] = useState('');
    const [station, setStation] = useState(null);
    const [hasVerified, setHasVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [petrolPriceChanged, setPetrolPriceChanged] = useState(false);
    const [dieselPriceChanged, setDieselPriceChanged] = useState(false);
    const fetchStationFromStorage = async () => {
        try {
            const stored = await AsyncStorage.getItem('stations');
            const userID = await AsyncStorage.getItem('userID'); // retrieve userID
    
            if (stored) {
                const stations = JSON.parse(stored);
                const match = stations.find(s => s.id === id);
                setStation(match || null);
    
                if (match) {
                    setPetrolPrice(match.petrol);
                    setDieselPrice(match.diesel);
                    setIsVerified(match.verifications >= 5);
    
                    const hasUserVerified = match.users_who_verified?.includes(userID);
                    setHasVerified(Boolean(hasUserVerified));
                } else {
                    setHasVerified(false); // fallback
                }
            }
        } catch (err) {
            console.error('Failed to load station:', err);
        }
    };

    useEffect(() => {
        fetchStationFromStorage();  // Fetch the station details
        const getFavouriteStations = async () => {
            try {
                const storedFavourites = await AsyncStorage.getItem('favourite_stations');
                const parsedFavourites = storedFavourites ? JSON.parse(storedFavourites) : [];
                setFavouriteStations(parsedFavourites);
                setIsFavorited(parsedFavourites.some(station => station.station_id === id));
            } catch (error) {
                console.error('Error loading favourites:', error);
            }
        };
        getFavouriteStations();  // Fetch favourite stations
    }, [id]);

    if (!station) {
        return;
    }

    const toggleFavorite = async () => {
    try {
        let updatedFavourites = [...favouriteStations];

        const fav_station = { station_id: id, station_name: station.station_name };

        const isFavorited = updatedFavourites.some(
        (station) => station.station_id === id
        );

        if (isFavorited) {
        updatedFavourites = updatedFavourites.filter(
            (station) => station.station_id !== id
        );
        } else {
        updatedFavourites.push(fav_station);
        }

        await AsyncStorage.setItem('favourite_stations', JSON.stringify(updatedFavourites));

        setFavouriteStations(updatedFavourites);
        setIsFavorited(!isFavorited);

        updateFavouriteStationsToDB();
        
        console.log("Done");
    } catch (error) {
        console.error('Error updating favourites:', error);
    }
    };

    function getLastUpdated(lastUpdated) {
        const now = new Date();
        const updatedDate = new Date(lastUpdated);
        const diffInSeconds = Math.floor((now - updatedDate) / 1000);
        
        if (isNaN(diffInSeconds)) return "N/A";
        if (diffInSeconds < 60) return "just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hrs ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
        if (diffInSeconds < 2419200) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
        if (diffInSeconds < 29030400) return `${Math.floor(diffInSeconds / 2419200)} months ago`;
        return `${Math.floor(diffInSeconds / 29030400)} years ago`;
    }


    const openMaps = () => {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.station_name},${station.address}`;
        const appleMapsUrl = `maps://?daddr=${station.station_name}`;
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
    
    const handleReport = async (reason) => {
        setIsLoading(true);
        const addReport = await postReport(petrolPrice, dieselPrice, station.id, station.user_id, reason);
        if(addReport){
            let xp = parseInt(await AsyncStorage.getItem('xp'));
            let newXP = xp + 100;
            await AsyncStorage.setItem('xp', `${newXP}`);
            await UpdateUserFromStorage();
            await sendReportSentNotification();
            setModalVisible(false);
            setIsLoading(false);
            setAddPriceModalVisible(true);
        }
    };
    
    const handlePriceChange = async () => {
        if(petrolPrice == "" || !petrolPriceChanged){
            setPError('Petrol price cannot be empty');
        }
        else if(dieselPrice == "" || !dieselPriceChanged){
            setDError('Diesel price cannot be empty');
        }
        else{
            try {
                setIsLoading(true);
            const addPrice = await postPrice(petrolPrice, dieselPrice, station.id, station.station_name);
            
            if (addPrice) {
                const storedStations = await AsyncStorage.getItem('stations');
                let stationList = storedStations ? JSON.parse(storedStations) : [];
                let user_id = await AsyncStorage.getItem('userID');
                let id = station.id;
                const updatedStationList = stationList.map(station => {
                if (station.id === id) {
                    return {
                    ...station,
                    petrol: petrolPrice,
                    diesel: dieselPrice,
                    lastUpdated: new Date().toISOString(),
                    verifications: 1,
                    user_id: user_id,
                    };
                }
                return station;
                });
                await AsyncStorage.setItem('stations', JSON.stringify(updatedStationList));
            
                setStation(updatedStationList);
                let xp = parseInt(await AsyncStorage.getItem('xp'));
                let newXP = xp + 100;
                await AsyncStorage.setItem('xp', `${newXP}`);
                await UpdateUserFromStorage();
                await sendThankYouNotification();
                setIsLoading(false);
                setAddPriceModalVisible(false);
                router.replace({
                    pathname: '/station',
                    params: {
                    id: id
                    },
                });
            }
            } catch (error) {
            console.error("Error in handlePriceChange:", error);
            Alert.alert('Error Occured','Please Try Again');
            setAddPriceModalVisible(false);
            }
        }
      };
    const handlePetrolChange = (text) => {
        if (text === "") {
          setPError("Petrol price cannot be empty");
        } else {
          setPError("");
          setPetrolPriceChanged(true);
        }
        setPetrolPrice(text);
      };
      
      const handleDieselChange = (text) => {
        if (text === "") {
          setDError("Diesel price cannot be empty");
        } else {
          setDError("");
          setDieselPriceChanged(true);
        }
        setDieselPrice(text);
      };
      const handleVerify = async () => {
        try {
          const userID = await AsyncStorage.getItem('userID');
          if (!userID) {
            console.warn("No user ID found in storage.");
            return;
          }
      
            const verify = await VerifyPrice(id);
            setHasVerified(true);
            const stored = await AsyncStorage.getItem('stations');
            let stationList = stored ? JSON.parse(stored) : [];
      
            const updatedStationList = stationList.map(station => {
              if (station.id === id) {
                const updatedUsers = Array.isArray(station.users_who_verified)
                  ? [...new Set([...station.users_who_verified, userID])]
                  : [userID];
      
                return {
                  ...station,
                  users_who_verified: updatedUsers,
                };
              }
              return station;
            });
      
            await AsyncStorage.setItem('stations', JSON.stringify(updatedStationList));
           
        } catch (err) {
          console.error('Failed to verify station:', err);
        }
      };
      const handlePriceModalClose = () => {
        if (petrolPrice == "" || dieselPrice == ""){
            router.replace({
                pathname: '/station',
                params: {
                id: id
                },
            });
        }
        setAddPriceModalVisible(false);
      }
    return (
        <View style={[styles.container, isFavorited && styles.favoritedContainer]}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity onPress={() => router.replace('./findfuel')}>
                    <MaterialCommunityIcons name="arrow-left-circle" size={40} color={"#000"} style={{marginVertical: 10, marginTop: -5, marginLeft: -8}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleFavorite} style={{ marginTop: '-7.5%', marginRight: '-2.6%'}}>
                        <MaterialCommunityIcons 
                            name={isFavorited ? "bookmark" : "bookmark-outline"}
                            size={48}
                            color={isFavorited ? "#ffac36" : "#00000"}
                        />
                </TouchableOpacity>
            </View>
            
            <View style={styles.container2}>
                <View>
                    <View style={styles.stationDetails}>
                        <View style={styles.stationDetailsText}>
                            <Heading level={4} style={{ color: '#000' }}>
                                {station.station_name}
                            </Heading>
                        </View>
                    </View>

                    <View style={styles.starsContainer}>
                        {Array.from({ length: station.stars }).map((_, index) => (
                            <MaterialCommunityIcons key={index} name="star" size={20} color="#ffac36" style={styles.starIcon} />
                        ))}
                    </View>

                    <View style={{flexDirection: 'row', marginVertical: 10,}}>
                        <View style={styles.priceContainer}>
                            <Heading level={2} style={styles.priceHeading}>Petrol</Heading>
                            <Heading level={3} style={styles.priceText}>€{petrolPrice || " N/A"}</Heading>
                        </View>
                        <View style={styles.priceContainer}>
                            <Heading level={2} style={styles.priceHeading}>Diesel</Heading>
                            <Heading level={3} style={styles.priceText}>€{dieselPrice || " N/A"}</Heading>
                        </View>
                    </View>

                    <View style={styles.verificationContainer}>
                        <MaterialCommunityIcons name="check-circle" size={20} color={isVerified ? "#6dcf69" : "#888"} />
                        <Text style={styles.verificationText}>{station.verifications} verifications</Text>
                    </View>
                    
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#878383', fontWeight: 'bold' }}>Last Updated: {getLastUpdated(station.lastUpdated)}</Text>
                    </View>
                </View>

                <View style={styles.distanceContainer}>
                    <Heading level={3} style={styles.distanceText}>{station.distance}km</Heading>
                </View>
            </View>

            <View>
                <View style={styles.options}>
                    <TouchableOpacity style={styles.iconButton}  onPress={() => setAddPriceModalVisible(true)}>
                        <MaterialCommunityIcons name="plus-circle-outline" size={40} color="#36CB3B" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton} onPress={() => openMaps()}>
                        <MaterialCommunityIcons name="compass-outline" size={40} color="#59B5DC" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
                        <MaterialCommunityIcons name="flag-outline" size={40} color="red" />
                    </TouchableOpacity>
                </View>
                {(station.petrol !== "" && station.diesel !== "" && hasVerified == false) && (
                    <View style={styles.likeButtonContainer}>
                        <TouchableOpacity style={styles.likeButton} onPress={handleVerify}>
                            <MaterialCommunityIcons name="thumb-up-outline" size={40} color="#6dcf69" />
                            <Text style={{ marginLeft: 10 }}>Is the price correct?</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <Modal visible={isModalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Report an Issue</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleReport("Price to high")} disabled={isLoading}>
                            <Text style={styles.modalButtonText}>Price (To High)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleReport("Price to low")} disabled={isLoading}>
                            <Text style={styles.modalButtonText}>Price (To Low)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCancelText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal visible={isAddPriceModalVisible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Heading level={3} style={{ color: '#000', marginLeft: 10 }}>Add Price</Heading>
                        
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                            <Text style={styles.label}>Enter Petrol Price (€):</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. 160.20"
                                keyboardType="numeric"
                                inputMode="decimal"
                                maxLength={5}
                                contextMenuHidden={true}
                                onChangeText={handlePetrolChange}
                            />
                        </View>
                        {pError ? <Text style={styles.errorText}>{pError}</Text> : null}

                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                            <Text style={styles.label}>Enter Diesel Price (€):</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. 160.20"
                                keyboardType="numeric"
                                inputMode="decimal"
                                maxLength={5}
                                contextMenuHidden={true}
                                onChangeText={handleDieselChange}
                            />
                        </View>
                        {dError ? <Text style={styles.errorText}>{dError}</Text> : null}
                        <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={styles.modalAddPrice}
                            onPress={handlePriceChange}
                            disabled={isLoading}  // Disable button while loading
                        >
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#fff" />  // Show spinner while loading
                            ) : (
                                <Text style={styles.modalCancelText}>Add Price</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalCancel}
                            onPress={handlePriceModalClose}
                        >
                            <Text style={styles.modalCancelText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                    </View>
            </TouchableWithoutFeedback>
        </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 10,
        borderWidth: 4,
        borderColor: '#000000', // Default border color
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    favoritedContainer: {
        borderColor: '#ffac36', // Border color when favorited
    },
    container2: {
        flexDirection: 'row',
    },
    stationDetails: {
        flexDirection: 'row',
    },
    starsContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    stationDetailsText: {
        maxWidth: 200,
    },

    priceHeading: {
        color: '#000',
        marginRight: 15,
    },
    priceText: {
        color: '#000',
        marginRight: 15,
    },
    verificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    verificationText: {
        color: '#888',
        fontSize: 14,
        marginLeft: 5,
    },
    distanceContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    distanceText: {
        color: '#000',
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20, 
    },
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 40,
        backgroundColor: '#D9D9D9',
        margin: 10, 
    },
    likeButtonContainer: {
        marginTop: 45,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    likeButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 40,
        backgroundColor: '#D9D9E990',
        margin: 10, 
    },
    modalContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: { 
        backgroundColor: 'white', 
        padding: 20, 
        borderRadius: 10, 
        width: '80%', 
        alignItems: 'center' 
    },
    modalTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 10 
    },
    modalButton: { 
        padding: 10, 
        marginVertical: 5, 
        backgroundColor: '#f0f0f0', 
        width: '100%', 
        alignItems: 'center', 
        borderRadius: 5 
    },
    modalButtonText: { 
        fontSize: 16 
    },
    modalCancel: { 
        margin: 10,
        paddingHorizontal: 40,
        paddingVertical: 20,
        backgroundColor: "#e04a4a",
        borderRadius: 30,
        alignItems: "center",
    },
    modalAddPrice: { 
        margin: 10,
        paddingHorizontal: 40,
        paddingVertical: 20,
        backgroundColor: "#36CB3B",
        borderRadius: 30,
        alignItems: "center",
    },
    modalCancelText: { 
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        marginRight: 5,
      },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: "#fff",
        minWidth: 80,
        maxWidth: 80,
    },
    errorText: {
        color: "red",
        marginHorizontal: 10,
      },
});

export default StationCard;
