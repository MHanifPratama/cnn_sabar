import os
import cv2
import random
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator

class Preprocessing:
    
    def load_data(input_directory,
                  train_directory,
                  input_img_size: int = 64,
                  mode_kelas="sparse"):
        
        CATEGORY = ['training', 'validation']
        data_generator = ImageDataGenerator(rescale=1/255,
                                  rotation_range=40,
                                  width_shift_range=0.2,
                                  height_shift_range=0.2,
                                  shear_range=0.2,
                                  zoom_range=0.2,
                                  horizontal_flip=True,
                                  fill_mode='nearest')
        train_dataset = data_generator.flow_from_directory(train_directory, (input_img_size, input_img_size), class_mode=mode_kelas)
        
        output = []
        
        for category in CATEGORY:
            path = os.path.join(input_directory, category)
            print(path)
            images = []
            labels = []
            
            for folder in os.listdir(path):
                label = folder
                
                for file in os.listdir(os.path.join(path, folder)):
                    img_path = os.path.join(os.path.join(path, folder), file)
                    image = cv2.imread(img_path)
                    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
                    image = cv2.resize(image, (input_img_size, input_img_size))
                    images.append(image)
                    labels.append(label)
                
            images = np.array(images)
            labels = np.array(labels)
            output.append((images, labels))
            return output

    def datagen(input_directory, input_img_size: int, mode_kelas="sparse"):
        data_generator = ImageDataGenerator(rescale=1/255,
                                  rotation_range=40,
                                  width_shift_range=0.2,
                                  height_shift_range=0.2,
                                  shear_range=0.2,
                                  zoom_range=0.2,
                                  horizontal_flip=True,
                                  fill_mode='nearest')
        output = data_generator.flow_from_directory(input_directory, (input_img_size, input_img_size), class_mode=mode_kelas)
        return output

    def apply_preprocessing(dataset_folder,
                            output_folder,
                            val_split: float = 0.4,
                            apply_aug: bool = True):

        for folder in [output_folder, os.path.join(output_folder, 'training'), os.path.join(output_folder, 'validation')]:
            if not os.path.exists(folder):
                os.makedirs(folder)

    # Parameter untuk ukuran dataset validation
        validation_split = val_split
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

        # apply_augmentation
        def apply_augmentation(image):

            if random.random() < 0.5:
                # Flip gambar secara horizontal
                image = cv2.flip(image, 1)  

            if random.random() < 0.5:
                # Menaikkan dan menurunkan kecerahan
                alpha = random.uniform(0.5, 1.5)
                image = cv2.multiply(image, np.array([alpha]))

            if random.random() < 0.5:
                # Menaikkan dan menurunkan kontras
                alpha = random.uniform(0.5, 1.5)
                grey = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
                grey = cv2.cvtColor(grey, cv2.COLOR_GRAY2BGR)
                image = cv2.addWeighted(image, alpha, grey, 1 - alpha, 0)

            # if random.random() < 0.5:
            #     # Rotasi 90 derajat
            #     image = cv2.rotate(image, cv2.ROTATE_90_CLOCKWISE)

            return image

        for class_name in os.listdir(dataset_folder):
            class_folder = os.path.join(dataset_folder, class_name)

            training_class_folder = os.path.join(output_folder, 'training', class_name)
            validation_class_folder = os.path.join(output_folder, 'validation', class_name)
            for folder in [training_class_folder, validation_class_folder]:
                if not os.path.exists(folder):
                    os.makedirs(folder)

            image_files = os.listdir(class_folder)
            random.shuffle(image_files)
            num_validation_images = int(len(image_files) * validation_split)

            for i, image_name in enumerate(image_files) :
                image_path = os.path.join(class_folder, image_name)

                if i < num_validation_images:
                    output_image_path = os.path.join(validation_class_folder, image_name)
                else:
                    output_image_path = os.path.join(training_class_folder, image_name)

                image = cv2.imread(image_path)
                gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
                faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=16, minSize=(64, 64))

                if len(faces)>0:
                    for (x, y, w, h) in faces:
                        cv2.rectangle(image, (x, y), (x+w, y+h), (0, 0, 0), 0)
                        cropped = image[y:y + h, x:x + w]
                try:
                    cv2.imwrite(output_image_path, cropped)
                except:
                    continue
            
            if apply_aug == True:
                for i, image_name in enumerate(image_files) :
                    image_path = os.path.join(class_folder, image_name)
                    output_image_path = os.path.join(training_class_folder, image_name)
                    image = cv2.imread(image_path)
                    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
                    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=16, minSize=(64, 64))
                    if len(faces)>0:
                        for (x, y, w, h) in faces:
                            cv2.rectangle(image, (x, y), (x+w, y+h), (0, 0, 0), 0)
                            cropped = image[y:y + h, x:x + w]
                    try:
                        augmented = apply_augmentation(cropped)
                        cv2.imwrite(output_image_path, augmented)
                    except:
                        continue