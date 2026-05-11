from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
load_dotenv() # Charge les variables du fichier .env
app = Flask(__name__)
CORS(app)

# CONFIGURATION API FRANCE TRAVAIL



CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")

def get_auth_token():
    auth_url = "https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=%2Fpartenaire"
    scope = f"api_offresdemploiv2 o2dsoffre application_{CLIENT_ID}"
    data = {
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "scope": scope
    }
    try:
        r = requests.post(auth_url, data=data, timeout=10)
        return r.json().get("access_token")
    except:
        return None

def fetch_elanpro_jobs(query, page=1):
    token = get_auth_token()
    if not token: return {"jobs": [], "total": 0}

    par_page = 6
    debut = (page - 1) * par_page
    fin = debut + par_page - 1
    
    search_url = "https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search"
    params = {"motsCles": query, "range": f"{debut}-{fin}", "sort": "1"}
    headers = {"Authorization": f"Bearer {token}", "Accept": "application/json"}

    try:
        response = requests.get(search_url, headers=headers, params=params, timeout=10)
        
        # Extraction du nombre total global depuis le header Content-Range
        total_count = 0
        content_range = response.headers.get('Content-Range')
        if content_range:
            # Format: offres 0-5/1250 -> on récupère 1250
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
    except:
        return {"jobs": [], "total": 0}

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
    app.run(host='0.0.0.0', port=5001, debug=True)