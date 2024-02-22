import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

function Home() {
    const [show, setShow] = useState(false);
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
    }

    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Aqui você deve ajustar os campos do corpo conforme seu formulário
        const requestBody = {
            username: formData.username,
            nome: formData.nome,
            email: formData.email,
            numero: formData.numero,
            password: formData.password
        };

        fetch('http://127.0.0.1:5000/users', {
            method: 'POST',
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
            // Lógica adicional após o sucesso, se necessário
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleEditUser = (userId) => {
        // Implemente a lógica para editar um usuário
        console.log(`Editando usuário com ID ${userId}`);
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
            console.log(`Editando usuário com ID ${userId}`);
            console.log('User deleted successfully:', data);
            fetchUsers();
        })
        .catch(error => console.error('Error deleting user:', error));
    }

    useEffect(() => {
        // Buscar os usuários ao montar o componente
        fetch('http://127.0.0.1:5000/users/all')
            .then(response => response.json())
            .then(data => setUsers(data));
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
                                                {/* <Button variant="info" onClick={() => handleViewUser(user.id)}>
                                                    View
                                                </Button>{' '} */}
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

                    {/* <!--- Model Box ---> */}
                    <div className="model_box">
                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Update</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
    <form onSubmit={handleFormSubmit}>
        <div className="form-group">
            <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleInputChange}
            />
        </div>
        <div className="form-group mt-3">
            <input
                type="text"
                className="form-control"
                name="nome"
                placeholder="Enter Nome"
                value={formData.nome}
                onChange={handleInputChange}
            />
        </div>
        <div className="form-group mt-3">
            <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
            />
        </div>
        <div className="form-group mt-3">
            <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleInputChange}
            />
        </div>
        <div className="form-group mt-3">
            <input
                type="text"
                className="form-control"
                name="numero"
                placeholder="Enter Número"
                value={formData.numero}
                onChange={handleInputChange}
            />
        </div>
        
        <button type="submit" className="btn btn-success mt-4">Save</button>
    </form>
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
