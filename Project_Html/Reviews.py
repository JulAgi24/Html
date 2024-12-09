from flask import Flask , request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route("/request", methods = ["GET","POST"])
def req():
    if(request.method == "POST"):
        print("sus")
    elif(request.method == "Get"):
        print("bus")
    
if __name__ == '__main__':
    app.run()