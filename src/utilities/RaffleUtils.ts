export const getStatusDisplay = (status: number) => {
    switch (status) {
        case -1:
            return ' Sorteando'
        case 0:
            return ' Finalizada'
        case 1:
            return ' Activa'
        default:
            return ' Desconocido'
    }
}