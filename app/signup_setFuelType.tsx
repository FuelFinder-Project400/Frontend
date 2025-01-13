import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView
import { useTheme } from '../theme/ThemeContent';
import Heading from '@/components/headings';
import { useRouter } from 'expo-router';
import Button from '../components/button';
const SignUpScreenSetFuelType = () => {
  const router = useRouter();
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignContent: 'center',
      alignItems: 'center',
    },
    scrollContainer: {
      flexGrow: 1,
      alignItems: 'center',
      paddingBottom: 100,
    },
    text: {
      fontSize: 16,
      margin: 10,
    },
    logo: {
      width: 250,
      marginBottom: -100,
      marginTop: -100,
    },
  });



  const handleContinueSignUp = () => {
    console.log('Navigate to Login Screen');
    router.push('./login');
  };
  return (
    <SafeAreaView style={styles.container}>
        <Image
            source={require('../assets/images/FuelFinerIconTransparent.png')}
            style={styles.logo}
            resizeMode="contain"
        />
        <Heading level={1} style={{marginTop: 20, marginBottom: 20,}}>What is your preferred fuel type?</Heading> 
        <Button level={1} onPress={undefined} color='green'>Petrol</Button>
        <Button level={1} onPress={undefined} color='black'>Diesel</Button>
    </SafeAreaView>
  );
};

export default SignUpScreenSetFuelType;
