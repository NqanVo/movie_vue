import { defineStore } from "pinia";

interface Other{
    language: {code:string}
}

export const useOther = defineStore('other',{
    state: ():Other =>  {
        const currentLanguage = localStorage.getItem("language")
        return {
            language : currentLanguage ? JSON.parse(currentLanguage) : {code:"en"}
        }
    },
    actions:{
        setLanguage(value : {code:string}){
            localStorage.setItem("language",JSON.stringify(value))
            this.$state.language = value
        }
    },
    getters:{
        getterLanguage: (state:Other) =>  state.language
    }
})