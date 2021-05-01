import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { Image } from 'antd';

const StyledImageWrapper = styled.div`
  width: 250px;
  margin-bottom: 40px;
`;

const ImageGroupWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
`;

interface CaptionedImageProps {
  src: string;
  children: ReactNode;
}

export default function CaptionedImage({ src, children }: CaptionedImageProps) {
  return (
    <StyledImageWrapper>
      <Image src={src} height={200} width={250} />
      {children}
    </StyledImageWrapper>
  );
}

export function CaptionedImageGroup({ children }: { children: ReactNode }) {
  return <ImageGroupWrapper>{children}</ImageGroupWrapper>;
}
