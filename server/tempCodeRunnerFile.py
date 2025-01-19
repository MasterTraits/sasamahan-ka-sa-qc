def chat_with_ai():
    while True:
        user_input = input("You: ")
        if user_input.lower() in ['quit', 'exit', 'bye']:
            break
            
        response = model.generate_content([
            {"role": "user", "parts": [user_input]}
        ])
        print("\nAI: ", response.text)