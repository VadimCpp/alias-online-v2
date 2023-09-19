import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { TrophyIcon } from '@heroicons/react/20/solid'
import * as Types from '../types'

interface PlayersRadioGroupProps {
  players: Types.User[],
  onSelect: (player: Types.User) => void
}

const PlayersRadioGroup = (props: PlayersRadioGroupProps) => {
  const players: Types.User[] = props.players;

  const [selected, setSelected] = useState(null)
  useEffect(() => {
    if (selected) {
      props.onSelect(selected)
    }
  }, [selected])

  return (
    <div className="w-full px-4 py-4 text-left">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {players.map((player) => (
              <RadioGroup.Option
                key={player.displayName}
                value={player}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                      : ''
                  }
                  ${
                    checked ? 'bg-sky-600 bg-opacity-75 text-white' : 'bg-gray-100'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="w-12 mr-3">
                      <img width="12" height="12"
                        src={player.photoURL}
                        alt={`Avatar of ${player.displayName}`}
                        className="w-12 mx-auto rounded-full"
                      />
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {player.displayName}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span>
                              Score: {player.score}
                            </span>{' '}
                            <span aria-hidden="true">&middot;</span>{' '}
                            <span> {player.role} </span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white bg-gray-600 rounded p-1">
                          <TrophyIcon className="h-6 w-6" />
                        </div>
                      )}
                      {active && <></>}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

export default PlayersRadioGroup
