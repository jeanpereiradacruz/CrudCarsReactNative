import styled from "styled-components/native";

export const Container = styled.View`
    background-color: #141a29;
    flex: 1;
    padding: 4px 0;
    display: flex ;
    align-items: center;
`;

export const Title = styled.Text`
    color: #FFF;
    font-size: 20px ;
    margin-top: 50px ;
    font-weight: bold;
`;

export const InsertCarView = styled.View`
    width: 85%;
    display: flex;
    align-items: center;
`;

export const SaveCarBtn = styled.TouchableOpacity`
    width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
`

export const SearchContainer = styled.View`
    margin-top: 10px;
    flex-direction: row ;
    width: 100%;
    height: 50px;
    align-items: center ;
    padding: 0 14px;
    margin-bottom: 8px ;
`;

export const Input = styled.TextInput`
    margin-top: 10px ;
    background-color: rgba(255, 255,255, 0.4);
    width: 85%;
    height: 50px;
    border-radius: 50px ;
    padding: 8px 15px;
    font-size: 18px;
    color: #fff; 
`;

export const SearchButton = styled.TouchableOpacity`
    width: 15%;
    height: 50px;
    align-items: center ;
    justify-content: center;
`;

export const ButtonsTop = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    height: 50px;
`;

export const AddCarBtn = styled.TouchableOpacity`
    margin-right: 20px ;
    width: 15%;
    height: 50px;
    align-items: center ;
    justify-content: center;
`;
export const SearchCars = styled.TouchableOpacity`    
    width: 15%;
    height: 50px;
    align-items: center ;
    justify-content: center;
`;

export const ListTitle = styled.Text`
    color: #00ff40;
    font-size: 20px;
    margin-top: 10px;
    font-weight: bold;
`;

export const CarItem = styled.View`
    margin-top: 10px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Buttons = styled.View`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`

