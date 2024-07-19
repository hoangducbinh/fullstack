import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Box, Text } from '../../utils/theme';
import LinearGradient from 'react-native-linear-gradient';

type ButtonProps = {
  label: string;
  onPress: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  uppercase?: boolean;
};

const Button = ({
  label,
  onPress,
  onLongPress,
  disabled = false,
  uppercase = false,
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.buttonContainer,
        { opacity: pressed || disabled ? 0.7 : 1 },
      ]}
    >
      <LinearGradient
        colors={['#ffffff', '#fcecff', '#f8daff', '#fae2ff', '#fae2ff', '#ffffff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Box style={styles.button}>
          <Text
            style={[
              styles.text,
              { textTransform: uppercase ? 'uppercase' : 'none' },
            ]}
          >
            {label}
          </Text>
        </Box>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    margin: 10,
  },
  gradient: {
    borderRadius: 50,
    padding: 1,
  },
  button: {
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#9333ea',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#9333ea',
    textAlign: 'center',
  },
});

export default Button;
