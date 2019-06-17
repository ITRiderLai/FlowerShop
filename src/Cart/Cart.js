'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import Header from '../component/header'
import { observer, inject } from "mobx-react"
import px from '../utils/px2dp'
import order from '../store/Order';
import formatTime from '../common/formatTime'
@observer
class GoodItem extends React.Component {
    render() {
        const cart = this.props.cart
        const item = this.props.item
        return <View style={styles.goods_main}>
            <View style={styles.goods_list}>
                {/*选中的按钮*/}
                {this.props.editStatus
                    ? <View style={styles.operatingBtn}>
                        <TouchableOpacity activeOpacity={0.8}
                                          style={styles.operatingBtnBox}
                                          onPress={this.props.editSelect}>
                            {this.props.editSelectStatus ?
                                <Image source={ require('../../img/icon/checked.png') }
                                       resizeMode='cover'
                                       style={{ width: px(34), height: px(34) }} />
                                : <Image source={require('../../img/icon/uncheck.png')}
                                         resizeMode='cover'
                                         style={{ width: px(34), height: px(34) }} />
                            }
                        </TouchableOpacity>
                    </View>
                    : <View style={styles.operatingBtn}>
                        <TouchableOpacity activeOpacity={0.8}
                            style={styles.operatingBtnBox}
                            onPress={cart.change.bind(cart, item.itemId, !item.selected)}>
                            {item.selected
                                ? <Image source={require('../../img/icon/checked.png')}
                                    resizeMode='cover'
                                    style={{ width: px(34), height: px(34) }} />
                                : <Image source={require('../../img/icon/uncheck.png')}
                                    resizeMode='cover'
                                    style={{ width: px(34), height: px(34) }} />
                            }
                        </TouchableOpacity>
                    </View>
                }
                {/*商品图*/}
                <View style={styles.goods_img}>
                    <TouchableOpacity onPress={() => this.props.goDetail(item.itemId,item.headerimg,item.price,item.name,item.datailimgs)}>
                        <Image source={{ uri: item.headerimg }}
                               style={styles.img}
                               resizeMode='cover'
                        />
                    </TouchableOpacity>
                </View>
                {/*商品名称价格等*/}
                <View style={styles.goods_content}>
                    <TouchableOpacity onPress={() => this.props.goDetail(item.itemId,item.headerimg,item.price,item.name,item.datailimgs)}>
                        <Text allowFontScaling={false}
                              style={[styles.goods_name]}
                              numberOfLines={2}>
                            <Text allowFontScaling={false}>{item.name}</Text>
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.operating}>
                        <Text allowFontScaling={false} style={[styles.money]}>¥{item.price}</Text>
                        <Text allowFontScaling={false} style={[styles.quantity]}>x{item.buyNumber}</Text>
                        <View style={styles.operatingBox}>{
                            item.buyNumber == 1
                                ? <TouchableOpacity
                                    activeOpacity={0.8}>
                                    <View style={styles.reduce}>
                                        <Text allowFontScaling={false} style={[styles.btn1, styles.color_disabled1]}>-</Text>
                                    </View>
                                </TouchableOpacity>
                                : <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={cart.changeGoodsQuantity.bind(cart, item.itemId, item.buyNumber - 1)}>
                                    <View style={styles.reduce}>
                                        <Text allowFontScaling={false} style={[styles.btn1]}>-</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            <View style={styles.inpBox}>
                                <TextInput allowFontScaling={false}
                                    style={styles.inp1}
                                    defaultValue={String(item.buyNumber)}
                                    keyboardType="numeric"
                                    onChangeText={(value) => cart.changeGoodsQuantity(item.itemId, value)}
                                    autoFocus={false}
                                    underlineColorAndroid="transparent">
                                </TextInput>
                            </View>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={cart.changeGoodsQuantity.bind(cart, item.itemId, item.buyNumber + 1)}>
                                <View style={styles.plus}>
                                    <Text allowFontScaling={false} style={[styles.btn1]}>+</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    }
}
//底部栏
@inject('cart')
@observer
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectALL: false
        }
    }
    render() {
        const cart = this.props.cart
        if (this.props.editStatus) {
            return <View style={styles.footer}>
                <View style={styles.operatingBtn}>
                    <TouchableOpacity activeOpacity={0.8}
                                      style={styles.operatingBtnBox}
                                      onPress={() => this.props.editSelectAllFn()}>
                        {this.props.editorArr.length === cart.goodsList.length
                            ? <Image source={require('../../img/icon/checked.png')}
                                resizeMode='cover'
                                style={{ width: px(34), height: px(34) }} />
                            : <Image source={require('../../img/icon/uncheck.png')}
                                resizeMode='cover'
                                style={{ width: px(34), height: px(34) }} />
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.footerContent}>
                    <Text allowFontScaling={false} style={[styles.footerContentTxt0]}>全部</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={this.props.delete}>
                        <View style={[styles.delete]}>
                            <Text allowFontScaling={false} style={styles.delete_txt}>删除</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        }
        return <View style={styles.footer}>
            <View style={styles.operatingBtn}>
                <TouchableOpacity activeOpacity={0.8}
                                  style={styles.operatingBtnBox}
                                  onPress={this.props.selectAllFn}>
                    {cart.goodsList.length === cart.selectedList.length
                        ? <Image source={require('../../img/icon/checked.png')}
                            resizeMode='cover'
                            style={{ width: px(34), height: px(34) }} />
                        : <Image source={require('../../img/icon/uncheck.png')}
                            resizeMode='cover'
                            style={{ width: px(34), height: px(34) }} />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.footerContent}>
                <Text allowFontScaling={false} style={[styles.footerContentTxt0, styles.footerContentTxt1]}>全部</Text>
                <Text allowFontScaling={false} style={styles.footerContentTxt1}>合计</Text>
                <Text allowFontScaling={false} style={styles.footerContentTxt2}>￥{cart.totalPrice}</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={this.props.submit}>
                    <View style={[styles.submit, cart.totalPrice > 0 ? '' : styles.submitDisabled]}>
                        <Text allowFontScaling={false} style={styles.submit_txt}>去结算({cart.selectedList.length})</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    }
}

@inject('cart')
@observer
export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            txt: '编辑',
            requestStatue: false, //请求状态  是否请求中
            refreshing: false, //下拉刷新状态
            editStatus: false, //编辑状态
            editorArr: [],//编辑的商品数组
        };
        this.edit = this.edit.bind(this);
    }
    render() {
        let cart = this.props.cart
        return <View style={{ flex: 1, backgroundColor: '#f5f3f6', paddingBottom: px(100) }}>
            {/*顶部*/}
            <Header
                showLeft={false}
                style={{
                    backgroundColor: "#fff",
                }}
                title={`购物车(${cart.goodsList.length || 0})`}
                titleStyle={{
                    color: "#000"
                }}
                rightBtn={this.state.editStatus ?
                    <Text allowFontScaling={false}
                          onPress={() => this.done()}
                          style={styles.headerRight}>完成</Text> :
                    <Text allowFontScaling={false}
                          onPress={() => this.edit()}
                          style={styles.headerRight}>编辑</Text>
                }
            />
            <FlatList
                keyExtractor={item => item.itemId}
                refreshing={this.state.refreshing}
                onRefresh={() => this.refresh()}
                ListEmptyComponent={() => {    //如果没有数据的时候填充布局
                    if (cart.goodsList.length === 0) {
                        return <View style={styles.empty}>
                            <Text allowFontScaling={false} style={styles.empty_txt}>购物车没有商品哦</Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.goHome.bind(this)}>
                                <View style={styles.empty_btn}>
                                    <Text allowFontScaling={false} style={styles.empty_btn_txt}>去首页看看</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    } else {
                        return <View></View>
                    }
                }}
                data={cart.goodsList}
                renderItem={({ item, index }) => <GoodItem
                    item={item}
                    cart={cart}
                    editStatus={this.state.editStatus}
                    limitStock={this.limitStock}
                    editSelectStatus={this.state.editorArr.indexOf(item.itemId) >= 0}
                    editSelect={() => this.editSelect(item.itemId)}
                    goDetail={() => this.goDetail(item.itemId,item.headerimg,item.price,item.name,item.datailimgs)}
                />
                }
            />
            {cart.goodsList.length > 0 &&
                <Footer
                    editStatus={this.state.editStatus}
                    selectAllFn={this.selectAll.bind(this)}
                    editSelectAllFn={this.editSelectAllFn.bind(this)}
                    editorArr={this.state.editorArr}
                    delete={this.delete.bind(this)}
                    submit={this.submit.bind(this)}
                />
            }
        </View>
    }
    selectAll () {
        let cart = this.props.cart
        if (cart.goodsList.length == cart.selectedList.length) {  //判断是否全选了，如果全选的话就遍历原本的商品数组，并且把每个商品的id传进change方法去改变状态，就是说如果全选的话再点击就是不全选咯
            cart.goodsList.forEach(goods => {
                cart.change(goods.itemId, false)
            })
        } else {
            cart.goodsList.forEach(goods => {   //否则就把没有选择完的都选择到
                if (!goods.selected) {
                    cart.change(goods.itemId, true)
                }
            })
        }
    }
    //进入编辑状态
    edit() {
        this.setState({ editStatus: true })
    }
    //退出编辑状态
    done() {
        this.setState({ editStatus: false })
    }
    //编辑选中商品
    editSelect(id) {
        let index = this.state.editorArr.indexOf(id)        //找到被选择的那个商品的位置
        if (index >= 0) {
            this.state.editorArr.splice(index, 1)           //如果找到了那么就把他给删除了
        } else {
            this.state.editorArr.push(id)       //如果找不到的话那么就把他放进
        }
        this.setState({ editorArr: this.state.editorArr })
    }
    //编辑选中所有商品
    editSelectAllFn() {
        if (this.state.editorArr.length == this.props.cart.goodsList.length) {
            this.setState({ editorArr: [] })            //如果是已经都选择编辑的话再点击就是取消编辑了
        } else {
            this.props.cart.goodsList.forEach(goods => {            //把未编辑的都选中
                if (this.state.editorArr.indexOf(goods.itemId) < 0) {
                    this.state.editorArr.push(goods.itemId)     
                }
            })
            this.setState({ editorArr: this.state.editorArr })
        }
    }
    //删除
    delete() {
        let cart = this.props.cart
        cart.deleteGoods(this.state.editorArr)
        let editorArr = []
        this.state.editorArr.forEach(id => {
            let index = cart.goodsList.findIndex(goods => goods.itemId === id)
            if (index >= 0) {
                editorArr.push(id)
            }
        })
        this.setState({ editorArr })
    }
    //提交订单
    submit() {
        let cart = this.props.cart
        let newOrder = {
            id: new Date().getTime(),
            create_time: formatTime(new Date()),
            totalPrice: cart.totalPrice,
            list: [].concat(cart.selectedList)
        }
        order.push(newOrder)
        cart.deleteGoods(cart.selectedList)
        alert('付款成功')
        // alert(JSON.stringify(newOrder))
    }
    //跳转到商品详情
    goDetail(id,headerimg,price,name,detailimg) {
        this.props.navigation.navigate('Goods', {
            goodsid:id,
            goodsheader:headerimg,
            goodsprice:price,
            goodsname:name,
            goodsdetail:detailimg
        });
    }
    //跳到首页
    goHome() {
        this.props.navigation.navigate('Home');
    }
}

const styles = StyleSheet.create({
    headerRight: {
        color: '#858385',
        paddingVertical: px(17),
        width: px(90),
        justifyContent: 'flex-start',
        textAlign: 'right'
    },
    empty: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    empty_txt: {
        paddingTop: px(300),
        paddingBottom: px(30),
        color: '#858385',
        fontSize: px(26)
    },
    empty_btn: {
        width: px(180),
        height: px(60),
        backgroundColor: '#d0648f',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: px(6)
    },
    empty_btn_txt: {
        fontSize: px(26),
        color: '#fff'
    },
    goods_main: {
        width: px(750),
        height: px(211),
        borderBottomWidth: px(1),
        borderBottomColor: '#efefef',
    },
    goods_list: {
        width: px(750),
        paddingVertical: px(30),
        paddingRight: px(30),
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    operatingBtn: {
        backgroundColor: '#fff',
        width: px(88),
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    operatingBtnBox: {
        width: px(88),
        height: px(80),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    goods_img: {
        width: px(150),
        height: px(150),
        position: 'relative'
    },
    img: {
        width: px(150),
        height: px(150),
        borderRadius: px(10), overflow: 'hidden',
        position: 'relative',
        zIndex: 0
    },
    goods_img_cover: {
        position: 'absolute',
        left: px(20),
        top: px(20),
        zIndex: 1,
        width: px(110),
        height: px(110),
        borderRadius: px(55),
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    goods_img_txt: {
        fontSize: px(26),
        color: '#fff'
    },
    goods_limit: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: px(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    goods_limit_txt: {
        color: '#fff',
        fontSize: px(22)
    },
    goods_content: {
        flex: 1,
        paddingLeft: px(23)
    },
    goods_name: {
        color: '#252426',
        height: px(92),
        lineHeight: px(30),
        fontSize: px(26)
    },
    operating: {
        height: px(58),
        flexDirection: 'row',
        alignItems: 'center'
    },
    money: {
        color: '#f25ca0',
        fontSize: px(28),
        marginRight: px(20)
    },
    quantity: {
        flex: 1,
        color: '#666',
        fontSize: px(28)
    },
    operatingBox: {
        width: px(210),
        height: px(68),
        borderColor: '#ddd',
        borderWidth: px(1),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: px(10),
        overflow: 'hidden'
    },
    reduce: {
        width: px(68),
        height: px(68),
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: px(1),
        borderRightColor: '#ddd',
    },
    plus: {
        width: px(68),
        height: px(68),
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn1: {
        fontSize: px(36),
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    inpBox: {
        flex: 1,
        borderRightWidth: px(1),
        borderRightColor: '#ddd',
    },
    inp1: {
        flex: 1,
        backgroundColor: 'transparent',
        textAlign: 'center',
        padding: 0,
        fontSize: px(28)
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        height: px(98),
        borderTopWidth: px(1),
        borderTopColor: '#efefef',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    },
    footerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        height: px(98),
        backgroundColor: '#fff'
    },
    footerContentTxt0: {
        flex: 1,
        textAlign: 'left'
    },
    footerContentTxt1: {
        fontSize: px(28),
        color: '#252426'
    },
    footerContentTxt2: {
        fontSize: px(38),
        color: '#d0648f',
        marginRight: px(56),
    },
    submit: {
        width: px(250),
        height: px(98),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d0648f'
    },
    submitDisabled: {
        backgroundColor: '#b2b3b5'
    },
    submit_txt: {
        fontSize: px(34),
        color: '#fff'
    },
    delete: {
        width: px(140),
        height: px(60),
        borderColor: '#d0648f',
        borderWidth: px(1),
        borderRadius: px(8),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: px(30)
    },
    delete_txt: {
        fontSize: px(26),
        color: '#d0648f'
    },
})