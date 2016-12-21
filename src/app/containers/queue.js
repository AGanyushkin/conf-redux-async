import { connect } from 'react-redux'
import React from 'react'
import { voteAsync, unvoteAsync, loadQueueAsync } from '../actions/events'
import EventItem from '../conponents/EventItem'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import '../style/common.sass'
import {bindActionCreators} from 'redux'

class Queue extends React.Component {
    componentDidMount() {
        this.props.loadQueueAsync()
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
                            doVote={() => this.props.voteAsync(eventId, this.props.accountId)}
                            doUnvote={() => this.props.unvoteAsync(eventId, this.props.accountId)}>
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
        voteAsync,
        unvoteAsync,
        loadQueueAsync
    }, dispatch)
)(Queue)
