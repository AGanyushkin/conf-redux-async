import { connect } from 'react-redux'
import React from 'react'
import { putNewEventAsync } from '../actions/events'
import { goBack } from 'react-router-redux'
import { Input, Button, Header, Divider, Dimmer, Loader, Segment, Checkbox } from 'semantic-ui-react'
import TinyMCE from 'react-tinymce'

class NewEvent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            assigneToMe: false
        }
    }
    putNew() {
        this.props.putNew({
            title: this.state.title,
            description: this.state.content,
            createdBy: this.props.accountId,
            speaker: this.state.assigneToMe ? this.props.accountId : null
        })
    }
    handleEditorChange(content) {
        this.state.content = content
    }
    updateTitle(title) {
        this.state.title = title
    }
    render() {
        return (
            <div>
                <Header as='h3'>Create new event</Header>
                <Segment>
                    <Dimmer active={this.props.processing} inverted>
                        <Loader inverted>Processing</Loader>
                    </Dimmer>

                    <Input fluid placeholder='title...' onChange={e => this.updateTitle(e.target.value)} />
                    <Divider hidden />
                    <TinyMCE
                        content={this.state.content}
                        config={{
                            skin: "lightgray",
                            statusbar: false,
                            theme: 'modern',
                            menubar: false,
                            resize: false,
                            plugins: '',
                            toolbar: 'undo redo | bold italic'
                        }}
                        onChange={e => this.handleEditorChange(e.target.getContent())}
                    />
                    <Divider hidden />
                    <Checkbox label='assigne to me' onClick={() => { this.state.assigneToMe = !this.state.assigneToMe }} />
                    <Divider hidden />
                    <Button onClick={this.props.cancel}>Cancel</Button>
                    <Button positive onClick={() => this.putNew()}>Save</Button>
                </Segment>
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            processing: state.layout.processing,
            accountId: state.account.aid
        }
    },
    dispatch => {
        return {
            putNew: (event) => {
                dispatch(putNewEventAsync(event))
            },
            cancel: () => dispatch(goBack())
        }
    }
)(NewEvent)
