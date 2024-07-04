import React from 'react';
import {View, StyleSheet} from 'react-native';
import {VictoryPie, VictoryLegend} from 'victory-native';

// 定义 Props 类型
interface PieGraphProps {
  data: {x: string; y: number}[];
}

// 定义颜色范围
const colorScale = [
  '#6699ff',
  '#ff9933',
  '#ff6666',
  '#6699ff',
  '#ff9933',
  '#ff6666',
  '#6699ff',
  '#ff9933',
  '#ff6666',
  '#6699ff',
  '#ff9933',
  '#ff6666',
];

const PieGraph: React.FC<PieGraphProps> = ({data}) => {
  // 生成 VictoryLegend 的 data
  const legendData = data.map((item, index) => ({
    name: item.x,
    symbol: {fill: colorScale[index]},
  }));

  return (
    <View>
      <View style={styles.pieGraph}>
        <VictoryPie
          colorScale={colorScale}
          padding={70}
          data={data}
          innerRadius={25}
          labelRadius={({innerRadius}) => innerRadius + 100}
          radius={({datum}) => 10 + datum.y * 2.5}
          labels={({datum}) => `${datum.x}: ${datum.y}%`}
          style={{
            labels: {fill: 'black'},
          }}
        />
      </View>
      <View style={styles.legend}>
        <VictoryLegend
          x={90}
          y={0}
          orientation="horizontal"
          gutter={20}
          data={legendData}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pieGraph: {
    marginTop: -70,
  },
  legend: {
    height: 30,
    marginTop: -60,
  },
});

export default PieGraph;
