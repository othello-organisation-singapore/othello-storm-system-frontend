import React from 'react';
import styled from 'styled-components';

import { Button } from 'antd';

import { Player } from 'utils/apiResponseShapes';

interface PlayerButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  type?: 'default' | 'primary';
  player: Player;
}

const StyledPlayerButton = styled(Button)`
  max-width: 250px;

  &[disabled],
  &[disabled]:hover,
  &[disabled]:focus,
  &[disabled]:active {
    background-color: white;
    color: rgba(0, 0, 0, 0.85);
  }
`;

const PlayerNameDiv = styled.div`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export function PlayerButton({
  onClick = () => {},
  player,
  disabled = false,
  type = 'default',
}: PlayerButtonProps) {
  return (
    <StyledPlayerButton
      onClick={onClick}
      disabled={disabled}
      type={type}
      key={player.id}
    >
      <PlayerNameDiv>
        {player.lastName} {player.firstName}
      </PlayerNameDiv>
    </StyledPlayerButton>
  );
}
