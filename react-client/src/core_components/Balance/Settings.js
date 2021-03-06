import React from 'react'
import { observer } from 'mobx-react'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Divider from '@material-ui/core/Divider'
import _ from 'lodash'
import CloseIcon from '@material-ui/icons/Close'

import DashboardsStore from 'stores/DashboardsStore'
import DrawersStore from 'stores/DrawersStore'

@observer
class Settings extends React.Component {
  render() {
    var {dashboardId, widgetId} = this.props.data
    var {total, demo} = _.find(DashboardsStore.dashboards[dashboardId].widgets, ['i', widgetId]).data
    return (
      <div className="drawer">
        <div className="drawer-title">
          <div className="drawer-title-text">Widget settings</div>
          <CloseIcon onClick={this.drawerRightClose.bind(this)} className="pointer" />
        </div>
        <Divider />
        <div className="section-body">
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-name"
              label="Name"
              value={_.find(DashboardsStore.dashboards[dashboardId].widgets, ['i', widgetId]).customHeader}
              onChange={this.changeCustomHeader.bind(this)}
              variant="outlined"
              fullWidth
              className="mb-16"
            />
            <FormGroup>
              <FormControlLabel
              className="mb-16"
              control={
                  <Switch
                    checked={total}
                    onChange={this.setTotal.bind(this)}
                    value=""
                  />
                }
                label={total ? 'All stocks' : 'Current stock' }
              />
            </FormGroup>
            <TextField
              id="outlined-name"
              label="Stock"
              value={_.find(DashboardsStore.dashboards[dashboardId].widgets, ['i', widgetId]).data.stock}
              onChange={this.setWidgetData.bind(this, 'stock', 'value', 'toUpperCase')}
              variant="outlined"
              fullWidth
              className={total ? 'hide' : ''}
            />
            <FormGroup>
              <FormControlLabel
              className="mb-16"
              control={
                  <Switch
                    checked={demo}
                    onChange={this.setWidgetData.bind(this, 'demo', 'checked', undefined)}
                    value=""
                  />
                }
                label={demo ? 'Demo on' : 'Demo off' }
              />
            </FormGroup>
          </form>
        </div>
        <Divider />
      </div>
    )
  }
  changeCustomHeader(e) {
    var {dashboardId, widgetId} = this.props.data
    var value = e.target.value.trim()
    DashboardsStore.setCustomHeader(dashboardId, widgetId, value)
  }
  setTotal(e) {
    var {dashboardId, widgetId} = this.props.data
    DashboardsStore.setWidgetData(dashboardId, widgetId, 'total', e.target.checked)
    if (e.target.checked) {
      DashboardsStore.setWidgetData(dashboardId, widgetId, 'stock', 'TOTAL')
    } else {
      var stockTemp = _.find(DashboardsStore.dashboards[dashboardId].widgets, ['i', widgetId]).data.stockTemp
      DashboardsStore.setWidgetData(dashboardId, widgetId, 'stock', stockTemp)
    }
  }
  // setStock(e) {
  //   var {dashboardId, widgetId} = this.props.data
  //   DashboardsStore.setWidgetData(dashboardId, widgetId, 'stock', e.target.value)
  //   DashboardsStore.setWidgetData(dashboardId, widgetId, 'stockTemp', e.target.value)
  // }
  setWidgetData(key, attr, fn, e) {
    var {dashboardId, widgetId} = this.props.data
    var value = e.target[attr]
    if (typeof(value) === 'string') value = value.trim()
    DashboardsStore.setWidgetData(dashboardId, widgetId, key, value, fn)
  }
  setGroup(dashboardId, widgetId, e) {
    var value = e.target.value.trim()
    DashboardsStore.setWidgetData(dashboardId, widgetId, 'group', value)
    DashboardsStore.setGroup(dashboardId, widgetId, value)
  }
  drawerRightClose() {
    DrawersStore.drawerClose('aside-left-first')
  }
}

export default Settings
