import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
      setTask('');
    } else {
      Alert.alert('Error', 'Task cannot be empty');
    }
  };

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedTasks([]);
  };

  const toggleSelectTask = (taskId) => {
    const isSelected = selectedTasks.includes(taskId);
    if (isSelected) {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const selectAllTasks = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(task => task.id));
    }
  };

  const deleteSelectedTasks = () => {
    setTasks(tasks.filter(task => !selectedTasks.includes(task.id)));
    setSelectedTasks([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ToDoList</Text>
        
        {selectMode && selectedTasks.length > 0 ? (
          <TouchableOpacity onPress={deleteSelectedTasks} style={styles.selectButton}>
            <Text style={styles.selectButtonText}>Delete</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={selectMode ? selectAllTasks : toggleSelectMode} style={styles.selectButton}>
            <Text style={styles.selectButtonText}>{selectMode ? 'SelectAll' : 'Select'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {tasks.map((item) => (
          <View key={item.id} style={styles.taskContainer}>
            {selectMode && (
              <TouchableOpacity
                onPress={() => toggleSelectTask(item.id)}
                style={[
                  styles.checkbox,
                  selectedTasks.includes(item.id) && styles.checkboxSelected
                ]}
              >
                {selectedTasks.includes(item.id) && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            )}
            <Text style={styles.taskText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  selectButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  selectButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  taskContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#3498db',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default TodoList;