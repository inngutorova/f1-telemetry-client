import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

interface IconProps {
  source: ImageSourcePropType;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({ source, size = 24, color }) => {
  const tintColor = color ? { tintColor: color } : undefined;
  
  return (
    <Image 
      source={source} 
      style={[
        styles.icon, 
        { width: size, height: size },
        tintColor
      ]} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
});