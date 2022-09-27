import {cardAPI, CardsType} from "../../api/cards-api";
import {AppThunkType} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";

const cardsInitialState = {
  cards: [] as Array<CardsType>
}

export const cardsReducer = (state: CardsStateType = cardsInitialState, action: CardsActionType) => {
  switch (action.type) {
    case "CARDS/SET-CARDS": return {...state, cards: action.payload.cards}
    default: return state
  }
}

export const setCardsAC = (cards: Array<CardsType>) => ({type: 'CARDS/SET-CARDS', payload: {cards}}as const)

export const getCardsTC = (packId: string): AppThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const cards = await cardAPI.getCard(packId)
    dispatch(setCardsAC(cards.data.cards))
  }catch (e) {
    console.log(e)
  }finally {
    dispatch(setAppStatusAC('succeeded'))
  }

}

export type CardsStateType = typeof cardsInitialState
export type CardsActionType = ReturnType<typeof setCardsAC>