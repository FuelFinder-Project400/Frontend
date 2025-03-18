import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Platform, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Heading from './headings';

const StationCard = ({ name, address, petrol, diesel, distance, stars, lastUpdated, verifications }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    function getLastUpdated(lastUpdated) {
        const now = new Date();
        const updatedDate = new Date(lastUpdated);
        const diffInSeconds = Math.floor((now - updatedDate) / 1000);

        if (diffInSeconds < 60) return "just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hrs ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
        if (diffInSeconds < 2419200) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
        if (diffInSeconds < 29030400) return `${Math.floor(diffInSeconds / 2419200)} months ago`;
        return `${Math.floor(diffInSeconds / 29030400)} years ago`;
    }

    const isVerified = verifications >= 5;

    const openMaps = () => {
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${name},${address}`;
        const appleMapsUrl = `maps://?daddr=${name},${address}`;
    
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
    
    const handleReport = (reason) => {
        Alert.alert("Report Submitted", `You reported: ${reason}`);
        setModalVisible(false);
    };
    return (
        <View style={[styles.container, isFavorited && styles.favoritedContainer]}>
            <View style={styles.container2}>
                <View>
                    <View style={styles.stationDetails}>
                        <View style={styles.stationDetailsText}>
                            <Heading level={4} style={{ color: '#000' }}>
                                {name}
                            </Heading>
                        </View>
                    </View>

                    <View style={styles.starsContainer}>
                        {Array.from({ length: stars }).map((_, index) => (
                            <MaterialCommunityIcons key={index} name="star" size={20} color="#FFD700" style={styles.starIcon} />
                        ))}
                    </View>

                    <View>
                        <View style={styles.priceHeadingContainer}>
                            <Heading level={2} style={styles.priceHeading}>Petrol</Heading>
                            <Heading level={2} style={styles.priceHeading}>Diesel</Heading>
                        </View>
                        <View style={styles.pricePricesContainer}>
                            <Heading level={3} style={styles.priceText}>€{petrol}</Heading>
                            <Heading level={3} style={styles.priceText}>€{diesel}</Heading>
                        </View>
                    </View>

                    <View style={styles.verificationContainer}>
                        <MaterialCommunityIcons name="check-circle" size={20} color={isVerified ? "#007bff" : "#888"} />
                        <Text style={styles.verificationText}>{verifications} verifications</Text>
                    </View>
                    
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: '#878383', fontWeight: 'bold' }}>Last Updated: {getLastUpdated(lastUpdated)}</Text>
                    </View>
                </View>

                <View style={styles.distanceContainer}>
                    <Heading level={3} style={styles.distanceText}>{distance}km</Heading>
                </View>
            </View>

            <View>
                <View style={styles.options}>
                    <TouchableOpacity style={styles.iconButton}>
                        <MaterialCommunityIcons name="plus-circle-outline" size={40} color="#36CB3B" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton} onPress={() => openMaps()}>
                        <MaterialCommunityIcons name="compass-outline" size={40} color="#59B5DC" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton} onPress={() => setModalVisible(true)}>
                        <MaterialCommunityIcons name="flag-outline" size={40} color="red" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton} onPress={toggleFavorite}>
                        <MaterialCommunityIcons 
                            name={isFavorited ? "star" : "star-outline"} 
                            size={40} 
                            color="yellow" 
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.likeButtonContainer}>
                    <TouchableOpacity style={styles.likeButton}>
                        <MaterialCommunityIcons name="thumb-up-outline" size={40} color="#59B5DC" />
                        <Text style={{ marginLeft: 10 }}>Is the price correct?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal visible={isModalVisible} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Report an Issue</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleReport("Wrong Price")}>
                            <Text style={styles.modalButtonText}>Wrong Price</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={() => handleReport("Station Closed")}>
                            <Text style={styles.modalButtonText}>Station Closed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCancelText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        borderWidth: 2,
        borderColor: 'transparent', // Default border color
    },
    favoritedContainer: {
        borderColor: 'yellow', // Border color when favorited
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
    priceHeadingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: '55%',
        marginTop: 15,
    },
    pricePricesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: '55%',
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
        marginTop: 10,
        paddingHorizontal: '40%',
        paddingVertical: 10,
        backgroundColor: "#000",
        borderRadius: 30,
        alignItems: "center",
    },
    modalCancelText: { 
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    }
});

export default StationCard;
