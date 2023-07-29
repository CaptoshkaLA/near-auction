from flask import Flask, request, jsonify
import pickle
import numpy as np
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Загружаем модель price_prediction.pkl
dataPickle = pickle.load(open('price_prediction.pkl', 'rb'))

# Достаем модель и нормализацию
modelPickle = dataPickle["model"]
normalizationPickle = dataPickle["normalization"]

# Объекты для кодирования кат. признаков
carBrand = LabelEncoder()
fuelType = LabelEncoder()
transmissionType = LabelEncoder()

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':

        # Данные из request запроса в формате json
        data = request.get_json()

        brandList = ("Lexus","Mitsubishi","Mercedes-Benz","Mazda","Porsche","Audi","Subaru","Kia","DS","Hyundai","Fiat","Chevrolet","Citroen","Skoda","Seat","Ford","Mini","Renault","Bentley","Peugeot","Land-Rover","Honda","Smart","MG","Nissan","Chrysler","Dacia","Jeep","Volkswagen","Alfa-Romero","Toyota","Volvo","Infiniti","Isuzu","Suzuki","Jaguar","Abarth","BMW","Vauxhall","Maserati",)

        fuelList = ("Petrol", "Electric", "Plug_in_hybrid", "Hybrid", "Diesel")

        transmissionsList = ("Manual", "Semiautomatic", "Automatic")

        # Парсим данные из запроса
        carBrandData = data['Manufacturer']
        carAgeData = int(data['Age'])
        mileageData = int(data['Mileage'])
        fuelTypeData = data['Engine']
        transmissionTypeData = data['Transmission']

        # Предобучаем на основе категориальных справочников
        carBrand.fit(brandList)
        fuelType.fit(fuelList)
        transmissionType.fit(transmissionsList)

        # Перекодируем категориальные признаки в числовые значения
        X = np.array([[carBrandData, carAgeData, mileageData, fuelTypeData, transmissionTypeData]])
        print(X)
        X[:, 0] = carBrand.transform(X[:, 0])
        X[:, 3] = fuelType.transform(X[:, 3])
        X[:, 4] = transmissionType.transform(X[:, 4])

        # Применяем нормализацию к признакам
        scaled_X = normalizationPickle.transform(X)
        print(scaled_X)

        # Делаем прогноз цены
        prediction = modelPickle.predict(scaled_X)
        print(prediction)
        coinsPrice = np.exp(prediction) + 1
        coinsPrice = round(coinsPrice[0], 2)
        print(coinsPrice)

        return jsonify(prediction=coinsPrice.tolist())

if __name__ == '__main__':
    app.run(port=5000)