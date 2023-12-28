from tensorflow.keras.models import load_model
import os
import cv2
from PIL import Image
import numpy as np
from io import BytesIO

class ModelConfiguration:
    def __init__(self):
        self.model_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'h5_files')
        self.model_path = os.path.join(self.model_directory, 'best_model_gpt.h5')
        self.model = load_model(self.model_path)
        self.height = self.model.layers[0].input_shape[0][1]
        self.width = self.model.layers[0].input_shape[0][2]
    
    def get_model(self):
        return self.model
    
    def image_crops(self,img):
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.05, 5)
        for (x,y,w,h) in faces:
            img = img[y:y+h, x:x+w]
        return img
    
    def image_preprocess(self, img):
        img_bytesio = BytesIO(img)
        image = Image.open(img_bytesio)
        image = image.resize((self.height, self.width))
        image_array = np.expand_dims(np.array(image), axis=0)
        return image_array

    def get_class_name(self):
        class_name = ['2017051001',
                      '2017051017',
                      '2117051009',
                      '2117051019',
                      '2117051027',
                      '2117051043',
                      '2117051048',
                      '2117051050',
                      '2117051095',
                      '2157051001',
                      '2157051006']
        return class_name