from django.shortcuts import render
from .forms import ImageUploadForm
from .configuration_model import *

model_pred = ConfigurationModel()
model = model_pred.get_model()
def predict_image(request):
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        class_name = model_pred.get_class_name()
        if form.is_valid():
            uploaded_file = request.FILES['image']
            image_array = model_pred.image_preprocess(uploaded_file)  
            predictions = model.predict(image_array)
            predicted_class = np.argmax(predictions, axis=1)
            class_probabilities = predictions.tolist()[0]  
            predicted_name = class_name[int(predicted_class)]

            # Tampilkan hasil prediksi pada template
            return render(request, 'prediction_result.html', {
                'predicted_class': int(predicted_class),
                'predicted_name': predicted_name,
                'class_probabilities': class_probabilities,
            })
    else:
        form = ImageUploadForm()

    return render(request, 'upload_form.html', {'form': form})
