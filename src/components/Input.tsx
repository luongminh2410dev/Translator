import React, {useEffect, useState} from 'react';
import {TextInput, TextInputProps} from 'react-native';

interface InputProps extends TextInputProps {
  _onChangeText: (value: string) => void;
  forceValue?: string;
}

const Input = (props: InputProps) => {
  const {forceValue = '', _onChangeText} = props;
  const [text, setText] = useState(forceValue);

  useEffect(() => {
    setText(forceValue);
  }, [forceValue]);

  return (
    <TextInput
      {...props}
      value={text}
      onChangeText={value => {
        setText(value);
        _onChangeText(value);
      }}
    />
  );
};

export default Input;
