import * as Notifications from 'expo-notifications';

// User Updated Price Notification
export async function sendThankYouNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Thanks for your contribution!',
        body: 'Your fuel price update has been submitted! 🚗⛽',
        sound: 'default',
      },
      trigger: null,
    });
}

// User Reported Price Notification
export async function sendReportSentNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Thanks for your contribution!',
      body: 'Your report has been sent, thank you! 👍',
      sound: 'default',
    },
    trigger: null,
  });
}