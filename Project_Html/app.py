from flask import Flask, render_template , request , jsonify
import os
import json

app = Flask(__name__,template_folder = os.getcwd(),static_url_path = '', static_folder = 'web')
@app.route("/")
def render():
    return render_template('homepage.html')

@app.route("/homepage.html")
def render_home():
    return render_template('homepage.html')

@app.route("/output",methods = ['GET'])
def json_return():
    file_path = os.path.join(os.getcwd(), "output.json")
    with open(file_path, mode='r') as file:
        data = json.load(file)
    return jsonify(data)

@app.route("/user_review.html")
def render_user():
    return render_template('user_review.html')

@app.route("/attractions.html")
def render_att():
    return render_template('attractions.html')

@app.route("/famouspeople.html")
def render_fam():
    return render_template('famouspeople.html')

@app.route("/submit", methods = ['POST'])
def submit():
    name = request.form.get('name')
    username = request.form.get('surname')
    review = request.form.get('review')
    date = request.form.get('date')
    date = date.replace("T"," ")

    user_review = {
    'Name': name,
    'Username': username,
    'Review': review,
    'Date': date
    }

    
    file_path = os.path.join(os.getcwd(), "output.json")
    if os.path.exists(file_path) :
        with open(file_path, 'r') as file:
            if os.path.getsize(file_path) != 0:
                data = json.load(file)
            else:
                data = []
    else:
        data = []

    data.append(user_review)

    
    with open(file_path, 'w') as file:
        json.dump(data,file,indent= 4)
        
    return render_template('user_review.html')

if __name__ == '__main__':
    app.run(debug=True)
