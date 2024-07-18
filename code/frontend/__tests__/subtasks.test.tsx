import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import { TaskItem, Subtasks } from '../src/components/subtasks'; // 确保路径正确
import { render, fireEvent, screen } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import checkboxIcon from '../src/assets/icons/checkbox.png';

describe('Subtasks Component', () => {
  it('renders correctly with initial tasks', () => {
    const { getByTestId } = render(<Subtasks />);
    expect(getByTestId('subtasks')).toBeTruthy();
    // 检查是否有四个任务项
    expect(screen.getAllByTestId('task-item')).toHaveLength(4);
  });

  it('toggles task completion', () => {
    const { getByText } = render(<Subtasks />);
    const incompleteTask = getByText('Checklist title 3');
    fireEvent.press(incompleteTask);
    // 检查任务是否变为已完成
    expect(getByText('Checklist title 3')).toHaveStyle({ textDecorationLine: 'line-through' });
  });

  it('should delete a task when the delete button is pressed', () => {
    const { getByTestId, queryByText } = render(<Subtasks />);
    const deleteButton = getByTestId('delete-icon-0');
    expect(queryByText('Class note Chapter1 review')).not.toBeNull();
    fireEvent.press(deleteButton);
    expect(queryByText('Class note Chapter1 review')).toBeNull();
  });

});

describe('TaskItem Component', () => {
  it('renders correctly with title and due date', () => {
    const { getByText } = render(<TaskItem title="Test Task" dueDate="9/19" />);
    expect(getByText('Test Task')).toBeTruthy();
    expect(getByText('Due: 9/19')).toBeTruthy();
  });

});



