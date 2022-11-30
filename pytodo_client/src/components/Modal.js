function Modal({modalState, setModalState}) {
    const openModalHandler = () => {
        setModalState({isOpen : false, text : ''});
    };

    return (
        <>
            {modalState.isOpen ? 
            <div onClick={openModalHandler}>
                <div onClick={e => e.stopPropagation()}>                    
                    <div>{modalState.text}</div>
                    <span onClick={openModalHandler}>확인</span>
                </div>
            </div> : null}
        </>
    )
}
export default Modal;