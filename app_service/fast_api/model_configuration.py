from tensorflow.keras.models import load_model
import os

from PIL import Image
import numpy as np

class ModelConfiguration:
    def __init__(self):
        self.model_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'h5_files')
        self.model_path = os.path.join(self.model_directory, 'best_model_gpt.h5')
        self.model = load_model(self.model_path)
    
    def get_model(self):
        return self.model
    
    def image_preprocess(self, img):
        image = Image.open(img)
        image = image.resize((299, 299))
        image = np.array(image) / 255.0
        image = np.expand_dims(image, axis=0)
        return image

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
                      '2157051006',
                      ]
        return class_name