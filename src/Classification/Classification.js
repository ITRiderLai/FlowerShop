/**
 * Created by DDY on 2019/4/18.
 */
/**
 * Created by DDY on 2019/4/18.
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableNativeFeedback,
    ScrollView,
    TouchableOpacity,
    FlatList,
    SectionList,
} from 'react-native'
import { createStackNavigator, createAppContainer} from 'react-navigation';
type Props = {

}
type State = {

}
const _CateData = require('./shopdata.json')
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
class Classification extends PureComponent<Props,State> {

    constructor(props) {
        super(props)
        this._flatList = null
        this._sectionList = null
        this.state = {
          selectedRootCate: 0,
            CateData:_CateData
        }
      }

    //导航头部
    static navigationOptions = ({navigation}) => ({

      //导航头部文字
        headerTitle: (
            <View style={styles.titlebox}>
                <Text style={styles.titlecolor}>分类</Text>
            </View>
            
        ),
        
        //导航头部样式
        headerStyle: {backgroundColor: '#fa6f57',height:35}
    })

    //钩子函数，即当DOM渲染完成后以及执行
    componentWillMount(){
        // fetch('http://m249126q62.zicp.vip/shop/selectAllList').then(res=>res.json()).then(res=>{
        //     this.setState({
        //       //把返回的数据传入state状态的变量CateData
        //         CateData:res
        //     })
        // })
        
    }

    //组件方法：设定左边栏样式
    _renderItem = item => {
        const {CateData} = this.state;
        let index = item.index
        let title = item.item.title
        return (
          <TouchableOpacity
            key={index}
            style={[{alignItems: 'center', justifyContent: 'center', width: 100, height: 44}, this.state.selectedRootCate === index ? {backgroundColor: 'white', borderLeftWidth: 3, borderLeftColor: '#fa6f57'} : {backgroundColor: '#F5F5F5'}]}
            onPress={() => {
              //这里是设置点击动画的效果
              setTimeout(() => {
                (CateData.data.length - index) * 45 > height - 65 ? this._flatList.scrollToOffset({animated: true, offset: index * 45}) : null
                this._sectionList.scrollToLocation({itemIndex: 0, sectionIndex: 0, animated: true, viewOffset: 20})   //scrollToLocation()方法实现滚动到sectionList的某一位置之目的
              }, 100)
              this.setState({selectedRootCate: index})
            }}
          >
          {/* 这里是判断点击中的按钮变色 */}
            <Text style={{fontSize: 13, color: this.state.selectedRootCate === index ? '#fa6f57' : '#333'}}>{title}</Text> 
          </TouchableOpacity>
        )
      }


      //设定左边栏数据
      renderRootCate() {
          const {CateData} = this.state;
        let data = []
        //遍历CateData里的数据
        CateData.data.map((item, index) => {
          //把CateData调用MAP方法遍历找到数据PUSH进data
          data.push({key: index, title: item.firstCateName})
        })
        return (
          <View style={{backgroundColor: '#F5F5F5'}}>
            <FlatList
              ref={flatList =>
              {return this._flatList = flatList} }
              data={data}
              ListHeaderComponent={() => (<View/>)} //创建头部样式
              ListFooterComponent={() => (<View/>)} //创建底部样式
              ItemSeparatorComponent={() => <View style={{height:1, backgroundColor:'#F5F5F5'}}/>} //创建行与行之间的分隔线组件
              renderItem={this._renderItem}       //根据行数据data渲染每一行的组件
              onEndReachedThreshold={20}    //决定当距离内容最底部还有多远时触发onEndReached回调
              showsVerticalScrollIndicator={false}   
              >
            </FlatList>
          </View>
        )
      }

      //商品二级标题方法
      sectionComp(item) {
        return (
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: 'gray', marginBottom: 8}}>{item.section.key}</Text>
          </View>
        )
      }


      //右边商品栏每个商品的样式
      renderCell(item, index) {
        return (
          <TouchableOpacity
            key={index}
            style={{ width:"45%", height:height*0.25,marginBottom: 8, marginRight: 10, alignItems: 'center'}}
            onPress={() => this.goDetail(item.itemId,item.headerimg,item.price,item.name,item.detailimg)}
          >
            <Image style={{width:"100%", height:height*0.23}} source={{uri:item.itemImg}}/>
            <Text style={{color: '#333', fontSize: 13}}>{item.title}</Text>
          </TouchableOpacity>
        )
      }

      renderItem(item) {
        const {CateData} = this.state;
        let sectionIndex = item.section.data.sectionId    //把选中的索引[0,1,2]存入变量
        let data = item.section.data  //把items里面的数据放进了data
        return item.index === 5 ?     
          <View key={item.index} style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {data.map((cell, index) => this.renderCell(cell,index))}
          </View> : null
      }

      //右边商品列表
      renderItemCate() {
          const {CateData} = this.state;
        //CateData.data[this.state.selectedRootCate]为选中的那一个大分类里面的二级大分类进行map()方法筛选,返回的是一个数组
        let tempArr = CateData.data[this.state.selectedRootCate].secondCateItems.map((item, index) => {
          let tempObj = {}
            tempObj.key = item.secondCateName      //把secondCateName放进一个对象，并且属性名为key
            tempObj.data = item.items              //把整个items放进一个对象，并且属性名为data,
            tempObj.data.sectionId = index         //把索引[0,1,2]存进sectionId属性名中
          return tempObj
        })


        return (
          <View style={{flex: 1, backgroundColor: 'white', marginLeft: 10, marginTop: 8}}>
            <SectionList
              ref={(ref) => this._sectionList = ref}
              renderSectionHeader={this.sectionComp} //头部信息
              renderItem={(data) => this.renderItem(data)}  //把tempArr里面的数据传进了this.renderItem()的方法里面
              sections={tempArr}      //section跟FlatList中的data含义是一样的，就是把数据传入组件的意思。
              ItemSeparatorComponent={() => <View/>}
              ListHeaderComponent={() => <View/>}
              ListFooterComponent={() => <View/>}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => 'key' + index + item}
            />
          </View>
        )
        
      }

      renderCategory() {
        return (
          <View style={{flexDirection: 'row', flex: 1, backgroundColor: 'white'}}>
            {this.renderRootCate()}
            {this.renderItemCate()}
          </View>
        )
      }
    //跳转到商品详情,传进ID,头部图片,价格,名字,详情图
    goDetail(itemid,headerimg,price,name,detailimg) {
      //跳转路由并传值
      this.props.navigation.navigate('Goods', {
          goodsid:itemid,
          goodsheader: headerimg,
          goodsprice:price,
          goodsname:name,
          goodsdetail:detailimg
      });
      }

      //渲染总页面
    render() {0
        return (
            <View style={styles.container}>
                {this.renderCategory()}
            </View>
        )
    }
}
const  styles = StyleSheet.create({
    container:{
        flex:1
    },
    titlecolor:{
        width:width,
        color:'white',
        lineHeight:35,
        textAlign:'center'
    }
})

export default  Classification