import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Heading from './headings';

const FuelFinderCard = ({petrol, diesel, distance, stars, lastUpdated}) => {
    function getLastUpdated(lastUpdated) {
        const now = new Date();
        const updatedDate = new Date(lastUpdated);
        const diffInSeconds = Math.floor((now - updatedDate) / 1000);
      
        if (diffInSeconds < 60) {
          return "just now";
        } else if (diffInSeconds < 3600) {
          const minutes = Math.floor(diffInSeconds / 60);
          return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
          const hours = Math.floor(diffInSeconds / 3600);
          return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 604800) {
          const days = Math.floor(diffInSeconds / 86400);
          return `${days} day${days !== 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 2419200) {
          const weeks = Math.floor(diffInSeconds / 604800);
          return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 29030400) {
          const months = Math.floor(diffInSeconds / 2419200);
          return `${months} month${months !== 1 ? 's' : ''} ago`;
        } else {
          const years = Math.floor(diffInSeconds / 29030400);
          return `${years} year${years !== 1 ? 's' : ''} ago`;
        }
      }
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.stationDetails}>
                <View style={styles.iconContainer}>
                    <FontAwesome5
                        name="gas-pump"
                        size={40}
                        style={styles.gasPumpIcon}
                    />
                </View>
                <View style={styles.stationDetailsText}>
                    <Heading level={5} style={{ color: '#000' }}>
                        Fuel Station
                    </Heading>
                    <Text>Over There</Text>
                </View>
            </View>
            <View style={styles.starsContainer}>
                {Array.from({ length: stars }).map((_, index) => (
                <MaterialCommunityIcons
                    key={index}
                    name="star"
                    size={20}
                    color="#FFD700"
                    style={styles.starIcon}
                />
                ))}
            </View>
            <View>
                <View style={styles.priceHeadingContainer}>
                    <Heading level={2} style={{color: '000', marginRight: 15}}>Petrol</Heading>
                    <Heading level={2} style={{color: '000'}}>Diesel</Heading>
                </View>
                <View style={styles.pricePricesContainer}>
                    <Heading level={3} style={{color: '000', marginRight: 15}}>€{petrol}</Heading>
                    <Heading level={3} style={{color: '000'}}>€{diesel}</Heading>
                </View>
            </View>
            <View style={{marginTop: 15}}>
                <Text style={{color: '#878383', fontWeight: 'bold'}}>Last Updated: {getLastUpdated(lastUpdated)}</Text>
            </View>
      </View>
      <View style={{flex: 1, justifyContent:'flex-start', flexDirection: 'column', alignItems: 'flex-end'}}>
        <Heading level={3} style={{color: '000'}}>{distance}km</Heading>
        <MaterialCommunityIcons name="arrow-right-circle" size={40} color="#524e4e" style={{marginTop: '40%'}}/>
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
    marginVertical: 5,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  stationDetails: {
    flexDirection: 'row',
  },
  iconContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  gasPumpIcon: {
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: -7
  },
  starIcon: {
  },
  stationDetailsText: {
    margin: 5,
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
});

export default FuelFinderCard;
