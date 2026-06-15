import '@testing-library/jest-dom';
import React from 'react';

jest.mock('@react-three/fiber', () => {
  const createElement = (tag: string) => {
    const Component = ({ children, ...props }: any) => {
      const { args, ...domProps } = props;
      return React.createElement(tag, domProps, children);
    };
    Component.displayName = tag;
    return Component;
  };

  return {
    Canvas: ({ children }: { children: React.ReactNode }) =>
      React.createElement('div', { 'data-testid': 'canvas' }, children),
    useFrame: jest.fn(),
    useThree: jest.fn(),
    mesh: createElement('div'),
    group: createElement('div'),
    boxGeometry: createElement('span'),
    meshBasicMaterial: createElement('span'),
    torusGeometry: createElement('span'),
  };
});

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => null,
  Text3D: ({ children }: { children: React.ReactNode }) =>
    React.createElement('span', null, children),
}));

jest.mock('three', () => {
  const actual = jest.requireActual('three');
  return {
    ...actual,
    Vector3: class Vector3 {
      x: number;
      y: number;
      z: number;
      constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
      }
    },
  };
});
