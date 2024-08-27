import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Todo } from 'app/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={onToggle}>
        <Ionicons
          name={todo.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={todo.completed ? '#4CAF50' : '#ccc'}
        />
      </TouchableOpacity>
      <Text style={[styles.taskText, todo.completed && styles.taskTextCompleted]}>
        {todo.text}
      </Text>
      <TouchableOpacity onPress={onDelete}>
        <Ionicons name="trash-outline" size={24} color="#f44336" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  taskText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});

export default TodoItem;
