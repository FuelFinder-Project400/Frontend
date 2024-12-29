import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  return (
    <SafeAreaView>
      <Text>Fuel Finder</Text>
      <Image source={require('../assets/images/FuelFinderIcon.png')}  style={{width: 200, height: 200}} />
    </SafeAreaView>
  );
}
