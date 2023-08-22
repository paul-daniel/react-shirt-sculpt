import {proxy} from 'valtio'

const state = proxy({
    intro : true,
    color : '#efbd4e',
    isLogoTexture : true,
    isFullTexture : false,
    logoDecal : './threejs.png',
    fullDecal : './threejs.png',
})

export default state