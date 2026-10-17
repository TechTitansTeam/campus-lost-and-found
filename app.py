from flask import Flask, render_template, request, jsonify, redirect, url_for

app = Flask(__name__)

# Temporary in-memory database
items_db = [
    {
        "id": 1,
        "title": "Blue Water Bottle",
        "type": "lost",
        "location": "Central Library",
        "description": "Milton stainless steel bottle, left near reading table 4."
    },
    {
        "id": 2,
        "title": "Black Wallet",
        "type": "found",
        "location": "Main Canteen",
        "description": "Found near billing counter containing student ID card."
    }
]

@app.route('/')
def home():
    return render_template('index.html', items=items_db)

@app.route('/report')
def report_page():
    return render_template('report.html')

@app.route('/feed')
def feed_page():
    return render_template('feed.html', items=items_db)

@app.route('/api/items', methods=['GET'])
def get_items():
    return jsonify(items_db)

@app.route('/api/items', methods=['POST'])
def add_item():
    data = request.get_json()
    new_item = {
        "id": len(items_db) + 1,
        "title": data.get('title'),
        "type": data.get('type'),
        "location": data.get('location'),
        "description": data.get('description')
    }
    items_db.append(new_item)
    return jsonify({"success": True, "item": new_item})

if __name__ == '__main__':
    app.run(debug=True)