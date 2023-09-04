from flask import Flask
import openai
from dotenv import load_dotenv
import os
load_dotenv()

app = Flask(__name__)

openai.api_key = os.getenv("CHAT_GPT_API_KEY")

@app.route("/")
def hello_world():  
    return "<p>Hello, World!</p>"


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