import { Button, FlatList, Text } from "react-native";
import { Buttons, CarItem, ListTitle } from "../../styles";

export function CarList({ cars, editAction, deleteAction }) {

    return (<>
        <ListTitle>Carros Disponiveis</ListTitle>
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
                        <Button title="Editar" onPress={() => editAction(item)} />
                        <Button title="Deletar" color={'red'} onPress={() => deleteAction(item._id)} />
                    </Buttons>
                </CarItem>
            } />
    </>
    )
}