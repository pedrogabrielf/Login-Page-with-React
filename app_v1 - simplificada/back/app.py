from flask import Flask, request, jsonify
from flasgger import Swagger
from models.user_model import db 
from flask_cors import CORS
from flask_cors import cross_origin

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://aaa:aaa@localhost:5432/postgres'

# Configuração para evitar o warning 'SQLALCHEMY_DATABASE_URI'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
# Importa os controladores
from controllers.user_controller import create_user, get_all_users, get_user_by_id, login_user, update_user, delete_user

@app.route('/users', methods=['POST'])
@cross_origin()
def create_user_route():
    """
    Create a new user
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            username:
              type: string
            password:
              type: string
            nome:
              type: string
            email:
              type: string
            numero:
              type: string
    responses:
      201:
        description: User created successfully
    """
    data = request.get_json()
    new_user = create_user(data.get('username'), data.get('password'), data.get('nome'), data.get('email'), data.get('numero'))
    return jsonify({'message': 'Usuário criado com sucesso', 'user_id': new_user.id}), 201

@app.route('/users/all', methods=['GET'])
@cross_origin()
def get_all_users_route():
    """
    Retrieve a list of all users
    ---
    responses:
      200:
        description: A list of users
    """
    users = get_all_users()
    return jsonify(users)

@app.route('/users/<int:user_id>', methods=['GET'])
@cross_origin()
def get_user_by_id_route(user_id):
    """
    Retrieve a user by ID
    ---
    parameters:
      - name: user_id
        in: path
        type: integer
        required: true
    responses:
      200:
        description: User retrieved successfully
      404:
        description: User not found
    """
    user = get_user_by_id(user_id)
    if user:
        return jsonify(user)
    else:
        return jsonify({'message': 'Usuário não encontrado'}), 404

@app.route('/users/<int:user_id>', methods=['PUT'])
@cross_origin()
def update_user_route(user_id):
    """
    Update a user by ID
    ---
    parameters:
      - name: user_id
        in: path
        type: integer
        required: true
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            username:
              type: string
            password:
              type: string
            nome:
              type: string
            email:
              type: string
            numero:
              type: string
    responses:
      200:
        description: User updated successfully
      404:
        description: User not found
    """
    data = request.get_json()
    result = update_user(user_id, data)
    return jsonify(result)

@app.route('/users/<int:user_id>', methods=['DELETE'])
@cross_origin()
def delete_user_route(user_id):
    """
    Delete a user by ID
    ---
    parameters:
      - name: user_id
        in: path
        type: integer
        required: true
    responses:
      200:
        description: User deleted successfully
      404:
        description: User not found
    """

    result = delete_user(user_id)

    return jsonify(result)

@app.route('/login', methods=['POST'])
@cross_origin()
def login_route():
    """
    Authenticate a user
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            username:
              type: string
            password:
              type: string
    responses:
      200:
        description: Authentication successful
      401:
        description: Authentication failed
    """
    data = request.get_json()
    result, status_code = login_user(data['username'], data['password'])
    return jsonify(result), status_code

swagger = Swagger(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
