/**
 * Created by DDY on 2019/4/18.
 */
/**
 * Created by DDY on 2019/4/18.
 */
import React, {PureComponent} from 'react';
import {
    AppRegistry,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    ListView,
    View,
    Image,
    Text,
    Platform,
    TouchableNativeFeedback,
    ImageBackground,
    FlatList,
    Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper';
import Header from './header';
import Indexmenu from './indexmenu';
import Indexcontcentbtm from './indexcontcentbtm';
import Indexcontbottom from './indexcontbottom';
const _homedata = require('./Homedata.json')
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
type Props = {

}
type State = {

}
class Home extends PureComponent<Props,State> {
    constructor(props) {
        super(props)
        this.state = {
            homedata:_homedata
        }
      }
    static navigationOptions = () =>({
        headerTitle:(
            < TouchableOpacity style={styles.cont}>
                <View>
                    <Header></Header>
                </View>
            </ TouchableOpacity>
        ),
        headerStyle:{height:50}
    })
    // 导航信息
    renderNavTitle(){
        return [
         {name:"旗袍",imgurl:require('../../img/index/menulogo1.png'),path:"a"},
         {name:"丝巾",imgurl:require('../../img/index/menulogo2.png'),path:"a"},
         {name:"手工刺绣",imgurl:require('../../img/index/menulogo3.png'),path:"a"},
         {name:"送礼臻品",imgurl:require('../../img/index/menulogo4.png'),path:"a"},
        ]
    }

    // 商品右边文字介绍
    renderTitleDesc(){
        const {homedata} = this.state;
        let arrytitle = '';
        homedata.data.map((item,index)=>{
            arrytitle = item.goodsdesc
        })
            return(
                <FlatList
                    horizontal={true}
                    data={arrytitle}
                    renderItem={({item})=><Text style={{width:10,fontSize:6,lineHeight:8}}>{item}</Text>}
                />
            )
    }
    // 旗袍丝蕴-传统工艺
    renderItem(){
        const {homedata} = this.state;
        let arryitem = homedata.data.map((item,index)=>{
            return item
        })
        return(
            <FlatList
                data={arryitem}
                renderItem={({item})=><View>
                <View style={{flexDirection: 'row', alignSelf:"center"}}>
                    <View style={styles.Topleftline}>
                        <View style={{width:10,height:10,backgroundColor:"#fa6f57",marginTop:3,alignSelf:"flex-end"}}></View>
                    </View>
                    <Text style={{fontSize:14,paddingLeft:10,paddingRight:10,}}>{item.firsttitle}</Text>
                    <View style={{width: 80,height:16,borderBottomWidth:1,borderColor:"#cecece",flexDirection:"row"}}>
                        <View style={{width:10,height:10,backgroundColor:"#fa6f57",marginTop:3}}></View>
                        <View style={{marginLeft:40}}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}  onPress={()=>alert("点击了")}>
                                <Text style={{fontSize:10}}>更多>></Text>
                            </TouchableNativeFeedback> 
                        </View>
                    </View> 
                </View>
                <View>
                    <Text style={{fontSize:8,alignSelf:"center",marginTop:5,marginBottom:5}}>{item.titledesc}</Text>
                    <Image resizeMode='stretch' style={{width:250,height:80,alignSelf:"center"}} source={{uri:item.titleimg}} />
                </View>
                <View style={{flexDirection: 'row',height:140,width:250,alignSelf:"center",marginTop:30,justifyContent:"space-around"}}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}  onPress={()=>alert("点击了")}>
                        <Image resizeMode='stretch' style={{width:90,height:140}} source={require('../../img/index/cl_1.png')} />
                    </TouchableNativeFeedback>
                    <Text style={{width:10,fontSize:8,lineHeight:10,alignSelf:"flex-end"}}>{item.gooddesc}</Text>
                    <View style={styles.contpacebox}>
                        <Text style={[styles.contpace,{borderBottomWidth:1,borderStyle:"solid",borderColor:"#cecece"}]}>{item.price}</Text>
                        <Text style={styles.contpace}>套餐价</Text>
                    </View>
                    <View style={{flexDirection: 'row',marginTop:15}}>
                         {this.renderTitleDesc()}
                         <View style={{height:100,width:20,borderLeftColor:"#cecece",borderLeftWidth:1,borderStyle:"solid",alignItems:"center"}}>
                            <Text style={{fontSize:14,width:15,lineHeight:15}}>{item.firsttitle}</Text>
                            <View style={{width:10,height:10,backgroundColor:"#fa6f57",borderRadius:50}}></View>
                        </View>
                    </View>
                </View>
                <FlatList 
                horizontal={true}
                data={item.goodlist}
                style={{alignSelf:"center",paddingTop:5}}
                renderItem={({item}) => 
                <View style={{width:78,height:160,marginLeft:5}}>
                    <ImageBackground source={{uri:item.imgurl}} style={{width:78,height:104}}>
                    </ImageBackground>
                        <View style={{position:"absolute",top:5,left:5,height:50,justifyContent:"space-between"}}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}  onPress={()=>alert("点击了")}>
                                <View style={{width:15,height:15,backgroundColor:"white",borderRadius:50,borderColor:"#fa6f57"}}>
                                    <Text style={{fontSize:5,lineHeight:15,textAlign:"center"}}>新品</Text>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={()=>this.goDetail(item.imgurl,item.goodprice,item.goodname,item.detailimg)}>
                                <View style={{width:15,height:15,backgroundColor:"#fa6f57",borderRadius:50,borderColor:"#fa6f57"}}>
                                    <Image resizeMode='stretch' style={{width:8,height:8,alignSelf:"center",marginTop:3}} source={require('../../img/index/search.png')} />
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}  onPress={()=>alert("点击了")}>
                                <View style={{width:15,height:15,backgroundColor:"#fa6f57",borderRadius:50,borderColor:"#fa6f57"}}>
                                    <Image resizeMode='stretch' style={{width:8,height:8,alignSelf:"center",marginTop:3}} source={require('../../img/index/shop.png')} />
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                            <View>
                                <Text style={{fontSize:8,textAlign:"center"}}>俏雅静旗袍</Text>
                                <View style={{flexDirection: 'row',alignSelf:"center"}}>
                                  <Text style={{fontSize:8,textDecorationLine:"line-through"}}>{item.priceunderline}</Text>  
                                  <Text style={{fontSize:8,marginLeft:5,color:"red"}}>{item.goodprice}</Text>  
                                </View>
                                <View style={{flexDirection: 'row',alignSelf:"center"}}>
                                    <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}  onPress={()=>alert("点击了")}>
                                        <Text style={{fontSize:6}}>+加入购物车</Text>
                                    </TouchableNativeFeedback>
                                    <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}  onPress={()=>alert("点击了")}>
                                        <Text style={{fontSize:6,marginLeft:5}}>+加入收藏夹</Text>
                                    </TouchableNativeFeedback>
                                </View>
                            </View>
                </View>
                }
            />
            </View>}
            />
        )
    }
    goDetail(imgurl,price,name,detailimg) {
        //跳转路由并传值
        this.props.navigation.navigate('Goods', {
            goodsheader: imgurl,
            goodsprice:price,
            goodsname:name,
            goodsdetail:detailimg
        });
    }
    render() {
        return (
            <View style={styles.cont}>
                <ScrollView style={styles.scrollStyle} horizontal={false}>
                    <View style={styles.wrapper} >
                    {/* 轮播图 */}
                        <Swiper style={styles.wrapper} height={240} autoplay
                        onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                        dot={<View style={{backgroundColor:'rgba(0,0,0,.5)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                        activeDot={<View style={{backgroundColor: 'yellow', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        paginationStyle={{
                            bottom: 23, left: null, right: 10
                        }}
                        loop>
                            <View style={styles.slide} >
                                <Image resizeMode='stretch' style={styles.image} source={{uri:'https://ddyhomeimg.oss-cn-beijing.aliyuncs.com/swiper/banner.png'}} />
                            </View>
                            <View style={styles.slide}>
                                <Image resizeMode='stretch' style={styles.image} source={{uri:'https://ddyhomeimg.oss-cn-beijing.aliyuncs.com/swiper/banner.png'}} />
                            </View>
                            <View style={styles.slide} >
                                <Image resizeMode='stretch' style={styles.image} source={{uri:'https://ddyhomeimg.oss-cn-beijing.aliyuncs.com/swiper/banner.png'}} />
                            </View>
                        </Swiper>
                    </View>
                    <View style={styles.menustyle}>
                    {/* 花之国-绣之韵 */}
                        <Indexmenu></Indexmenu>
                    </View>
                    {/* 导航栏 */}
                    <View style={{height:80}}>
                        <FlatList
                            horizontal={true}
                            data={this.renderNavTitle()}
                            style={{alignSelf:"center"}}
                            renderItem={({item})=>
                                <TouchableNativeFeedback  background={TouchableNativeFeedback.SelectableBackground()} onPress={()=>alert("点击了")}>
                                    <View style={{paddingLeft:10,paddingRight:10}}>
                                        <Image resizeMode='stretch' style={{width:50,height:50}} source={item.imgurl} />
                                        <Text style={{fontSize:12,width:50,textAlign:"center"}}>{item.name}</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            }/>
                    </View>
                    {/* 旗袍丝蕴和传统工艺 */}
                    <View>
                        {this.renderItem()}
                    </View>
                    <View>
                        <Indexcontcentbtm></Indexcontcentbtm>
                    </View>
                    <View style={{marginTop:30}}>
                        <Indexcontbottom></Indexcontbottom>
                    </View>
                </ScrollView>

            </View>
        )
    }
}
const  styles = StyleSheet.create({
    cont:{
        flex:1
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        alignItems:'center'
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        // paddingRight:200,
        // flex: 1
        width:"100%",
        // height:"100%"
        height:200
    },
    scrollStyle:{
        // height:800
    },
    wrapper:{
        // flex:1
        height:200
    },
    menustyle:{
        height:160,

    },
    Topleftline:{
        width: 80,
        height:16,
        borderBottomWidth:1,
        borderColor:"#cecece"
    },
    contpacebox:{
        width:30,
        height:30,
        borderStyle:"solid",
        borderRadius:50,
        borderColor:"#fa6f57",
        borderWidth:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:15,
        marginRight:10
    },
    contpace:{
        fontSize:6
        
    }
})

export default  Home