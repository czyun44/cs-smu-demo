import { useState } from 'react';
import emojis from './resources/emojis.json';
import './App.css';
import styled from 'styled-components';
import { Input, input } from 'semantic-ui-react';
import { wait } from '@testing-library/user-event/dist/utils';
import debounce from 'lodash.debounce';

export const App = () => {
  const [searchText, setsearchText] = useState("");
  const [fetchedEmojis, setFetchedEmoji] = useState([]);

  const getEmoji = async (text) => {
    const url = `https://emoji-api.com/emojis?search=${text}&access_key=cc28cbf09d8bf40c8c66611902652e768a28b198`;
    const res = await fetch(url)
    const emojis = await res.json()
    console.log("fetched emojis are :", emojis);
    setFetchedEmoji(emojis);
  }

  const debounceEmojiSearch = debounce(
    (searchText) => getEmoji(searchText),500
  );

  return (
    <div className="AppWrapper">
      <div>
        <Input onChange={async (e, data) => 
        // await getEmoji(data.value)
        await debounceEmojiSearch(data.value)
      }
          icon={{ name: 'search', circular: true, link: true }}
          placeholder="Search..."
          fluid
        />
      </div>
      {fetchedEmojis.map((emoji) => (
        <EmojiRow emoji={emoji} key={emoji.codePoint} />
      ))}
    </div>
  )
};

const EmojiRow = ({ emoji }) => (
  <div className="RowWrapper">
    <div className="CharNameWrapper">
      <div className="EmojiInfo">{emoji.character}</div>
      <div className="EmojiInfo">{emoji.unicodeName}</div>
    </div>
    <div className="EmojiInfo">{emoji.codePoint}</div>
  </div>
);
