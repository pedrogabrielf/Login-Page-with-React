import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function Home() {
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        nome: '',
        email: '',
        numero: '',
        password: ''
    });

    const fetchUsers = () => {
        fetch('http://127.0.0.1:5000/users/all')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    };

    const handleClose = () => {
        setShow(false);
        // Limpar o formulário ao fechar o modal
        setFormData({
            username: '',
            nome: '',
            email: '',
            numero: '',
            password: ''
        });
        setEditMode(false);
        setEditUserId(null);
    }

    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleEditUser = (userId) => {
        const userToEdit = users.find(user => user.id === userId);

        setEditMode(true);
        setEditUserId(userId);

        setFormData({
            username: userToEdit.username,
            nome: userToEdit.nome,
            email: userToEdit.email,
            numero: userToEdit.numero,
            password: userToEdit.password,
        });

        handleShow();
    }

    const handleDeleteUser = (userId) => {
        fetch(`http://127.0.0.1:5000/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('User deleted successfully:', data);
            fetchUsers();
        })
        .catch(error => console.error('Error deleting user:', error));
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const requestBody = {
            username: formData.username,
            nome: formData.nome,
            email: formData.email,
            numero: formData.numero,
            password: formData.password
        };

        const url = editMode ? `http://127.0.0.1:5000/users/${editUserId}` : 'http://127.0.0.1:5000/users';

        fetch(url, {
            method: editMode ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            fetchUsers();
            handleClose();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        // Buscar os usuários ao montar o componente
        fetchUsers();
    }, []); // O array vazio garante que isso seja executado apenas uma vez ao montar o componente

    return (
        <div className="Home">
            <div className="container">
                <div className="crud shadow-lg p-3 mb-5 mt-5 rounded"> 
                    <div className="row">
                        <div className="col-sm-3 mt-5 mb-4 text-gred">
                            <div className="search">
                                <form className="form-inline">
                                    <input
                                        className="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Search User"
                                        aria-label="Search"
                                    />
                                </form>
                            </div>    
                        </div>  
                        <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}>
                            <h2><b>User Details</b></h2>
                        </div>
                        <div className="col-sm-3 offset-sm-1 mt-5 mb-4 text-gred">
                            <Button variant="primary" onClick={handleShow}>
                                Add New User
                            </Button>
                        </div>
                    </div>  
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Username</th>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Número</th>
                                        <th>Password</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.nome}</td>
                                            <td>{user.email}</td>
                                            <td>{user.numero}</td>
                                            <td>{user.password}</td>
                                            <td>
                                                <Button variant="warning" onClick={() => handleEditUser(user.id)}>
                                                    Edit
                                                </Button>{' '}
                                                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>  

                    <div className="model_box">
                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>{editMode ? 'Edit User' : 'Add New User'}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleFormSubmit}>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formNome">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Nome"
                                            name="nome"
                                            value={formData.nome}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter Password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter Email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formNumero">
                                        <Form.Label>Número</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Número"
                                            name="numero"
                                            value={formData.numero}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        {editMode ? 'Save Changes' : 'Save'}
                                    </Button>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>  
                </div>    
            </div>  
        </div>
    );
}

export default Home;
