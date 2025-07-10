# chatbot/emotion.py

import cv2
from fer import FER

def detect_emotion():
    detector = FER(mtcnn=True)
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("Cannot access webcam")
        return None

    print("Press 'q' to quit webcam feed...")

    emotion_detected = None

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        result = detector.detect_emotions(frame)

        if result:
            emotion_detected = result[0]['emotions']
            dominant = max(emotion_detected, key=emotion_detected.get)
            print(f"Detected Emotion: {dominant}")
            break

        cv2.imshow('Webcam - Press q to exit', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    return dominant if emotion_detected else "neutral"
