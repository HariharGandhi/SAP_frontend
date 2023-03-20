import React from "react"
import {
    ModalWrapper,
    ModalContainer,
    Close
} from "./modal"
export default function Modal({ closeModal, children }) {
    return (
        <ModalWrapper>
            <Close src="/public/images/cross.png" alt="close" onClick={() => closeModal(false)} />
            <ModalContainer >
                {children}
            </ModalContainer>
        </ModalWrapper>
    )
}
