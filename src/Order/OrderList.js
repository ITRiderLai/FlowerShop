import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList } from 'react-native';
import PropTypes from 'prop-types';
import formatTime from '../common/formatTime';
import { observer } from 'mobx-react'

@observer
class OrderList extends Component {
  constructor (props) {
    super(props)
  }
  renderItem = ({ item }) => <Text>{item.name},</Text>;
  keyExtractor = (item, index) => `item-${index}`;
  render () {
    let item = this.props.item
    // const date = formatTime(item.date);
    return (
      <View style={styles.container}>
        <View style={styles.dateLine}>
          <Text>{item.create_time}</Text>
        </View>
        <View style={styles.goodsContainer}>
            <View>

               <FlatList
                data={item.list}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
              />
            </View>
        </View>
        <View style={styles.moneyLine}>
          <Text style={styles.moneyText}>{`总价: ￥${item.totalPrice}`}</Text>
        </View>
        <View style={styles.line} />
      </View>
    );
  }
  };

//   OrderList.propTypes = {
//     item: PropTypes.object.isRequired
//   };

OrderList.propTypes = {
    item: PropTypes.object.isRequired
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      marginTop: 10
    },
    goodsContainer: {
      flex: 1,
      paddingLeft: 10
    },
    dateLine: {
      flex: 1,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10
    },
    moneyLine: {
      flex: 1,
      paddingTop: 5,
      paddingBottom: 5,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingRight: 20
    },
    moneyText: {
      fontSize: 18
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: '#ccc'
    }
  });

  export default OrderList;