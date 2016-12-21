import { connect } from 'react-redux'
import React from 'react'
import { push } from 'react-router-redux'
import { Container, Header, Label, Button } from 'semantic-ui-react'
import { Icon, Menu } from 'semantic-ui-react'
import '../style/common.sass'

class Layout extends React.Component {
    render() {
        return (
            <div>
                <Menu stackable inverted fixed="top" className="header-z-index-fix">
                    <Container>
                        <Menu.Item onClick={this.props.dashboard}>
                            <Icon bordered inverted color='teal' name="talk" />
                            <span className="pleft15">Microconf</span>
                        </Menu.Item>
                        { this.props.activeView !== 'new' ?
                            <Menu.Item name='createnew' active={false} onClick={this.props.addNew}>
                                <Icon name='plus' />
                                suggest a topic
                            </Menu.Item> : null
                        }
                        <Menu.Menu position='right'>
                            <Menu.Item active={this.props.activeView === 'queue'} onClick={this.props.queue}>
                                Queue
                            </Menu.Item>
                            <Menu.Item active={this.props.activeView === 'suggestions'} onClick={this.props.suggestions}>
                                Suggestions
                            </Menu.Item>
                            <Menu.Item active={this.props.activeView === 'archive'} onClick={this.props.archive}>
                                Archive
                            </Menu.Item>
                            { this.props.aid ?
                                <Menu.Item>
                                    <Icon name='user' color='teal' size='big' />
                                </Menu.Item>
                                :
                                <Menu.Item>
                                    <Button size='mini' color='teal'>GitHub Login</Button>
                                </Menu.Item>
                            }
                        </Menu.Menu>
                    </Container>
                </Menu>
                <Container text className="main">
                    {this.props.children}
                </Container>
            </div>
        )
    }
}

export default connect(
    state => {
        return {
            activeView: state.layout.activeView,
            aid: state.account.aid
        }
    },
    dispatch => {
        return {
            addNew: () => dispatch(push('/new')),
            queue: () => dispatch(push('/queue')),
            suggestions: () => dispatch(push('/suggestions')),
            dashboard: () => dispatch(push('/')),
            archive: () => dispatch(push('/archive'))
        }
    }
)(Layout)
