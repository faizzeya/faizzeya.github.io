!pip install transformers
!pip install gradio
from transformers import pipeline

model = pipeline("text-generation")


def predict(prompt):
    completion = model(prompt)[0]["generated_text"]
    return completion

import gradio as gr

demo = gr.Interface(fn=predict, inputs="text", outputs="text",title="Faiz ul haque Zeya gradio text completion page",
description="This is text completion program that uses transformer library to complete and gradio to display")
    
demo.launch(share=True)   