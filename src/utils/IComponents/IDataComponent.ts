export interface IDataComponent {
    isOpenModal: Ref<boolean>;
    isLoading: Ref<boolean>;

    closeModal: () => void
    openModal: () => void

    clearState: () => void
    mapState: (object: any) => void
    createData: () => void
    deleteData: () => void
    saveData: () => void
}