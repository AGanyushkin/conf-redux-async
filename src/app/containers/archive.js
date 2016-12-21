import { connect } from 'react-redux'
import React from 'react'
import EventItem from '../conponents/EventItem'
import { Segment } from 'semantic-ui-react'
import '../style/common.sass'
import {bindActionCreators} from 'redux'
import {loadCompleted} from '../actions/events'

class Archive extends React.Component {
    componentDidMount() {
        this.props.loadCompleted()
    }
    render() {
        return (
            <Segment className="segment-borderless">
                {this.props.completed.map(eventId => {
                    let event = this.props.eventById[eventId]
                    return (
                        <EventItem key={eventId}
                                   {...event}
                                   accountById={this.props.accountById}>
                        </EventItem>
                    )
                })}
            </Segment>
        )
    }
}

export default connect(
    state => {
        return {
            completed: state.events.completed,
            eventById: state.events.eventById,
            accountById: state.account.accountById
        }
    },
    dispatch => bindActionCreators({
        loadCompleted
    }, dispatch)
)(Archive)
