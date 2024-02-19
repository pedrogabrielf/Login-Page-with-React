from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    nome = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    numero = db.Column(db.String(20), unique=True, nullable=False)

    def __init__(self, username, password, nome, email, numero):
        self.username = username
        self.password = password
        self.nome = nome
        self.email = email
        self.numero = numero
