import React from 'react';
import MyButton from '../src/utils/my_button';
import { render, screen, fireEvent } from '@testing-library/react-native';
import {TaskItem, TaskList, CourseItem, Reminder} from '../src/components/reminder'; // 假设你的组件在'Reminder.js'文件中
import '@testing-library/jest-native/extend-expect';

describe('Reminder Component', () => {
  test('renders the Reminder component correctly', () => {
    const { getByText, getByTestId } = render(<Reminder />);

    // 测试基本组件渲染
    expect(getByTestId('reminder')).toBeTruthy();
    expect(getByText('Today - October 18th, 2023')).toBeTruthy();

    // 测试课程组件渲染
    expect(getByText('MGT 101 - Organization Management')).toBeTruthy();
    expect(getByText('EC 203 - Principles Macroeconomics')).toBeTruthy();

    // 测试任务组件渲染
    expect(getByTestId('task-list')).toBeTruthy();
    expect(getByText('Bring notes')).toBeTruthy();
    expect(getByText('Prepare for Presentation')).toBeTruthy();
    expect(getByText('Bring PC')).toBeTruthy();
    expect(getByText('Print notes')).toBeTruthy();
  });

  test('renders TaskItem and CourseItem components correctly', () => {
    const taskItemProps = { text: 'Test Task', checked: true };
    const courseItemProps = { title: 'Test Course', color: '#000' };

    const { getByText, getByTestId } = render(
      <>
        <TaskItem {...taskItemProps} />
        <CourseItem {...courseItemProps} />
      </>
    );

    // 测试 TaskItem 渲染
    expect(getByText('Test Task')).toBeTruthy();
    expect(getByTestId('task-item')).toBeTruthy();

    // 测试 CourseItem 渲染
    expect(getByText('Test Course')).toBeTruthy();
    expect(getByTestId('course-item')).toBeTruthy();
  });


  test('calls onPress when Add Task button is pressed', () => {
    const handlePress = jest.fn();

    const { getByTestId } = render(
      <MyButton

        icon={require('../src/assets/icons/add.png')}
        style={{}}
        onPress={handlePress}
      />
    );

    fireEvent.press(getByTestId('image-button'));
    expect(handlePress).toHaveBeenCalled();
  });

});
