import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from '../theme/ThemeContent';

const Checkbox = ({ label = "Label", isTermsAndConditions = false, checked = false, onChange }) => {
  const theme = useTheme();
  const [isChecked, setIsChecked] = React.useState(checked);
  const [modalVisible, setModalVisible] = React.useState(false); // State for modal visibility

  const handleTermsPress = () => {
    setModalVisible(true); // Show modal when terms are pressed
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Close the modal
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignContent: 'center',
      paddingHorizontal: 20,
      marginTop: 10,
    },
    label: {
      color: theme.primaryText,
      fontSize: 16,
      textAlignVertical: 'center',
      lineHeight: 30,
    },
    link: {
      color: theme.primaryButton,
      textAlignVertical: 'center',
      fontSize: 16,
      padding: 0,
      margin: 0,
      lineHeight: 30,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background to dim behind the modal
    },
    modalContent: {
      width: '80%',
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
    },
  });

  return (
    <View style={styles.container}>
      <BouncyCheckbox
        size={30}
        fillColor="green"
        unFillColor="#FFFFFF"
        innerIconStyle={{ borderWidth: 2 }}
        onPress={() => {
          setIsChecked(!isChecked);
          onChange && onChange(!isChecked);
        }}
        style={styles.checkbox}
      />
      {!isTermsAndConditions && (
        <Text style={styles.label}>{label}</Text>
      )}
      {isTermsAndConditions && (
        <><Text style={styles.label}>
          I agree to the
        </Text><Text style={styles.label}>
            <TouchableOpacity onPress={handleTermsPress}>
              <Text style={styles.link}> Terms and Conditions</Text>
            </TouchableOpacity>
          </Text></>
      )}

      {/* Modal for Terms and Conditions */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Terms and Conditions...</Text>
            {/* You can replace this Text with your actual terms and conditions content */}
            <Button title="Close" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Checkbox;
