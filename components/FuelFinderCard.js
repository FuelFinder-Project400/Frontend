import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Heading from './headings';

const FuelFinderCard = ({ name, address, petrol, diesel, distance, stars, lastUpdated, verifications, users_who_verified }) => {
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

    const isVerified = verifications >= 2;
    const isNotVisited = petrol == "";
    return (
        <View style={[styles.container, isVerified && styles.verifiedContainer, isNotVisited && styles.isNotVisitedContainer]}>
            {isVerified && <Text style={styles.verifiedLabel}>Verified by Users</Text>}
            {isNotVisited && <Text style={styles.isNotVisitedLabel}>No Price Added Yet</Text>}
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
                        <MaterialCommunityIcons key={index} name="star" size={20} color="#ffac36" style={styles.starIcon} />
                    ))}
                </View>

                <View style={{flexDirection: 'row', marginVertical: 10,}}>
                    <View style={styles.priceContainer}>
                        <Heading level={3} style={styles.priceHeading}>Petrol</Heading>
                        <Heading level={3} style={styles.priceText}>{petrol || " N/A"} c/L</Heading>
                    </View>
                    <View style={styles.priceContainer}>
                        <Heading level={3} style={styles.priceHeading}>Diesel</Heading>
                        <Heading level={3} style={styles.priceText}>{diesel || " N/A"} c/L</Heading>
                    </View>
                </View>

                <View style={styles.verificationContainer}>
                    <MaterialCommunityIcons name="check-circle" size={20} color={isVerified ? "#6dcf69" : "#888"} />
                    <Text style={styles.verificationText}>{verifications} verifications</Text>
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: '#878383', fontWeight: 'bold' }}>Last Updated: {getLastUpdated(lastUpdated)}</Text>
                </View>
            </View>

            <View style={styles.distanceContainer}>
                <Heading level={4} style={styles.distanceText}>{distance}km</Heading>
                <MaterialCommunityIcons name="arrow-right-circle" size={40} color="#524e4e" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        borderWidth: 2,
        borderColor: 'transparent',
        position: 'relative',
    },
    verifiedContainer: {
        borderColor: '#6dcf69',
    },
    verifiedLabel: {
        position: 'absolute',
        top: -10,
        left: 15,
        backgroundColor: '#6dcf69',
        color: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 3,
        fontSize: 12,
        borderRadius: 5,
        fontWeight: 'bold',
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
    isNotVisitedContainer: {
        borderColor: '#ff5454',
    },
    isNotVisitedLabel: {
        position: 'absolute',
        top: -10,
        left: 15,
        backgroundColor: '#ff5454',
        color: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 3,
        fontSize: 12,
        borderRadius: 5,
        fontWeight: 'bold',
    },
});

export default FuelFinderCard;
