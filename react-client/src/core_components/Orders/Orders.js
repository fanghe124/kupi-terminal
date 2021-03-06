import React from 'react'
import { observer } from 'mobx-react'
import _ from 'lodash'
import Preloader from '../Preloader'

import OrdersStore from 'stores/OrdersStore'
import CreateOrderStore from 'stores/CreateOrderStore'

@observer
class Orders extends React.Component {
  render() {
    const {type, stock, pair} = this.props.data
    var key = `${stock}--${pair}`
    if (OrdersStore.orders[key] === undefined || OrdersStore.orders[key][type] === undefined) {
			return <Preloader />
		}
    return (
      <div>
        <table className="simpleTable">
          <thead>
            <tr>
              <th className="simpleTable-header">price</th>
              <th className="simpleTable-header">amount</th>
              <th className="simpleTable-header">total</th>
            </tr>
          </thead>
          <tbody>
            {
              _.map(OrdersStore.orders[key][type].slice(0, 15), (order) => {
                return <tr key={order.id} onClick={this.setAll.bind(this, order.price, order.amount, order.total)}>
                  <td>{order.price.toFixed(8)}</td>
                  <td>{order.amount.toFixed(8)}</td>
                  <td>{order.total.toFixed(8)}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
  setAll(price, amount, total) {
    const {stock, pair} = this.props.data
    var key = `${stock}--${pair}--buy`
    CreateOrderStore.setPrice(price, key)
    CreateOrderStore.setAmount(amount, key)
    CreateOrderStore.setTotal(total, key)
    key = `${stock}--${pair}--sell`
    CreateOrderStore.setPrice(price, key)
    CreateOrderStore.setAmount(amount, key)
    CreateOrderStore.setTotal(total, key)
  }
  componentWillMount() {
    OrdersStore.count(1, this.props.data)
  }
  componentWillUnmount() {
    OrdersStore.count(-1, this.props.data)
  }
  componentWillUpdate() {
    OrdersStore.count(-1, this.props.data)
  }
  componentDidUpdate() {
    OrdersStore.count(1, this.props.data)
  }
}

export default Orders
