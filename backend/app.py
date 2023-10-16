from flask import Flask, jsonify, request
import openai
from dotenv import load_dotenv
import os
import sqlite3
load_dotenv()

app = Flask(__name__)


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
            
            name = request_data['name'] #Name of the quiz provided by the user
            length = request_data['length'] #Amount of questions total
            qna = request_data['qna']  # Questions and answers
            
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
            row_dict = dict(data)  # Convert the row to a dictionary
            connect.close()
            return jsonify(row_dict)  # Return the data as JSON
        else:
            connect.close()
            return jsonify({"message": "No quiz found for key: " + str(key)})



@app.route("/getAnswers")
def get_answers():
    
    
    # question = "What are the 4 benefits of OOP?"
    correct_answer = "Encapsulation, Inheritance, Polymorphism, and Abstraction"
    inputed_answer = "Inheritance, Encapsulation, abstraction, and lol"
    prompt = (
        f"You are a 'high', or 'low' answering computer that grades on similarity not exact accuracy"
        f"Compare the similarity between the correct answer: '{correct_answer}' "
        f"and the provided answer to grade: '{inputed_answer}'."
        f"Response must be either 'high' or 'low' so NO other text"
    )
    
    response = grade_answer(prompt)

    return response

def grade_answer(prompt):
    response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt}])
    
    return response.choices[0].message.content