import React, { useReducer } from 'react';
import { View, StyleSheet } from 'react-native';
import { PortalContext } from './PortalContext';
const reducer = (state, action) => {
    switch (action.type) {
        case 'mount':
            return [...state, { key: action.key, children: action.children }];
        case 'update':
            return state.map(item => item.key === action.key ? { ...item, children: action.children } : item);
        case 'unmount':
            return state.filter(item => item.key !== action.key);
        default:
            return state;
    }
};
export const PortalHost = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    const nextKey = React.useRef(0);
    const mount = React.useCallback((children) => {
        const key = nextKey.current;
        nextKey.current += 1;
        dispatch({ type: 'mount', key, children });
        return key;
    }, []);
    const update = React.useCallback((key, children) => {
        dispatch({ type: 'update', key, children });
    }, []);
    const unmount = React.useCallback((key) => {
        dispatch({ type: 'unmount', key });
    }, []);
    const value = React.useMemo(() => ({ mount, update, unmount }), [mount, update, unmount]);
    return (<PortalContext.Provider value={value}>
      <View style={{ flex: 1 }}>
        {children}
      </View>
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {state.map(item => (<View key={item.key} style={StyleSheet.absoluteFill} pointerEvents="box-none">
            {item.children}
          </View>))}
      </View>
    </PortalContext.Provider>);
};
