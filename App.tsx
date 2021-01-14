import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';

import Scanner from './src/components/Scanner';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const [Stype, setStype] = useState("");
  const [Sdata, setSdata] = useState("");

  const handleOnScanned = ({ type, data }: any) => {
    setStype(type);
    setSdata(data);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Modal
        visible={modalVisible}
        style={styles.modalView}
      >
        <View style={styles.modalContent}>
          <Scanner onScanned={handleOnScanned} />
          <Button title="CloseModal" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <Text>Data: {Sdata}</Text>
      <Text>Type: {Stype}</Text>
      <Button title="Open Modal" onPress={() => setModalVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalView: {
    flex: 1,
    backgroundColor: "#24242480",
    borderRadius: 16,
  },

  modalContent: {
    flex: 1,
    width: '80%',
    height: '90%',
    marginBottom: 16,
    justifyContent: 'space-between',
  }
});
