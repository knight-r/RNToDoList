import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  FlatList
} from 'react-native';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);


  const addTask = () => {
    // if (task.trim()) {
    //   setTasks([...tasks, { id: Date.now(), text: task, completed: false, pinned: false}]);
    //   setTask('');
    // } else {
    //   Alert.alert('Error', 'Task cannot be empty');
    // }
    if (task.trim()) {
      if (editingTaskId !== null) {
        const updatedTasks = tasks.map(t =>
          t.id === editingTaskId ? { ...t, text: task } : t
        );
        setTasks(updatedTasks);
        setEditingTaskId(null);
      } else {
        setTasks([
          ...tasks,
          { id: Date.now(), text: task, completed: false, pinned: false }
        ]);
      }
      setTask('');
    } else {
      Alert.alert('Error', 'Task cannot be empty');
    }
  };

  const togglePinTask = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId? {...task, pinned: !task.pinned} : task
    )
    setTasks(updatedTasks);
  }
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
  
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.pinned === b.pinned) return 0;
    return b.pinned ? 1 : -1;
  });

  const setTaskToEdit = (item) => {
    setTask(item.text);
    setEditingTaskId(item.id);
  }

  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
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
          <Text style={styles.addButtonText}>{editingTaskId ? 'Save' : 'Add'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
      
        data={sortedTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
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
            {/* <Text style={styles.taskText}>{item.text}</Text> */}
            <Text style={styles.taskText}>{item.pinned ? '📌 ' : ''}{item.text}</Text>
            <TouchableOpacity onPress={() => togglePinTask(item.id)} style={styles.pinButton}>
              <Text style={styles.pinButtonText}>{item.pinned ? 'Unpin' : 'Pin'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setTaskToEdit(item)} style={styles.editButtonStyle}>
              <Text style={styles.pinButtonText}>{'Edit'}</Text>
            </TouchableOpacity>
            
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerStyle: {
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
  pinButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#e67e22',
    borderRadius: 5
  },
  pinButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  editButtonStyle: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#9c33ff',
    borderRadius: 5
  }
});
export default TodoList;