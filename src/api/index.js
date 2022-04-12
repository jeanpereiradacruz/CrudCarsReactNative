import axios from 'axios'

const api = axios.create({
    baseURL: "http://api-test.bhut.com.br:3000",
    headers: {
        "Content-Type": "application/json"
    }
})

const getCars = async () => {
    const { data } = await api.get('/api/cars');
    return data;
}

const deleteCar = async (id) => {
    await api.delete(`/api/cars/${id}`);
}

const updateCar = async (car) => {
    const { data } = await api.put(`/api/cars/${car._id}`, car);
    return data;
}

const createCar = async (car) => {
    const { data } = await api.post('/api/cars', car);
    return data;
}

export default {
    createCar,
    getCars,
    deleteCar,
    updateCar
}