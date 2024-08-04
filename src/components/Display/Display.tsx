import * as React from 'react'
import Select from "react-select"
import './Display.scss'

type CardData = {
  card_id: string
  card_type: string
  card_attribute: string
  card_race: string
  card_level: string
  card_attack: string
  card_defense: string
  card_image: string
}

export default function Display() {
  const [cardInfoAndImages, setCardInfoAndImages] = React.useState<CardData[]>([])
  const [cardInfoAndImage, setCardInfoAndImage] = React.useState<CardData>({
    card_id: '',
    card_type: '',
    card_attribute: '',
    card_race: '',
    card_level: '',
    card_attack: '',
    card_defense: '',
    card_image: ''
  })
 
  const handleChange = (selectedOption) => {
    console.log(selectedOption)
    if (selectedOption) {
      const cardInfo = cardInfoAndImages.find(card => card.card_id === selectedOption.value) || cardInfoAndImage;
      console.log(cardInfo)
      setCardInfoAndImage(cardInfoAndImages.find(card => card.card_id === selectedOption.value) || cardInfoAndImage);
    } else {
      setCardInfoAndImage(cardInfoAndImage);
    }
  };
  // <select onChange={setCardInfoAndImages}>
      {/* <option>Please choose one option</option>
      {cardInfoAndImages.map((option, index) => {
          return (
              <option key={index}>
                  {option}
              </option>
          );
      })}
  </select> */}
    return (
      <>
      <button className='button' onClick={async () => {
        let card_info = await window.pywebview.api.return_card_info()
        console.log(card_info)
        setCardInfoAndImages(card_info)
      }}>Get card info</button>
      {cardInfoAndImages.length > 0 && (
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
            onChange={handleChange}
            options={cardInfoAndImages.map((card) => ({ value: card.card_id, label: card.card_type}))}
        />
      </div>
      )}
      {cardInfoAndImage.card_attack != '' &&(
        <div>
          <p>Type: {cardInfoAndImage.card_type}</p>
          {cardInfoAndImage.card_attribute && <p>Attribute: {cardInfoAndImage.card_attribute}</p>}
          <p>Race: {cardInfoAndImage.card_race}</p>
          <p>Level: {cardInfoAndImage.card_level}</p>
          <p>Attack: {cardInfoAndImage.card_attack}</p>
          <p>Defense: {cardInfoAndImage.card_defense}</p> 
          {cardInfoAndImage.card_image && <img src={cardInfoAndImage.card_image} alt="card" />}
        </div>
      )}
      </>
  )
}