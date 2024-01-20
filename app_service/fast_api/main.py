from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
from io import BytesIO
from model_configuration import *

class ImageData(BaseModel):
    image:str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_pred = ModelConfiguration()
model = model_pred.get_model()
@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/test")
async def test(text: str):
    tes = text
    json_data = {
         'text': tes
    }
    return json_data


@app.post("/predict_image")
async def predict_image_api(image: UploadFile = File(...)):
    if image:
        class_name = model_pred.get_class_name()
        # image = model_pred.image_crops(image.file)
        image_content = await image.read()
        image_array = model_pred.image_preprocess(image_content)
        predictions = model.predict(image_array)
        predicted_class = np.argmax(predictions, axis=1)
        class_probabilities = predictions.tolist()[0]
        predicted_npm = class_name[int(predicted_class)]
        json_data = {
            'predicted_class': int(predicted_class),
            'predicted_npm': predicted_npm,
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
        image = image.resize((54, 54))
        image = np.array(image) / 255.0
        image = np.expand_dims(image, axis=0)
        predictions = model.predict(image)
        predicted_class = np.argmax(predictions, axis=1)
        class_probabilities = predictions.tolist()[0]
        predicted_npm = class_name[int(predicted_class)]
        json_data = {
            'predicted_class': int(predicted_class),
            'predicted_npm': predicted_npm,
            'class_probabilities': class_probabilities,
        }
        return json_data
    else:
        return {"message": "No image uploaded"}
    
@app.post("/face-attendance")
async def face_attendance(npm: str):
    if npm == "gaada orang":
        pass
    else:
        if npm not in list_mahasiswa:
            pass
        else:
            json_data = {
                'npm': npm,
                'hadir': True,
            }
            return json_data