import * as React from 'react'
import Select from "react-select"
import './Display.scss'

export default function Display() {
  const [cardInfoAndImages, setCardInfoAndImages] = React.useState({})
  const handleChange = (options) => {
      options.map((option) => {
          setCardInfoAndImages(() => [
          ...cardInfoAndImages,
          option.value,
        ]);
      })
    };
  <select onChange={setCardInfoAndImages}>
      <option>Please choose one option</option>
      {cardInfoAndImages.map((option, index) => {
          return (
              <option key={index}>
                  {option}
              </option>
          );
      })}
  </select>
    return (
      <div className='editor-container'>
        <Select name="card_display"
            isClearable={false}
            isDisabled={false}
            isLoading={false}
            isRtl={false}
            isSearchable={true}
            isMulti={false}
            classNames={{
                control: () => "rounded-2xl"
            }}
            onChange={(e) => {handleChange}
            }
            options={cardInfoAndImages.map((card) => ({ value: card, label: card}))}
        />
        <button className='button' onClick={async () => {
          let card_info = await window.pywebview.api.return_card_info()
          console.log(card_info)
          setCardInfoAndImages(card_info)
        }}>Get card info</button>
      </div>
  )
}
