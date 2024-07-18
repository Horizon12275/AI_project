import React from 'react';
import {render} from '@testing-library/react-native';
import SummaryBox from '../src/components/summary_box';

// 测试组件的渲染和内容
test('renders summary box with correct data', () => {
  const testData = 'Test data';
  const testStartDate = '01/01/2022';
  const testEndDate = '01/31/2022';

  // 渲染组件
  const {getByTestId, getByText} = render(
    <SummaryBox data={testData} startDate={testStartDate} endDate={testEndDate} />
  );

  // 断言组件渲染了正确的内容
  expect(getByTestId('summary-box')).toBeTruthy();
  expect(getByText('Generated Result:')).toBeTruthy();
  expect(getByText(`During ${testStartDate} and ${testEndDate}`)).toBeTruthy();
  expect(getByText(testData)).toBeTruthy();
});
