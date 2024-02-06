from flask import Flask, jsonify, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from flasgger import Swagger
from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
Swagger(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/teste'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.getenv('FLASK_SECRET_KEY')

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    numero = db.Column(db.String(20), unique=True, nullable=False)

# Configuração do OAuth
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id='46323615356-ikelrlgnntdirv9tim8b89gvp03tl0d1.apps.googleusercontent.com',
    client_secret='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',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    client_kwargs={'scope': 'openid email profile'},
)

@app.route('/')
def home():
    return jsonify({'message': 'Bem-vindo ao seu aplicativo Flask com OAuth 2.0!'})

@app.route('/login')
def login():
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)

@app.route('/authorize')
def authorize():
    token = google.authorize_access_token()
    resp = google.get('userinfo')
    user_info = resp.json()
    session['user'] = user_info
    # Aqui você poderia adicionar lógica para verificar se o usuário já existe no banco de dados
    # e redirecionar ou tratar conforme necessário
    return redirect('/')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect('/')

# As rotas existentes para manipulação de usuários permanecem as mesmas
# ...

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
