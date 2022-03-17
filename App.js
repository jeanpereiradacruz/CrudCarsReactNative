import React, { useEffect, useState } from 'react'
import { Container, Title, Input, SearchContainer, SearchButton, InsertCarView, AddCarBtn, SearchCars, ButtonsTop, ListTitle, CarItem, Buttons, SaveCarBtn } from './styles'
import { Feather } from '@expo/vector-icons'
import { Text, Button, FlatList } from 'react-native'

import api from './src/api/api'

export default function App() {

  const [title, setTitle] = useState("")
  const [brand, setBrand] = useState("")
  const [price, setPrice] = useState("")
  const [age, setAge] = useState("")
  const [searchedCar, setSearchedCar] = useState("")
  const [cars, setCars] = useState([])
  const [bkpListCars, setBkpListCars] = useState([])
  const [carsHelper, setCarsHelper] = useState([])
  const [creatingCar, setCreatingCar] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [editing, setEditing] = useState("")
  const [isSearchingCar, setIsSearchingCar] = useState(false)

  useEffect(() => {
    async function getCars() {
      const response = await api.get('/api/cars')
      setCars(response.data)
      setBkpListCars(response.data)
      setCarsHelper(response.data)
    }
    getCars()
  }, [deleted, creatingCar])

  const insertNewCar = async () => {
    if (title === "" || brand === "" || price === "" || age === "") {
      alert('Todos os campos devem ser preenchidos.')
    }

    const data = {
      title,
      brand,
      price,
      age
    }

    if (editing) {
      await api.put(`/api/cars/${editing}`, data).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log(err)
      })

      setEditing("")
    } else {
      await api.post('/api/cars', JSON.stringify(data)).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log(err)
      })
    }

    setTitle("")
    setBrand("")
    setPrice("")
    setAge("")

    setCreatingCar(false)
  }

  const updateCar = async (id) => {
    setEditing(id)
    setCreatingCar(true)
    const itemToUpdate = cars.filter((car) => car._id === id)
    itemToUpdate.map((item) => {
      setTitle(item.title);
      setBrand(item.brand);
      setPrice(item.price);
      setAge(String(item.age));
    })
  }

  const deleteCar = async (id) => {
    await api.delete(`/api/cars/${id}`).then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err)
    })
    setDeleted(!deleted)
  }

  const getCarByName = async (name) => {
    setIsSearchingCar(true)
    const searchedCar = bkpListCars.filter((car) => car.title.includes(name))
    setCars(searchedCar)
    setBkpListCars(carsHelper)
  }

  return (
    <Container >

      <Title>CRUD Carros</Title>

      <ButtonsTop>
        <AddCarBtn onPress={() => setCreatingCar(!creatingCar)}>
          <Text style={{ color: 'green', fontWeight: 'bold' }}>Adicionar</Text>
          {!creatingCar ? <Feather name="plus" size={32} color={'#FFF'} /> : <Feather name="minus" size={32} color={'#FFF'} />}
        </AddCarBtn>
      </ButtonsTop>

      {creatingCar ? <InsertCarView>
        <Text style={{ color: '#fff', fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>{!editing ? 'Novo Carro' : 'Edição do carro: '}</Text>
        <Input
          value={title}
          onChangeText={newValue => setTitle(newValue)}
          placeholder='Titulo'
          placeholderTextColor={'#ddd'}>
        </Input>
        <Input
          value={brand}
          onChangeText={newValue => setBrand(newValue)}
          placeholder='Brand'
          placeholderTextColor={'#ddd'}>
        </Input>
        <Input
          value={price}
          onChangeText={newValue => setPrice(newValue)}
          placeholder='Price'
          placeholderTextColor={'#ddd'}>
        </Input>
        <Input
          value={age}
          onChangeText={newValue => setAge(newValue)}
          placeholder='Year'
          placeholderTextColor={'#ddd'}>
        </Input>

        <SaveCarBtn onPress={() => insertNewCar()}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: 'green',
            padding: 10,
            margin: 5
          }}>{!editing ? "Salvar" : "Salvar Edição"}
          </Text>
        </SaveCarBtn>

      </InsertCarView> : null}

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

      {isSearchingCar ? <><ListTitle>Carros Disponiveis</ListTitle>
        <FlatList
          data={cars}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) =>
            <CarItem key={item._id}>
              <Text>Titulo: {item.title}</Text>
              <Text>Brand: {item.brand}</Text>
              <Text>Price: R$ {item.price}</Text>
              <Text>year: {item.age}</Text>

              <Buttons>
                <Button title="Editar" onPress={() => updateCar(item._id)} />
                <Button title="Deletar" color={'red'} onPress={() => deleteCar(item._id)} />
              </Buttons>
            </CarItem>
          } />
      </> : null}


    </Container >
  )
}