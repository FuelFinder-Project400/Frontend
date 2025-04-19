import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from "react-native";
import { useTheme } from "../theme/ThemeContent";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NotificationCard from '../components/notification';
import Heading from '@/components/headings';
import { useRouter } from 'expo-router';
import {GetUserNotifications, DeleteUserNotifications} from '@/aws/api';
export default function Top() {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
      const getNotifications = async () => {
        const notifications = await GetUserNotifications();
        if (notifications != null){
          setNotifications(notifications);
        }
      }
      getNotifications();
    }, []);
  const handleRemoveNotification = async (id) => {
    setNotifications(notifications.filter((notif) => notif.notification_id !== id));
    await DeleteUserNotifications(id);
  };
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
      },
      logo: {
        width: 0,
      },
      top: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      },
      profileContainer: {
        flexDirection: 'row',
        margin: 10,
      },
      profilePic: {
        width: 50,
        height: 50,
        borderRadius: 30,
      },
      options: {
        marginTop: 15,
        marginRight: 10,
      },
      modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
      },
      notifications: {
        backgroundColor: "#D3D3D3",
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 20,
        height: "50%",
        width: "90%",
      },
      notificationText: {
        fontSize: 14,
        color: "#000",
        marginVertical: 5,
      },
      noNotifications: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginTop: 20,
      },
      notificationsHeading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#000",
        textAlign: "center",
      },
      closeButton: {
        margin: 10,
        paddingHorizontal: 40,
        paddingVertical: 20,
        backgroundColor: "#000",
        borderRadius: 30,
        alignItems: "center",
      },
      closeButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
      },
      iconWrapper: {
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        marginRight: -5,
      },
      badge: {
        position: "absolute",
        top: 7,
        right: -1,
        backgroundColor: "#ffac36",
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      },
      badgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
      },
  });
  return (
    <View style={styles.top}>
        <Heading level={1}>FuelFinder</Heading>
        <View style={styles.profileContainer}>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => setModalVisible(true)}
        >
          <MaterialCommunityIcons name="bell" size={30} color={theme.primaryText} />
          {notifications.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {notifications.length > 9 ? "9+" : notifications.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        </View>
        <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
        >
        <View style={styles.modalOverlay}>
          <View style={styles.notifications}>
            <Text style={styles.notificationsHeading}>Recent Notifications</Text>

            <ScrollView>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <NotificationCard
                    key={notification.notification_id}
                    type={notification.type}
                    title={notification.title}
                    description={notification.description}
                    onClose={() => handleRemoveNotification(notification.notification_id)}
                  />
                ))
              ) : (
                <Text style={styles.noNotifications}>No Notifications</Text>
              )}
            </ScrollView>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>
  );
}
