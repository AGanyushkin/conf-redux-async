import React from 'react'
import moment from 'moment'
import { Image, Item, Segment, Button, Label, Popup, Dimmer, Loader } from 'semantic-ui-react'

export default class EventItem extends React.Component {
    accNameByID(accountId) {
        return (this.props.accountById && this.props.accountById[accountId])
            ? this.props.accountById[accountId].name
            : null
    }
    render() {
        return (
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Item.Header as='a'>{this.props.title}</Item.Header>
                            <Item.Meta>
                                { this.props.eventDate ? <Label icon='checked calendar' content={moment(this.props.eventDate).format(' MMMM Do YYYY')} /> : null }
                            </Item.Meta>
                            <Item.Description>
                                <div dangerouslySetInnerHTML={{__html: this.props.description}}></div>
                            </Item.Description>
                            <Item.Extra>
                                <div className="event-status-bar">
                                    {this.props.createdBy ? this.accNameByID(this.props.createdBy) : null }
                                    {this.props.createdAt
                                        ? (this.props.createdBy ? ", " : null) + moment(this.props.createdAt).format(' MMMM Do YYYY')
                                        : null}
                                </div>
                                {this.props.voted
                                    ? <Button label={{ content: this.props.voters.length }} icon='heart' content='unlike' labelPosition='left' onClick={this.props.doUnvote} />
                                    : <Button label={{ content: this.props.voters.length }} color="green" icon='heart' content='like' labelPosition='left' onClick={this.props.doVote} />
                                }
                                { this.props.speaker ? <Button label={{ content: this.accNameByID(this.props.speaker) }} content='Speaker' labelPosition='left' /> : null }

                                { this.props.assign ? <Button positive floated='right' onClick={this.props.assign}>Assign to ME</Button> : null }
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        )
    }
}
