import React, { useEffect, useState } from 'react';
import { Text, View, Modal, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

interface ScannerProps {
  onScanned: (type: any, data: any) => void;
}

const Scanner: React.FC<ScannerProps> = (props) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }, []);

  const handleBarScanned = ({ type, data }: any) => {
    setScanned(true);
    props.onScanned(type, data);
  }

  if(hasPermission === false) {
    return <Text>No access camera!</Text>
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title="Hello" onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Scanner;