import React, { useContext } from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import green from '@material-ui/core/colors/green'
import blue from '@material-ui/core/colors/blue'
import { makeStyles } from '@material-ui/core/styles'

import ErrorStore from 'Store/error'
import { Actions as EActions } from 'Store/error/types'

import GameStore from 'Store/game'
import { Actions as GActions, GameState } from 'Store/game/types'

import BetCredits from './BetCredits'
import TotalCredits from './TotalCredits'

// Styles
const useStyles = makeStyles({
  startButton: {
    backgroundColor: green[600],
    color: '#fff',
    '&:hover': {
      backgroundColor: green[400]
    }
  },

  continueButton: {
    backgroundColor: blue[600],
    color: '#fff',
    '&:hover': {
      backgroundColor: blue[400]
    }
  }
})

// Component
function GameActions () {
  const classes = useStyles()
  const error = useContext(ErrorStore)
  const game = useContext(GameStore)
  const isInit = game.state.gameState === GameState.INIT_GAME
  const isStart = game.state.gameState === GameState.START_GAME
  const isContinue = game.state.gameState === GameState.CONTINUE_GAME
  const isEnd = game.state.gameState === GameState.END_GAME
  let btnText = 'Start'
  let btnClass = classes.startButton

  function handleClick () {
    if (game.state.betCredits === 0) {
      error.dispatch({
        type: EActions.SHOW_ERROR,
        payload: 'Cannot start with empty bet'
      })
    } else {
      if (isInit || isEnd) {
        // Start Game
        game.dispatch({
          type: GActions.UPDATE_GAME_STATE,
          payload: GameState.START_GAME
        })
      } else if (isStart) {
        // Continue
        game.dispatch({
          type: GActions.UPDATE_GAME_STATE,
          payload: GameState.CONTINUE_GAME
        })
      } else if (isContinue) {
        // End game and reset bet credits
        game.dispatch({
          type: GActions.UPDATE_GAME_STATE,
          payload: GameState.END_GAME
        })
        game.dispatch({
          type: GActions.CLEAR_STATE,
          payload: {
            betCredits: 0
          }
        })
      }
    }
  }

  if (isInit || isEnd) {
    btnText = 'Start'
    btnClass = classes.startButton
  } else if (isStart) {
    btnText = 'Continue'
    btnClass = classes.continueButton
  } else if (isContinue) {
    btnText = 'Try Again'
    btnClass = classes.continueButton
  }

  return (
    <Container>
      <BetCredits />
      <TotalCredits />
      <Box display="flex" justifyContent="center">
        <Button
          className={btnClass}
          onClick={handleClick}
          startIcon={<PlayArrowIcon />}
          size="large"
          variant="contained"
        >
          {btnText}
        </Button>
      </Box>
    </Container>
  )
}

export default GameActions
