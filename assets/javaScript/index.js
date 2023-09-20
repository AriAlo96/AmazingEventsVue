let { createApp } = Vue

createApp({
    data() {
        return {
            eventsList: [],
            categories: [],
            inputCheckboxValue: [],
            inputSearchValue: "",
            crossFilter: [],
        }
    },
    created() {
        let URL_API = "https://mindhub-xj03.onrender.com/api/amazing"
        fetch(URL_API)
            .then(response => response.json())
            .then((object) => {
                this.eventsList = object.events;
                this.categories = Array.from(new Set(this.eventsList.map(event => event.category)))
                this.crossFilter = this.eventsList
            })
            .catch(err => console.log(err))
    },
    methods: {
        filterByCategory(eventsList, inputCheckboxValue) {
            if (inputCheckboxValue.length == 0) {
                return eventsList
            }
            return eventsList.filter(event => inputCheckboxValue.includes(event.category))
        },

        filterByName(eventsList, inputSearchValue) {
            return eventsList.filter(event => event.name.toLowerCase().includes(inputSearchValue.toLowerCase()))
        },

        filterByCategoryAndName() {
            let filteredByCategory = this.filterByCategory(this.eventsList, this.inputCheckboxValue)
            let filteredByName = this.filterByName(filteredByCategory, this.inputSearchValue)
            this.crossFilter = filteredByName
        },

        createRoute(event) {
            let href = location.href
            let route = href.includes("index.html")
                ? `./assets/pages/details.html?parametro=${event._id}`
                : `./details.html?parametro=${event._id}`
            return route
        },

    }
}).mount('#app')























