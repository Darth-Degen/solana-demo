"use client";
import { FC } from "react";
import { ModalWrapper } from "@components";

interface Props {
  show: boolean;
  close: () => void;
}

const ImageModal: FC<Props> = (props: Props) => {
  const { show, close } = props;

  return (
    <ModalWrapper show={show} onClick={() => close()}>
      <div>Add content</div>
    </ModalWrapper>
  );
};

export default ImageModal;
