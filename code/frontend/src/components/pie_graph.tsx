import React from 'react';
import {View, StyleSheet} from 'react-native';
import {VictoryPie, VictoryLegend} from 'victory-native';
import { categoryColors } from '../utils/offline';

// 定义 Props 类型
interface PieGraphProps {
  data: {x: string; y: number}[];
}

const PieGraph: React.FC<PieGraphProps> = ({data}) => {
  // 生成 VictoryLegend 的 data
  const legendData = data.map((item, index) => ({
    name: item.x,
    symbol: {fill: categoryColors[index]},
  }));

  return (
    <View>
      <View style={styles.pieGraph}>
        <VictoryPie
          colorScale={categoryColors}
          padding={70} // 设置页面内边距
          data={data}
          innerRadius={50} // 设置内半径
          labelRadius={125} // 设置标签半径
          radius={({datum}) => 10 + (datum.y || 0) * 1} // 设置分块扇形的半径
          labels={({datum}) => `${datum.x}: ${datum.y}%`} // 设置标签内容
          style={{
            labels: {fill: 'black'},
          }}
        />
      </View>
      <View style={styles.legend}>
        <VictoryLegend
          x={90} // 设置水平位置
          y={0} // 设置垂直位置
          orientation="horizontal"
          gutter={20} // 设置间距
          data={legendData}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pieGraph: {
    alignSelf: 'center',
    marginTop: -70,
  },
  legend: {
    alignSelf: 'center',
    height: 30,
    marginTop: -30,
  },
});

export default PieGraph;
