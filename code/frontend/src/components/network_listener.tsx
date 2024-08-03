import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';
import {getObject, pushAll, storeObject} from '../services/offlineService';
import {useNavigation} from '@react-navigation/native';
import {login} from '../services/loginService';
import Loading from './loading';

const NetworkListener = () => {
  const [isConnected, setIsConnected] = useState<null | boolean>(null); // 初始状态假设连接是正常的
  const [loading, setLoading] = useState(false); // 是否正在加载
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // 初始化时 更新连接状态
      if (isConnected === null) {
        setIsConnected(state.isConnected);
        return;
      }
      // 网络连接从连接到断开
      if (!state.isConnected && isConnected) {
        setIsConnected(false);
        Promise.all([getObject('user'), getObject('mode')]).then(
          ([user, mode]) => {
            // 用户已登录且为在线模式
            if (user && mode === 'online') {
              Alert.alert(
                '网络连接',
                '网络已断开, 已切换为离线模式',
                [{text: 'OK', onPress: () => storeObject('mode', 'offline')}],
                {
                  cancelable: false,
                },
              );
            }
          },
        );
      }
      // 网络连接从断开到连接
      else if (state.isConnected && !isConnected) {
        setIsConnected(true); // 更新连接状态为连接
        Promise.all([getObject('user'), getObject('mode')]).then(
          ([user, mode]) => {
            // 用户已登录且为离线模式
            if (user && mode === 'offline') {
              Alert.alert(
                '网络连接',
                '网络已连接, 将切换为在线模式，您的数据会同步到云端',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      setLoading(true);
                      getObject('auth').then(auth => {
                        login(auth)
                          .then(() => {
                            storeObject('mode', 'online');
                            pushAll().then(() => {
                              setLoading(false);
                            });
                          })
                          .catch(err => {
                            Alert.alert('登录失败', err);
                          });
                      });
                    },
                  },
                ],
                {
                  cancelable: false,
                },
              );
            }
          },
        );
      }
    });

    return () => unsubscribe();
  }, [isConnected]); // 监听 isConnected 变化

  return <Loading visible={loading} />;
};

export default NetworkListener;
