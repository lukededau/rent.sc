import React from 'react'
import firebase from '../firebase'
import { Card, Container, ListGroup } from 'react-bootstrap'

class ReviewListObject extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <Container fluid>
                    <Card>
                        <Card.Body>
                            <Card.Title className='text-muted'>{this.props.reviewer_username} says:</Card.Title>
                            <Card.Text>{this.props.review}</Card.Text>
                        </Card.Body>
                        <ListGroup className='list-group-flush'>
                            <ListGroup.Item>considerate: {this.props.considerate}</ListGroup.Item>
                            <ListGroup.Item>friendliness: {this.props.friendliness}</ListGroup.Item>
                            <ListGroup.Item>lenient: {this.props.lenient}</ListGroup.Item>
                            <ListGroup.Item>responsiveness: {this.props.responsiveness}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Container>
            </div>
        )
    }
}

export default ReviewListObject