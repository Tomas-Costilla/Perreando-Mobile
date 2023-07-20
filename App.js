import 'react-native-gesture-handler';
import { StyleSheet, Text, View} from 'react-native';
import {PaperProvider} from 'react-native-paper'
import Navigation  from './src/navigation';
import {store} from "./src/store"
import {Provider} from "react-redux"
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
          <Navigation/>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
