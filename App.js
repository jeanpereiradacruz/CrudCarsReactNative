import { Feather } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import api from './src/api'
import { CarList } from './src/components/CarList'
import { CreateCarForm } from './src/components/CreateCarForm'
import { UpdateCarForm } from './src/components/UpdateCarForm'
import { AddCarBtn, ButtonsTop, Container, Input, InsertCarView, SaveCarBtn, SearchButton, SearchContainer, Title } from './styles'


export default function App() {

  const [cars, setCars] = useState([])
  const [carsToShow, setCarsToShow] = useState([]);
  const [carsHasChanged, setCarsHasChanged] = useState(false);
  const [editingCar, setEditingCar] = useState({});
  const [isCreatingCar, setIsCreatingCar] = useState(false);
  const [isUpdatingCar, setIsUpdatingCar] = useState(false);
  const [searchedCar, setSearchedCar] = useState("")
  const [isSearchingCar, setIsSearchingCar] = useState(false)

  useEffect(() => {
    (async () => {
      const cars = await api.getCars();
      setCars(cars);
      setCarsToShow(cars);
    })()
  }, [carsHasChanged]);

  const carChanged = () => {
    setIsCreatingCar(false);
    setIsUpdatingCar(false);
    setEditingCar({});
    setCarsHasChanged(!carsHasChanged);
  }

  const deleteCar = async (id) => {
    try {
      await api.deleteCar(id);
      setCarsHasChanged(!carsHasChanged);
    } catch (error) {
      console.error(error);
    }
  }

  const updateCar = car => {
    if (isCreatingCar) {
      setIsCreatingCar(false);
    }
    setIsUpdatingCar(true);
    setEditingCar(car);
  }

  const createCar = () => {
    if (isUpdatingCar) {
      setIsUpdatingCar(false);
    }
    setIsCreatingCar(!isCreatingCar);
  }

  const getCarByName = async (name) => {
    setIsSearchingCar(true)
    const filteredCar = cars.filter(({ title }) => title.includes(name))
    setCarsToShow(filteredCar);
  }

  return (
    <Container >

      <Title>CRUD Carros</Title>

      <ButtonsTop>
        <AddCarBtn onPress={() => createCar()}>
          <Text style={{ color: 'green', fontWeight: 'bold' }}>Adicionar</Text>
          <Feather name={isCreatingCar ? "minus" : "plus"} size={32} color={'#FFF'} />
        </AddCarBtn>
      </ButtonsTop>

      {isCreatingCar ? <CreateCarForm
        carsChanged={carChanged}
      /> : null}

      {isUpdatingCar ? <UpdateCarForm
        carToUpdate={editingCar}
        carsChanged={carChanged}
      /> : null}

      <SearchContainer>
        <Input
          placeholder='Ex: Fusca'
          placeholderTextColor={'#ddd'}
          onChangeText={newValue => setSearchedCar(newValue)}
        ></Input>
        <SearchButton onPress={() => getCarByName(searchedCar)}>
          <Feather name="search" size={30} color="#FFF" />
        </SearchButton>
      </SearchContainer>

      {isSearchingCar ? <CarList
        cars={carsToShow}
        editAction={updateCar}
        deleteAction={deleteCar}
      /> : null}

    </Container >
  )
}