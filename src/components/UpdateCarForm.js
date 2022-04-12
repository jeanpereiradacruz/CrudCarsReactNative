import { useState } from "react";
import { Text } from "react-native";
import { Input, InsertCarView, SaveCarBtn } from "../../styles";
import api from '../api';
import { certifyCarDoesNotHaveEmptyFields } from "../helper";

export function UpdateCarForm ({ carToUpdate, carsChanged }) {
    
    const [car, setCar] = useState(carToUpdate);
    
    const updateCar = async () => {
        try {
            certifyCarDoesNotHaveEmptyFields(car);
            await api.updateCar(car);
            carsChanged();
        } catch (error) {
            console.error(error);
        }
    }

    return (<InsertCarView>
        <Text style={{ color: '#fff', fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>Edição do carro</Text>
        <Input
          value={car.title}
          onChangeText={title => setCar({ ...car, title })}
          placeholder='Titulo'
          placeholderTextColor={'#ddd'}>
        </Input>
        <Input
          value={car.brand}
          onChangeText={brand => setCar({ ...car, brand })}
          placeholder='Brand'
          placeholderTextColor={'#ddd'}>
        </Input>
        <Input
          value={car.price}
          onChangeText={price => setCar({ ...car, price })}
          placeholder='Price'
          placeholderTextColor={'#ddd'}>
        </Input>
        <Input
          value={String(car.age || '')}
          onChangeText={age => setCar({ ...car, age: parseInt(age) })}
          placeholder='Year'
          placeholderTextColor={'#ddd'}>
        </Input>

        <SaveCarBtn onPress={() => updateCar()}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: 'green',
            padding: 10,
            margin: 5
          }}>Salvar
          </Text>
        </SaveCarBtn>

      </InsertCarView>)
}