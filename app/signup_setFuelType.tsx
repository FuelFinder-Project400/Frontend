import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useTheme } from '../theme/ThemeContent';
import Heading from '@/components/headings';
import { useRouter } from 'expo-router';
import Button from '../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreenSetFuelType = () => {
  const router = useRouter();
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: 'center',
      padding: 20,
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
    buttonContainer: {
      marginTop: 20,
      width: '100%',
      alignItems: 'center',
    },
    infoText: {
      margin:20,
      textAlign: 'center',
      color: theme.primaryText + '66',
    },
  });

  const handleSetFuelType = (fuelType: string) => {
    console.log({ fuelType });
    AsyncStorage.setItem('fuelType', fuelType);
    router.replace('./signup_setSearchRadius');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/FuelFinerIconTransparent.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Heading level={1} style={{ marginTop: 20, marginBottom: 20 }}>
        What is your preferred fuel type?
      </Heading>
      <View style={styles.buttonContainer}>
        <Button level={1} onPress={() => handleSetFuelType('Petrol')} color="green">
          Petrol
        </Button>
        <Button level={1} onPress={() => handleSetFuelType('Diesel')} color="black">
          Diesel
        </Button>
      </View>
      <Heading level={5} style={styles.infoText}>Please Note That All Preferences Can Be Changed Later.</Heading>
    </SafeAreaView>
  );
};

export default SignUpScreenSetFuelType;
