from flask import Flask, jsonify, request
import numpy as np
import google.generativeai as genai
import pickle
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
CORS(app)

model = 'models/text-embedding-004'
model_embeddings = pickle.load(open('game_embeddings.pkl', 'rb'))
secret_key = os.getenv('API_KEY')
genai.configure(api_key=secret_key)

def combine_relevant_columns(row):
    relevant_text = f"Title: {row['Title']}\nRelease Date: {row['Release Date']}\nTeam: {row['Team']}\nRating: {row['Rating']}\nGenres: {row['Genres']}\nSummary: {row['Summary']}\nReviews: {row['Reviews']}"
    return relevant_text

def generate_search_query(query, dataset):
    embedding_query = genai.embed_content(
        model = model,
        content = query,
        task_type = 'retrieval_query'
    )
    dot_products = np.dot(np.stack(dataset['Embeddings']), embedding_query['embedding'])
    index = np.argmax(dot_products)
    return combine_relevant_columns(dataset.iloc[index])

second_model = genai.GenerativeModel(
    model_name = 'gemini-1.0-pro'
)

@app.route("/api", methods=["POST"])
def results():
    auth_key = request.headers.get("Authorization")
    if auth_key != secret_key:
        return jsonify({"error": "Unauthorized"}), 401
    
    data = request.get_json(force=True)
    query = data["query"]

    result = generate_search_query(query, model_embeddings)
    prompt = f"""
              Considere a consulta, {query}.
              Reescreva as sentenças de resposta de uma forma alternativa.
              Não se esqueça de comentar, quando necessário, sobre o título, data de lançamento, time, avaliação e comentários, mas de forma emaranhada e natural.
              Não escreva em tópicos.
              Não apresente opções de reescrita.
              Eis o resultado: {result}"
              """
    response = second_model.generate_content(prompt)
    return jsonify({"message": response.text})