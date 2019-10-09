import React, { useState } from 'react';
import {
    Alert,
    Button,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import toast from 'toasted-notes';

import { login } from './api';
import { saveToken } from '../utils';

function LoginPage(props) {
    const { history } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = e => setEmail(e.target.value);
    const handleChangePassword = e => setPassword(e.target.value);
    const handleLogin = e => {
        e.preventDefault();

        // Call api
        const payload = { email, password };
        login(payload)
            .then(response => {
                const token = response.data.api_token;
                saveToken(token);
                history.push('/');
            })
            .catch(error => {
                const message = error.response
                    ? error.response.data.message
                    : 'Login gagal';

                toast.notify(({ onClose }) => (
                    <Alert color="danger" toggle={onClose}>
                        {message}
                    </Alert>
                ))
            });
    };

    return (
        <Container>
            <Row>
                <Col
                    sm={{
                        size: 6,
                        offset: 3
                    }}
                >
                    <h2 className="mt-5 mb-3">Login</h2>
                    <Form onSubmit={handleLogin}>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                value={email}
                                onChange={handleChangeEmail}
                                type="email"
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Password</Label>
                            <Input
                                value={password}
                                onChange={handleChangePassword}
                                type="password"
                                required
                            />
                        </FormGroup>
                        <Button color="primary">Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;