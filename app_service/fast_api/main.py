from fastapi import FastAPI, File, UploadFile, Request
from pydantic import BaseModel
import base64
from io import BytesIO
from model_configuration import *

class ImageData(BaseModel):
    image:str

app = FastAPI()
model_pred = ModelConfiguration()
model = model_pred.get_model()
@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/test")
async def test():
    return {"message": "Hello Test"}


@app.post("/predict-image")
async def predict_image_api(image: UploadFile = File(...)):
    if image:
        class_name = model_pred.get_class_name()
        image_array = model_pred.image_preprocess(image.file)
        predictions = model.predict(image_array)
        predicted_class = np.argmax(predictions, axis=1)
        class_probabilities = predictions.tolist()[0]
        predicted_name = class_name[int(predicted_class)]
        json_data = {
            'predicted_class': int(predicted_class),
            'predicted_name': predicted_name,
            'class_probabilities': class_probabilities,
        }
        return json_data
    else:
        return {"message": "No image uploaded"}

@app.post("/predict-image-loop")
async def predict_image_api_loop(image:ImageData):
    if image:
        class_name = model_pred.get_class_name()
        image = image.image
        format, imgstr = image.split(';base64,')
        image_data = base64.b64decode(imgstr)
        image = Image.open(BytesIO(image_data))
        image = image.resize((227, 227))
        image = np.array(image) / 255.0
        image = np.expand_dims(image, axis=0)
        predictions = model.predict(image)
        predicted_class = np.argmax(predictions, axis=1)
        class_probabilities = predictions.tolist()[0]
        predicted_name = class_name[int(predicted_class)]
        json_data = {
            'predicted_class': int(predicted_class),
            'predicted_name': predicted_name,
            'class_probabilities': class_probabilities,
        }
        return json_data
    else:
        return {"message": "No image uploaded"}