import random
from flask import Flask, jsonify, request
from flask_cors import CORS
import openai
import json
from dotenv import load_dotenv
import os
import sqlite3
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS so we can actually communicate with the frontend


connect = sqlite3.connect('database.db', check_same_thread=False) 
connect.execute('CREATE TABLE IF NOT EXISTS QUIZ (id INTEGER PRIMARY KEY, name TEXT, length INTEGER, qna TEXT)') 
print("Table created and connected!")
connect.close()
openai.api_key = os.getenv("CHAT_GPT_API_KEY")

@app.route("/")
def hello_world():  
    return "<p>Hello, World!</p>"

@app.route('/createKey',methods = ['POST'])
def create_key():
   if request.method == 'POST':
        connect = sqlite3.connect('database.db', check_same_thread=False) 
        try:
            request_data = request.get_json() #Get the Json of the data sent to the flask server
            print(request_data)
            name = request_data['name'] #Name of the quiz provided by the user
            length = request_data['length'] #Amount of questions total
            qna = json.dumps(request_data['qna'])  # Questions and answers
            
            app.logger.info("Received request with name: %s, length: %s, city: %s", name, length, qna)
            # Use the 'connect' variable to execute the INSERT
            cur = connect.cursor()
            cur.execute("INSERT INTO QUIZ (name, length, qna) VALUES (?,?,?)", (name, length, qna))

            # Get the ID of the newly inserted record
            inserted_id = cur.lastrowid

            connect.commit()
            msg = "Quiz successfully added to the database with ID: {}".format(inserted_id)
        except Exception as e:
            msg = "Error in the INSERT: {}".format(e)
            connect.close()
            return jsonify({"message": msg})

        # Send message after inserting
        print("Finished inserting")
        connect.close()
        return jsonify({"message": msg, "id": inserted_id})
    
@app.route('/getKey/<key>',methods = ['GET'])
def get_key(key): 
    if request.method == 'GET':
        connect = sqlite3.connect('database.db', check_same_thread=False) 
        connect.row_factory = sqlite3.Row
        cur = connect.cursor()
        cur.execute("SELECT rowid, * FROM QUIZ WHERE rowid = " + key)
        data = cur.fetchone()  # Retrieve the row
        
        if data is not None:
            # Create a dict with the json structure
            quiz_dict = {
                "id": data["id"],
                "name": data["name"],
                "length": data["length"],
                "qna": json.loads(data["qna"])  # Deserialize the json to object
            }
            connect.close()
            return jsonify(quiz_dict)  # Return the data as JSON
        else:
            connect.close()
            return jsonify({"message": "No quiz found for key: " + str(key)})

@app.route('/getAllKeys',methods = ['GET'])
def get_all_keys(): 
    if request.method == 'GET':
        connect = sqlite3.connect('database.db', check_same_thread=False) 
        connect.row_factory = sqlite3.Row
        cur = connect.cursor()
        cur.execute("SELECT rowid, * FROM QUIZ ")
        data = cur.fetchall()  # Retrieves all the rows is what the fetchall does
        
        if data is not None:
            # Create a dict with the json structure
            connect.close()
            quiz_list = [{"id": row["id"], "name": row["name"]} for row in data]
            return jsonify(quiz_list)  # Return the data as JSON
        else:
            connect.close()
            return jsonify({"message": "No quizes found!"})

@app.route('/gradeQuiz',methods = ['POST'])
def grade_quiz():
    if request.method == 'POST':
        try:
            request_data = request.get_json() #Get the Json of the data sent to the flask server
            result = []
            for i, item in enumerate(request_data, 1):
                # question = item['question'] # we don't really need this in this case
                correct_answer = item['answer']
                inputed_answer = item['userAnswer']
                prompt = (
                    f"You are a 'high', or 'low' answering computer that grades on similarity not exact accuracy so you aren't case sensitive"
                    f"Compare the similarity between the correct answer: '{correct_answer}' "
                    f"and the provided answer to grade: '{inputed_answer}'."
                    f"Response must be either 'high' or 'low' so NO other text"
                )
                response = grade_answer(prompt)
                result.append(response)
   

            print(request_data)
        
        except Exception as e:
            return jsonify({"message": "Something went wrong"})

        return jsonify({"message": result})


def grade_answer(prompt):
    response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt}])
    
    return response.choices[0].message.content
    #These are commented out so we don't make api requests during testing
    # return random.choice(['high', 'low'])