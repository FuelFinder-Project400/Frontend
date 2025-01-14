import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
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
  });

  const handleSetFuelType = (fuelType: string) => {
    console.log({ fuelType });
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
    </SafeAreaView>
  );
};

export default SignUpScreenSetFuelType;
