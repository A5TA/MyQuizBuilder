from flask import Flask
import openai
from dotenv import load_dotenv
import os
load_dotenv()

app = Flask(__name__)

@app.route("/")
def hello_world():  
    return "<p>Hello, World!</p>"

@app.route("/getAnswers")
def hello_world2():
    return generate_wrong_answers("What are the 4 benefits of OOP?", "Encapsulation, Inheritance, PolyMorphism, and Abstraction")
    



#This is the functions that returns all the incorrect choices for the provided input
def generate_wrong_answers(question, correct_answer):
    # Generate three wrong answers to this array that is returned 
    wrong_answers = []

    for i in range(3):
        usedAnswers = ""
        for j in range(len(wrong_answers)):       
            if j == len(wrong_answers) - 1:
                usedAnswers = wrong_answers[j] + ""
            else:
                usedAnswers = wrong_answers[j] + ", "
        
        if len(wrong_answers) > 0:
            response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=f"Create a wrong answer for the question: '{question}' given that we already have the wrong answers as '{usedAnswers}'\nCorrect Answer: {correct_answer}\nWrong Answer:",
            max_tokens=50,
            api_key=os.getenv("CHAT_GPT_API_KEY"),
        ) 
        else:
            response = openai.Completion.create(
                engine="text-davinci-002",
                prompt=f"Create a wrong answer for the question: '{question}'\nCorrect Answer: {correct_answer}\nWrong Answer:",
                max_tokens=50,
                api_key=os.getenv("CHAT_GPT_API_KEY"),
            )
        wrong_answer = response.choices[0].text.strip()
        wrong_answers.append(wrong_answer)

    return wrong_answers