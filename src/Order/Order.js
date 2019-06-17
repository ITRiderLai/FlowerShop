/**
 * Created by DDY on 2019/4/18.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    SafeAreaView,
    Dimensions,
    TouchableNativeFeedback
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { computed, toJS } from 'mobx';
import OrderList from './OrderList';
import orderStore from '../store/Order'; 

const width = Dimensions.get('window').width

@observer
class Order extends Component{
  constructor (props) {
    super(props)
    // alert(JSON.stringify(orderStore.list))
  }
    static navigationOptions = ({navigation}) => ({
        headerTitle: (
            <View style={styles.titlebox}>
                <Text style={styles.titlecolor}>订单</Text>
            </View>
        ),
        headerStyle: {backgroundColor: '#fa6f57',height:35}
    })

    renderItem = ({ item }) => <OrderList item={item} />;

    keyExtractor = (item, index) => `item-${index}`;
    render() {
    return (
      <View style={styles.container}>
        {orderStore.list.length ? (
          <FlatList
            extraData={toJS(orderStore.list)}
            data={orderStore.list}
            renderItem={({ item }) => <OrderList item={item} /> }
            keyExtractor={(item, index) => `item-${index}`}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>订单空空如也~</Text>
          </View>
        )}
      </View>
    );
  }
}

// Order.wrappedComponent.propTypes = {
//     rootStore: PropTypes.object.isRequired
//   };
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    titlecolor:{
      width:width,
      color:'white',
      lineHeight:35,
      textAlign:'center'
  }
  });

export default  Order