import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TodoItem from 'app/components/TodoItem';
import { Todo } from 'app/types/todo';


const TodoApp: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Todo[]>([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: task.trim(), completed: false }]);
      setTask('');
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={() => toggleTaskCompletion(item.id)}
            onDelete={() => deleteTask(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 18,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: '#6200ea',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginLeft: 10,
    borderRadius: 5,
  },
  listContainer: {
    paddingBottom: 50,
  },
});

export default TodoApp;
