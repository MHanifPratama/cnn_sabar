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
        image = image.resize((54, 54))
        image = np.array(image) / 255.0
        image = np.expand_dims(image, axis=0)
        return image

    def get_class_name(self):
        class_name = ['1917051029',
                      '1917051033',
                      '1917051041',
                      '1917051047',
                      '2007051002',
                      '2007051011',
                      '2007051014',
                      '2007051044',
                      '2017051002',
                      '2017051004',
                      '2017051005',
                      '2017051007',
                      '2017051009',
                      '2017051010',
                      '2017051011',
                      '2017051013',
                      '2017051014',
                      '2017051016',
                      '2017051019',
                      '2017051020',
                      '2017051026',
                      '2017051027',
                      '2017051028',
                      '2017051031',
                      '2017051033',
                      '2017051035',
                      '2017051036',
                      '2017051039',
                      '2017051040',
                      '2017051043',
                      '2017051044',
                      '2017051045',
                      '2017051050',
                      '2017051051',
                      '2017051052',
                      '2017051057',
                      '2017051059',
                      '2017051067',
                      '2017051068',
                      '2017051070',
                      '2017051072',
                      '2017051073',
                      '2017051074',
                      '2017051079',
                      '2017051081',
                      '2017051083',
                      '2017051084',
                      '2017051087',
                      '2057051001',
                      '2057051003',
                      '2057051005',
                      '2057051006',
                      '2057051009',
                      '2057051010',
                      '2057051013',
                      '2057051016',
                      '2057051020',
                      '2057051022',
                      '2057051024',
                      '2057051025',
                      '2067051001']
        return class_name