import { connect } from 'react-redux'
import React from 'react'
import { like, dislike, loadQueue } from '../actions/events'
import EventItem from '../conponents/EventItem'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import '../style/common.sass'
import {bindActionCreators} from 'redux'

class Queue extends React.Component {
    componentDidMount() {
        this.props.loadQueue()
    }
    render() {
        return (
            <Segment className="segment-borderless">
                <Dimmer active={this.props.processing} inverted>
                    <Loader inverted>Processing</Loader>
                </Dimmer>
                {this.props.events.map((eventId) => {
                    let event = this.props.eventById[eventId]
                    return (
                        <EventItem key={eventId}
                            {...event}
                            accountById={this.props.accountById}
                            voted={event.voters.filter(vid => vid === this.props.accountId).length}
                            doLike={() => this.props.like({eid: eventId, aid: this.props.accountId})}
                            doDislike={() => this.props.dislike({eid: eventId, aid: this.props.accountId})}>
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
            processing: state.layout.processing,
            events: state.events.queue,
            eventById: state.events.eventById,
            accountId: state.account.aid,
            accountById: state.account.accountById
        }
    },
    dispatch => bindActionCreators({
        like,
        dislike,
        loadQueue
    }, dispatch)
)(Queue)
