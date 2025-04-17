import * as Notifications from 'expo-notifications';

// User Updated Price Notification
export async function sendThankYouNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'You Have Gained 100 XP',
        body: 'Thank you for your contribution! 🚗⛽',
        sound: 'default',
      },
      trigger: null,
    });
}

// User Reported Price Notification
export async function sendReportSentNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Your Report Has Been Sent',
      body: 'We have recieved your report, thank you 👍',
      sound: 'default',
    },
    trigger: null,
  });
}