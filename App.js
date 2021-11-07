import React from 'react';

import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

//Luodaan local storage, jotta saadaan käyttöön kaikkialla sovelluksessa as "Context"
const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

//const apolloClient = createApolloClient();

const App = () => {
  //Tällä nähdää sovelluksen konfiguraatio
  console.log("Extra, env variable:", Constants.manifest.extra.env);
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;