import { useState } from 'react';
import emojis from './resources/emojis.json';
import './App.css';
import styled from 'styled-components';
import {Input, input} from 'semantic-ui-react';

export const App = () => {
  const [text, setText] = useState("");

  const filteredEmojis = emojis.filter(emoji => (emoji.name.includes(text)))

  console.log("text is:", text);

  return (
  <div className="AppWrapper">
    <div>
    <Input onChange = {(e, data) => setText(data.value)}
    icon={{name: 'search', circular: true, link: true}}
    placeholder="Search..."
    fluid
    />
    </div>
    {filteredEmojis.map((emoji) => (
      <EmojiRow emoji={emoji} key={emoji.code} />
    ))}
  </div>
  )
};

const EmojiRow = ({ emoji }) => (
  <div className="RowWrapper">
      <div className="CharNameWrapper">
        <div className="EmojiInfo">{emoji.character}</div>
        <div className="EmojiInfo">{emoji.name}</div>
      </div>
      <div className="EmojiInfo">{emoji.code}</div>
    </div>
);
