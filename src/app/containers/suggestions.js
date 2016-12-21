import { connect } from 'react-redux'
import React from 'react'
import { voteAsync, unvoteAsync, assignAsync, loadSuggestionsAsync } from '../actions/events'
import { push } from 'react-router-redux'
import EventItem from '../conponents/EventItem'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import '../style/common.sass'
import {bindActionCreators} from 'redux'

class SuggestionList extends React.Component {
    componentDidMount() {
        this.props.loadSuggestionsAsync()
    }
    render() {
        return (
            <Segment className="segment-borderless">
                <Dimmer active={this.props.processing} inverted>
                    <Loader inverted>Processing</Loader>
                </Dimmer>
                {this.props.events.map(eventId => {
                    let event = this.props.eventById[eventId]
                    return (
                        <EventItem key={eventId}
                                   {...event}
                                   accountById={this.props.accountById}
                                   voted={event.voters.filter(vid => vid === this.props.accountId).length}
                                   doVote={() => this.props.voteAsync(eventId, this.props.accountId)}
                                   doUnvote={() => this.props.unvoteAsync(eventId, this.props.accountId)}
                                   assign={() => this.props.assignAsync(eventId, this.props.accountId)}>
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
            events: state.events.suggestions,
            eventById: state.events.eventById,
            accountId: state.account.aid,
            accountById: state.account.accountById
        }
    },
    dispatch => bindActionCreators({
        voteAsync,
        unvoteAsync,
        assignAsync,
        loadSuggestionsAsync
    }, dispatch)
)(SuggestionList)
