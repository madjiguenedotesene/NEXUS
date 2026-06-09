from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv() 
app = Flask(__name__)
CORS(app)

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")

def get_auth_token():
    # 🌟 CORRECTION CRITIQUE : Remplacement de l'ancienne URL Pôle Emploi
    auth_url = "https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=%2Fpartenaire"
    
    # Nettoyage du scope (l'ancien format pouvait être rejeté)
    scope = "api_offresdemploiv2 o2dsoffre" 
    
    data = {
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "scope": scope
    }
    
    # On force l'affichage de l'erreur dans les logs de Render si ça plante
    r = requests.post(auth_url, data=data, timeout=10)
    if r.status_code != 200:
        print(f"❌ Erreur Authentification France Travail ({r.status_code}) : {r.text}")
        return None
    return r.json().get("access_token")

def fetch_elanpro_jobs(query, page=1):
    token = get_auth_token()
    if not token: 
        return {"jobs": [], "total": 0}

    par_page = 6
    debut = (page - 1) * par_page
    fin = debut + par_page - 1
    
    search_url = "https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search"
    params = {"motsCles": query, "range": f"{debut}-{fin}", "sort": "1"}
    headers = {"Authorization": f"Bearer {token}", "Accept": "application/json"}

    response = requests.get(search_url, headers=headers, params=params, timeout=10)
    
    # Si l'API répond 204, c'est qu'il n'y a pas d'offres pour ce mot-clé en ce moment
    if response.status_code == 204:
        return {"jobs": [], "total": 0}
        
    if response.status_code != 200:
        print(f"❌ Erreur Recherche Offres ({response.status_code}) : {response.text}")
        return {"jobs": [], "total": 0}

    total_count = 0
    content_range = response.headers.get('Content-Range')
    if content_range:
        total_count = int(content_range.split('/')[-1])

    items = response.json().get('resultats', []) or []
    jobs = []
    for i in items:
        jobs.append({
            "id": i.get('id'),
            "titre": i.get('intitule'),
            "entreprise": i.get('entreprise', {}).get('nom', 'Anonyme'),
            "localisation": i.get('lieuTravail', {}).get('libelle', 'France'),
            "description": i.get('description', ''),
            "typeContrat": i.get('typeContratLibelle', 'CDI/CDD'),
            "url_postulation": i.get('origineOffre', {}).get('urlOrigine')
        })
    return {"jobs": jobs, "total": total_count}

@app.route('/api/v1/elanpro/jobs', methods=['GET'])
def api_elanpro():
    query = request.args.get('q', '')
    try:
        page = int(request.args.get('p', 1))
    except:
        page = 1
        
    if not query:
        return jsonify({"status": "error", "message": "Query vide"}), 400
        
    result = fetch_elanpro_jobs(query, page)
    return jsonify({
        "status": "success",
        "total": result["total"],
        "data": result["jobs"]
    })

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5001))
    app.run(host='0.0.0.0', port=port)