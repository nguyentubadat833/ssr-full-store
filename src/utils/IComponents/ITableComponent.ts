export interface ITableComponent {
    openViewData: () => void
    closeViewData: () => void

    clearState: () => void
    createData: () => void
    deleteData: () => void
    saveData: () => void

    data: any[]
}