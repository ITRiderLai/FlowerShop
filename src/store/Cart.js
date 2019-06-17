import { observable, computed, action } from 'mobx'

class Cart {
    @observable goodsList = []    //observable是设定了一个可被观察的状态

    /**
     * @description 已选择商品列表
     */
    @computed get selectedList () {             //通过调用@computed装饰器的getter函数来当数据发生改变时自动更新，就是说每次都会自动更新商品列表的数组
        let selectedList = this.goodsList.filter(item => item.selected === true)  //filter方法返回一个符合条件的数组也就是说这里返回的是已经被选择中的商品数组
        return selectedList
    }

    /**
     * @description 已选择商品总价
     */
    @computed get totalPrice () {
        return this.goodsList.reduce((sum, goods) => {    //reduce方法返回的是一个相加之后的总和，sum是一个总数的参数，goods是每一项被相加的数值
            if (goods.selected) {  //这里表示的是选中的商品，因为goods是代表着goodsList数组里面的每一项，也就是相当于item，其实goodsList里面有购买数量，价格，以及选中的商品                     
                let price = Number(goods.price) * Math.ceil(goods.buyNumber)     //商品的价格*商品的购买数量，Math.ceil是向上取进的方法
                return sum += price   //然后这里返回是商品相加后的总数 
            }
            return sum   //这里再返回出去，也就是说totalPrice这个方法就是sum相加后的总和。
        }, 0)    //0是可选参数，传递给参数的初始值
    }

    /**
     * @description 添加商品
     * @param {Object} goods - 商品数据
     */
    @action addGoods (goods) {              //action是设定一个可以被调用的方法，而这个方法是用来改变上边定义的状态的方法，永远只对要修改的状态使用action，而普通的只是查找或者过滤器等函数可以不用，所以我们最好就是要修改状态的时候调用action定义的方法
        // 购物车原有商品

        //先判断商品列表中是否传入来的相同商品
        let oldGoods = this.goodsList.find(item => item.itemId === goods.itemId)   //find方法返回的是一个符合条件的第一个元素，这里就是返回的是一个符合的itemId,如果没有的话返回的是一个undefind

        //如果有的话，那么老商品的购买数量就是等于老商品的的原本数量加上传进来相同的商品数量，否则把商品加入到goodsList数组中去
        if (oldGoods) {            
            oldGoods.buyNumber = oldGoods.buyNumber + goods.buyNumber
        } else {      
            goods.selected = false     //否则的话首先要把商品的选择状态变为false，就是没选中，然后把新的商品数据push进goodsList数组
            this.goodsList.push(goods)
        }
    }

    /**
     * @description 删除商品
     * @param {Number|Array} ids - 商品id 可传数组以删除多个商品
     */
    @action deleteGoods (ids) {         
        if (Array.isArray(ids)) {       //判断传进来的是否是一个数组
            while (ids.length > 0) {    //当ids里面的长度就是数组的数量多于1个
                let index = this.goodsList.findIndex(item => item.itemId == ids[0])     //findIndex返回的是一个符合条件的索引值，定义一个let就是等于
                this.goodsList.splice(index, 1)                     //splice方法是删除数组元素，index是要删除的位置，1是删除的数量
                ids.shift()                 //返回第一个删除数组的元素，这个时候元素的第一个已经被删除了
            }
        } else {
            let index = this.goodsList.findIndex(item => item.itemId == ids)  //否者如果不是数组的话就找到goodsList里面的单个商品ID
            if (index > 0) this.goodsList.splice(index, 1)          //就是找到了的话，就删除这个索引的位置
        }
    }

    /**
     * @description 改变商品选择状态
     * @param {Number|Array} ids - 商品id 可传入数组以一次改变多个商品选择状态
     * @param {Boolean} selected - 商品的选择状态
     */
    @action change (ids, selected) {
        //这里判断传进来的是否一个数组如果是一个数组的话批量选择中，否则就选择一个
            //
            let goods = this.goodsList.find(item => item.itemId === ids)
            if (goods) {
                goods.selected = selected
            }
        }
    

    /**
     * @description 改变商品的购买购买数量
     * @param {Number} id - 商品id
     * @param {Number} quantity - 商品数量
     */
    @action changeGoodsQuantity (id, quantity) {
        let goods = this.goodsList.find(item => item.itemId === id)
        if (!goods) return
        quantity = Math.ceil(quantity)          //向上取进
        quantity = Math.max(1, quantity)        //与1比较的最大值，也就是说如果传进来的值是不大于1的话，那么最大值就是1
        goods.buyNumber = quantity
    }
    
}

export default Cart