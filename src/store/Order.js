import { observable, computed, action } from 'mobx'

class Order {
    @observable list = []
    
    @action set (list) {
        this.list = list
    }

    @action push (order) {
        this.list.push(order)
    }

}

export default new Order();