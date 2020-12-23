import React, {useState, useEffect, useContext} from 'react';
import {ScrollView, StyleSheet, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import HeaderWrapper from '../HeaderWrapper/HeaderWrapper';

import AddService from './AddService';
import Empty from './Empty';
import Service from './Service';

import {Context} from '../../../api';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

export default React.memo(function ({navigation, route: {params}, ...props}) {
  const [services, setServices] = useState([]);
  const [token, {getUserServices}] = useContext(Context);

  useEffect(() => {
    getUserServices().then((json) =>
      json.status === 'ok'
        ? setServices(json.user_services)
        : Alert.alert(json.message),
    );
    console.log('updated services list');
  }, [params && params.update]);

  return (
    <HeaderWrapper navigation={navigation}>
      <AddService navigation={navigation} />
      <ScrollView style={styles.scrollView}>
        {services.length ? (
          services.map((json, i) => <Service key={i} {...json} />)
        ) : (
          <Empty />
        )}
      </ScrollView>
    </HeaderWrapper>
  );
});
