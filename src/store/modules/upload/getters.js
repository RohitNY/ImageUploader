export default {
    images(state) {
        return state.images
    },
    hasImageData(state){
        return state.images && state.images.length > 0
    }
}