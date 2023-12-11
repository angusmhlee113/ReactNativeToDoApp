import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState } from "react";

const DATA = [
  {
    id: "1",
    title: "First Item",
    completed: false,
  },
  {
    id: "2",
    title: "Second Item",
    completed: false,
  },
  {
    id: "3",
    title: "Third Item",
    completed: false,
  },
];

export default function App() {
  const [items, setItems] = useState(DATA);
  const [text, setText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addNewTodo = () => {
    let newTodo = {
      id: items.length + 1,
      title: text,
      completed: false,
    };
    setItems([...items, newTodo]);
    setText("");
  };

  const markTodoComplete = (item) => {
    const itemIndex = items.findIndex((currItem) => currItem.id === item.id);
    // Check if item is found
    if (itemIndex !== -1) {
      // Update item
      let newItems = [...items];
      newItems[itemIndex].completed = !newItems[itemIndex].completed;
      setItems(newItems);
    }
    setIsModalVisible(false);
  };

  const Item = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => markTodoComplete(item)}
    >
      <Text style={item.completed ? styles.itemCompleted : styles.itemText}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Add an Item" onPress={() => setIsModalVisible(true)} />
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setText}
              value={text}
            ></TextInput>
            <Button title="Add ToDo" onPress={addNewTodo}></Button>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
      <FlatList
        style={styles.list}
        data={items}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    padding: 10,
    borderColor: "gray",
  },
  item: {
    backgroundColor: "#6DB6DD",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: "90%",
    borderRadius: 10,
  },
  list: {
    alignSelf: "stretch",
  },
  itemText: {
    color: "#fff",
  },
  itemCompleted: {
    backgroundColor: "#6DB6DD",
    textDecorationLine: "line-through",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
