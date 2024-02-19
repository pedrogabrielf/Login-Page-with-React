
from flask import jsonify
from models.user_model import User
from flask_sqlalchemy import SQLAlchemy
from models.user_model import db, User

from models.user_model import User, db

def create_user(username, password, nome, email, numero):
    new_user = User(username=username, password=password, nome=nome, email=email, numero=numero)
    db.session.add(new_user)
    db.session.commit()
    return new_user  # Return the user object instead of a tuple

def get_all_users():
    users = User.query.all()
    result = [{'id': user.id, 'username': user.username, 'nome': user.nome, 'email': user.email, 'numero': user.numero, 'password': user.password} for user in users]
    return result

def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if user:
        return {'id': user.id, 'username': user.username, 'nome': user.nome, 'email': user.email, 'numero': user.numero}
    else:
        return None

def update_user(user_id, data):
    user = User.query.get(user_id)
    if user:
        user.username = data['username']
        user.password = data['password']
        user.nome = data['nome']
        user.email = data['email']
        user.numero = data['numero']
        db.session.commit()
        return {'message': 'Usuário atualizado com sucesso'}
    else:
        return {'message': 'Usuário não encontrado'}, 404

def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return {'message': 'Usuário excluído com sucesso'}
    else:
        return {'message': 'Usuário não encontrado'}, 404

def login_user(username, password):
    user = User.query.filter_by(username=username, password=password).first()

    if user:
        return {'message': 'Autenticação bem-sucedida', 'user_id': user.id}, 200
    else:
        return {'message': 'Autenticação falhou'}, 401