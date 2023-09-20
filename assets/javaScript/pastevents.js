let { createApp } = Vue

createApp({
    data() {
        return {
            pastEvents: [],
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
                this.pastEvents = this.eventsList.filter(event => new Date(event.date) < new Date(object.currentDate))
                this.categories = Array.from(new Set(this.pastEvents.map(event => event.category)))
                this.crossFilter = this.pastEvents
            })
            .catch(err => console.log(err))
    },
    methods: {
        filterByCategory(events, inputCheckboxValue) {
            if (inputCheckboxValue.length == 0) {
                return events
            }
            return events.filter(event => inputCheckboxValue.includes(event.category))
        },

        filterByName(events, inputSearchValue) {
            return events.filter(event => event.name.toLowerCase().includes(inputSearchValue.toLowerCase()))
        },

        filterByCategoryAndName() {
            let filteredByCategory = this.filterByCategory(this.pastEvents, this.inputCheckboxValue)
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