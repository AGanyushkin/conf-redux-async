import { connect } from 'react-redux'
import React from 'react'
import EventItem from '../conponents/EventItem'
import { Divider } from 'semantic-ui-react'
import {bindActionCreators} from 'redux'
import {loadNextEventsAsync, loadCompletedAsync} from '../actions/events'

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.loadNextEventsAsync()
        this.props.loadCompletedAsync()
    }
    showList(list) {
        return list.map(eventId => {
            let event = this.props.eventById[eventId]
            return (
                <EventItem key={eventId}
                           {...event}
                           accountById={this.props.accountById}>
                </EventItem>
            )
        })
    }
    render() {
        return (
            <div>
                <Divider section horizontal>NEXT EVENT</Divider>
                {this.showList(this.props.nextEvents)}

                <Divider section horizontal>LAST ACTIVITY</Divider>
                {this.showList(this.props.completed)}
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            completed: state.events.completed,
            nextEvents: state.events.nextEvents,
            eventById: state.events.eventById,
            accountById: state.account.accountById
        }
    },
    dispatch => bindActionCreators({
        loadNextEventsAsync,
        loadCompletedAsync
    }, dispatch)
)(Dashboard)
