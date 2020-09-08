import React from 'react'
import { SHOW_DIALOG, WINNER_DIALOG, LOSER_DIALOG, HIDE_DIALOG, OPEN_SNACKBAR, CLOSE_SNACKBAR } from './action-types'

const initState = {
  open: false,
  title: '',
  message: <span></span>,
  type: 'error',
  snackbar: {
    open: false
  }
}

/**
 * Return new redux state based on action
 *
 * @param state Initial state
 * @param action Redux action with type and payload
 *
 * @returns New redux state
 */
export default function reducer (state = initState, action) {
  switch (action.type) {
    case WINNER_DIALOG:
      return {
        title: '🎉 Congratulations you won!',
        message: action.payload,
        open: true,
        type: 'success'
      }

    case LOSER_DIALOG:
      return {
        title: '😕 Sorry you lost!',
        message: action.payload,
        open: true,
        type: 'error'
      }

    case SHOW_DIALOG:
      return {
        ...action.payload,
        open: true
      }

    case HIDE_DIALOG:
      return {
        ...state,
        open: false
      }

    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbar: {
          open: true
        }
      }

    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbar: {
          open: false
        }
      }

    default:
      return state
  }
}
