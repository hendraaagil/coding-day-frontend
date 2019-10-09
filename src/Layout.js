import React from 'react';
import { clearToken, getToken } from './utils';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { logout } from './auth/api';

function Layout(props) {
    const { children, history } = props;
    const handleLogout = () => {
        const token = getToken();

        clearToken();
        logout(token)
            .finally(() => {
                history.push('/login');
            })
    };

    return (
        <Container fluid>
            <Row className="mt-3">
                <Col md={3} className="mb-3">
                    <ListGroup>
                        <ListGroupItem tag={Link} to="/" action>
                            Dashboard
                        </ListGroupItem>
                        <ListGroupItem tag={Link} to="/sales" action>
                            Penjualan
                        </ListGroupItem>
                        <ListGroupItem tag={Link} to="/purchases" action>
                            Pembelian
                        </ListGroupItem>
                        <ListGroupItem tag={Link} to="/products" action>
                            Produk
                        </ListGroupItem>
                        <ListGroupItem tag={Link} to="/categories" action>
                            Kategori
                        </ListGroupItem>
                        <ListGroupItem tag={Link} to="/suppliers" action>
                            Supplier
                        </ListGroupItem>
                        <ListGroupItem
                            tag="a"
                            href="#"
                            onClick={handleLogout}
                            className="text-danger"
                            action
                        >
                            Logout
                        </ListGroupItem>
                    </ListGroup>
                </Col>

                <Col
                    style={{
                        minHeight: 500,
                        paddingBottom: 100
                    }}
                >
                    {children}
                </Col>
            </Row>
        </Container>
    );
}

export default Layout;