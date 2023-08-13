import { GlobalState } from '@/utils/interfaces'
import { PayloadAction } from '@reduxjs/toolkit'

export const globalActions = {
  setWallet: (state: GlobalState, action: PayloadAction<string>) => {
    state.wallet = action.payload
  },
  setQuestions: (state: GlobalState, action: PayloadAction<any>) => {
    state.questions = action.payload
  },
  setQuestion: (state: GlobalState, action: PayloadAction<any>) => {
    state.question = action.payload
  },
  setAddQuestionModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.addQuestionModal = action.payload
  },
  setUpdateQuestionModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.updateQuestionModal = action.payload
  },
}
