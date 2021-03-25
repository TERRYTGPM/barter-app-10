import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import { ListItem } from 'react-native-elements';

import { SwipeListView } from 'react-native-swipe-list-view';

import db from '../config';


export default class SwipeableFlatlist extends Component{
  constructor(props) {
    super(props);
    this.state = {
      al : this.props.allNotifications,
    };
  }


  updateMarkAsread =(notification)=>{
    db.collection("all_notifications").doc(notification.doc_id).update({
      "notification_status" : "read"
    })
  }


  onSwipeValueChange = swipeData => {
    var allNotifis = this.state.al
      const {key,value} = swipeData;

      if(value < -Dimensions.get('window').width){
        const newData = [...allNotifis];
        const prevIndex = allNotifis.findIndex(item => item.key === key);
        this.updateMarkAsread(allNotifis[prevIndex]);
        newData.splice(prevIndex, 1);
        this.setState({allNotifis : newData})
    };
};



  renderItem = data => (
  
        <ListItem
          title={data.item.item_name}
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          subtitle={data.item.message}
          bottomDivider
        />
  );

  renderHiddenItem = () => (
      <View>
          <View>
              <Text ></Text>
          </View>
      </View>
  );

  render(){
    return(
      <View>
          <SwipeListView
              disableRightSwipe
              data={this.state.al}
              renderItem={this.renderItem}
              renderHiddenItem={this.renderHiddenItem}
              rightOpenValue={-Dimensions.get('window').width}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onSwipeValueChange={this.onSwipeValueChange}
          />
      </View>
    )
  }

}
