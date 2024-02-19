from flask import Flask, request, jsonify, redirect, url_for, session
from flasgger import Swagger
from models.user_model import db 
from flask_cors import CORS, cross_origin
from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv
import os

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/teste'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializa a extensão do banco de dados com o app
db.init_app(app)


# Configuração da sessão
app.secret_key = os.getenv('FLASK_SECRET_KEY')
app.config['SESSION_COOKIE_NAME'] = 'google-login-session'



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
    server_metadata_url='https://dev-ztus8r38g1f23gnd.US-4.auth0.com/.well-known/openid-configuration'
)


# Importa os controladores
from controllers.user_controller import create_user, get_all_users, get_user_by_id, login_user, update_user, delete_user

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
    return redirect('/')

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect('/')

# Aqui você adicionaria suas outras rotas, como as rotas para gerenciar usuários
# Por exemplo:
@app.route('/users', methods=['POST'])
@cross_origin()
def create_user_route():
    # Seu código existente aqui
    pass

# Lembre-se de adicionar as demais rotas para suas funcionalidades

swagger = Swagger(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
