from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flasgger import Swagger

app = Flask(__name__)
Swagger(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://aaa:aaa@localhost:5432/postgres'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    numero = db.Column(db.String(20), unique=True, nullable=False)

@app.route('/')
def home():
    return jsonify({'message': 'Bem-vindo ao seu aplicativo Flask!'})

@app.route('/users/all', methods=['GET'])
def get_all_users():
    """
    Retrieve a list of all users
    ---
    responses:
      200:
        description: A list of users
    """
    users = User.query.all()
    result = [{'id': user.id, 'username': user.username, 'nome': user.nome, 'email': user.email, 'numero': user.numero} for user in users]
    return jsonify(result)

@app.route('/users', methods=['POST'])
def create_user():
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
    new_user = User(username=data['username'], password=data['password'], nome=data['nome'], email=data['email'], numero=data['numero'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Usuário criado com sucesso'}), 201

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
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
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'Usuário não encontrado'}), 404

    data = request.get_json()
    user.username = data['username']
    user.password = data['password']
    user.nome = data['nome']
    user.email = data['email']
    user.numero = data['numero']
    db.session.commit()
    return jsonify({'message': 'Usuário atualizado com sucesso'})

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
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
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'Usuário não encontrado'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Usuário excluído com sucesso'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)
