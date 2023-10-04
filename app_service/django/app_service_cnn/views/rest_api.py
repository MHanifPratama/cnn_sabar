import base64
from io import BytesIO
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.files.base import ContentFile
from .configuration_model import *



model_pred = ConfigurationModel()
model = model_pred.get_model()


@api_view(['POST'])
def predict_image_api(request):
    if request.method == 'POST' and request.FILES['image']:
        class_name = model_pred.get_class_name()
        uploaded_file = request.FILES['image']
        image_array = model_pred.image_preprocess(uploaded_file)
        predictions = model.predict(image_array)
        predicted_class = np.argmax(predictions, axis=1)
        class_probabilities = predictions.tolist()[0]  
        predicted_name = class_name[int(predicted_class)]
        json_data = {
            'predicted_class': int(predicted_class),
            'predicted_name': predicted_name,
            'class_probabilities': class_probabilities,
        } 
        if len(json_data) > 0:
            return Response(json_data)
        else:
            return Response({'error': 'Invalid Request'}, status=400)
    else:
        return Response({'error': 'Need Image'}, status=400)


def camera_page(request):
    return render(request, 'camera.html')

@api_view(['POST'])
def predict_image_api_loop(request):
    if request.method == 'POST' and request.POST['image']:
        class_name = model_pred.get_class_name()
        uploaded_file = request.POST['image']
        format, imgstr = uploaded_file.split(';base64,')
        image_data = base64.b64decode(imgstr)
        image = Image.open(BytesIO(image_data))
        image = image.resize((54, 54))
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
        if len(json_data) > 0:
            return Response(json_data, status=200)
        else:
            return Response({'error': 'Invalid Request'}, status=400)
    else:
        return Response({'error': 'Need Image'}, status=400)