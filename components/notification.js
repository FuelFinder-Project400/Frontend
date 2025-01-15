import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NotificationCard = ({ type, title, description, onClose }) => {

  const iconDetails = {
    info: { name: 'information-outline', color: '#2196F3' },
    success: { name: 'check-circle-outline', color: '#4CAF50' },
    error: { name: 'alert-circle-outline', color: '#F44336' },
    default: { name: 'fuel', color: '#1882d9' }, 
  };

  const { name, color } = iconDetails[type] || iconDetails.default;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={name} size={40} color={color} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default NotificationCard;
