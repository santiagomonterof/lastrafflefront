export const Routes = {
    AUTH:{
        LOGIN: '/login',
        REGISTER: '/register'
    },
    HOME: '/',
    RAFFLES: {
        LIST: '/raffles',
        CREATE: '/raffles/create',
        DETAIL: '/raffles/:id',
        DETAIL_PARAM: (id?: number) => `/raffles/${id}`,
        EDIT: '/raffles/edit/:id',
        EDIT_PARAM: (id?: number) => `/raffles/edit/${id}`,
        MY_RAFFLES: '/raffles/my-raffles',
        RAFFLE_DRAW: '/raffles/draw/:id',
        RAFFLE_DRAW_PARAM: (id?: number) => `/raffles/draw/${id}`,
        PARTICIPATING: '/raffles/participating',
    },
}