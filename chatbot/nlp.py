from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

tokenizer = AutoTokenizer.from_pretrained("microsoft/GODEL-v1_1-base-seq2seq")
model = AutoModelForSeq2SeqLM.from_pretrained("microsoft/GODEL-v1_1-base-seq2seq")

def get_bot_response(user_input):
    dialog = f"[CONTEXT] {user_input} [QUESTION] What would be a helpful response?"
    inputs = tokenizer(dialog, return_tensors="pt")
    generated_ids = model.generate(**inputs, max_length=100)
    response = tokenizer.decode(generated_ids[0], skip_special_tokens=True)
    return response
