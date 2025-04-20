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
      marginTop: -129,
    },
    buttonContainer: {
      marginTop: 20,
      width: '100%',
      alignItems: 'center',
    },
    infoText: {
      marginVertical: 233,
      marginHorizontal:20,
      textAlign: 'center',
      color: theme.primaryText + '66',
    },
    continueBtn: {
      alignItems: 'flex-end',
      marginTop: -30,
      marginRight: 30,
      marginBottom: 20,
      height:'10%'
    },
  });

  const handleSetFuelType = (fuelType: string) => {
    console.log({ fuelType });
    AsyncStorage.setItem('fuelType', fuelType);
    router.replace('./signup_setSearchRadius');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Heading level={1} style={{ marginTop: 117, marginBottom: 20 }}>
        What is your preferred fuel type?
      </Heading>
      <View style={styles.buttonContainer}>
        <Button level={1} onPress={() => handleSetFuelType('Petrol')} color="#026836">
          Petrol
        </Button>
        <Button level={1} onPress={() => handleSetFuelType('Diesel')} color="#22272A">
          Diesel
        </Button>
      </View>
      <Heading level={5} style={styles.infoText}>Please Note That All Preferences Can Be Changed Later.</Heading>
      <View style={styles.continueBtn}>

      </View>
    </SafeAreaView>
  );
};

export default SignUpScreenSetFuelType;
